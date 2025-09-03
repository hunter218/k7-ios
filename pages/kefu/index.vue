<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<!-- <view class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view> -->
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id">
					<!-- 系统消息 -->
					<block v-if="row.type=='system'" >
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msg.type=='text'" class="text">
								{{row.msg.content.text}}
							</view>
							<!-- 领取红包消息 -->
							<view v-if="row.msg.type=='redEnvelope'" class="red-envelope">
								<image src="/static/images/red-envelope-chat.png"></image>
								{{row.msg.content.text}}
							</view>
						</view>
					</block>
					<!-- 用户消息 -->
					<block v-if="row.type=='say'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.sender == myName">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.msg.userinfo.face"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.msg.userinfo.sender != myName">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.msg.userinfo.face"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.msg.userinfo.sender}}</view> <view class="time">{{row.msg.time}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<view class="textbox">
				<view class="text-mode">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus"/>
					</view>
				</view>
			</view>
			<view class="send" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { getChatHistory } from '../../common/api/index.js'
	import { baseURL } from '../../common/api/base.js'
	export default {
		data() {
			return {
				//文字消息
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				myName: "匿名",
				myAvatar: "",
				websocket: null,
				historyList: [],
				hasMore: false,
				currentPage:1,
			};
		},
		mounted() {
			console.log(baseURL)
			this.initWebsocket();
		},
		onLoad() {
			this.getMsgList();
		},
		onShow(){
			this.scrollTop = 9999999;
		},
		methods:{
			initWebsocket() {
			    let that = this
			    that.websocket= uni.connectSocket({ 
					url: 'ws://43.155.11.101:12346',
			        success(data) {
						console.log("websocket连接成功");
			        },
			    });
				// 建立websocket连接
			    that.websocket.onOpen((res) => {
					let token = this.checkLogin() // 判断是否登入
					let msg = {"token":token,"type":"login",msg:{userinfo:{sender:this.myName,face:this.myAvatar}}}
					
					this.websocket.send({
						data:JSON.stringify(msg),
						async success() {
						  console.log("用户验证发送成功");
						},
					});
			        that.websocket.onMessage((res) => {
					  let msg = JSON.parse(res.data);
					  if (msg.status == 401) {
						  uni.showToast({
						  	title:msg.data,
						  	icon:'none'
						  });
						  return ;
					  } else if (msg.status == 'login success') {
						  this.myName = msg.username;
						  this.myAvatar = msg.user_avatar;
						  return ;
					  } else {
						  this.screenMsg(res.data)
					  }
			        });
			    });
			    // 监听webscket关闭的事件
				that.websocket.onClose(() => {
			        console.log("已经被关闭了");
			    });
				// 监听发生错误时的时间
			    that.websocket.onError(() => {
			        console.log('websocket连接失败');
				})
			},
			// 接受消息(筛选处理)
			screenMsg(message){
				let msg = JSON.parse(message);
				if(msg.type == 'system'){ // 系统消息
					switch (msg.msg.type){
						case 'text':
							this.addSystemTextMsg(msg);
							break;
					}
				} else if(msg.type=='say') { // 用户消息
					switch (msg.msg.type){
						case 'text':
							this.addTextMsg(msg);
							break;
						case 'img':
							this.addImgMsg(msg);
							break;
					}
					console.log('用户消息');
					//非自己的消息震动
					if(msg.msg.userinfo.sender != this.myName){
						console.log('振动');
						uni.vibrateLong();
					}
				}
				this.$nextTick(function() {
					// 滚动到底
					let lastid = this.msgList[this.msgList.length-1].msg.id;
					this.scrollToView = 'msg'+lastid
				});
			},
			
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				if(this.isHistoryLoading){
					return ;
				}
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				let Viewid = this.msgList[0].msg.id;//记住第一个信息ID
				
				if (this.hasMore) {
					this.getMsgList();
				}
				
				this.isHistoryLoading = false;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = true;//关闭滑动动画
			},
			// 加载初始页面消息
			getMsgList(){
				let token = this.checkLogin() // 判断是否登入
				getChatHistory({'pn':this.currentPage}, {'Authorization': 'Bearer ' + token}).then(data => {
				   this.historyList = data.history;
				   this.hasMore = data.has_more;
				   this.currentPage++;
				   // 获取消息中的图片,并处理显示尺寸
				   
				   for(let i = 0; i < this.historyList.length; i++){
						if(this.historyList[i].type=='say'&&this.historyList[i].msg.type=="img"){
							this.historyList[i].msg.content = this.setPicSize(this.historyList[i].msg.content);
							this.msgImgList.push(this.historyList[i].msg.content.url);
						}
						this.msgList.unshift(this.historyList[i]);
				   }
				   
				   // 滚动到底部
				   this.$nextTick(function() {
						//进入页面滚动到底部
						this.scrollTop = 9999;
						this.$nextTick(function() {
							this.scrollAnimation = true;
						});
				   });
				})
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			
			//更多功能(点击+弹出) 
			showMore(){
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
				},150);
			},
			// 选择图片发送
			chooseImage(){
				this.getImage('album');
			},
			//拍照发送
			camera(){
				this.getImage('camera');
			},
			//选照片 or 拍照
			getImage(type){
				this.hideDrawer();
				uni.chooseImage({
					sourceType:[type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (res)=>{
						let length = res.tempFilePaths.length
						length = 1
						for(let i=0;i<res.tempFilePaths.length;i++){
							uni.getImageInfo({
								src: res.tempFilePaths[i],
								success: (image)=>{
									console.log(image.width);
									console.log(image.height);
									this.uploadImage(res.tempFilePaths[i])
								}
							});
						}
					}
				});
			},
			uploadImage (path) {
				uni.uploadFile({
				    url: baseURL + "/api/upload-chat-img",
				    filePath: path,
				    name: 'picture',
				    header: {
						"Authorization": 'Bearer ' + uni.getStorageSync('token')
				    },
				    success: (res) => {
						if (res.statusCode == 200) {
							let msg = JSON.parse(res.data)
							if (msg.status == 'SUCCESS') {
								let imgUrl = msg.results.url
								let imgMsg = {url: imgUrl}
								
								this.sendSocketMessage(imgMsg,'img');
							}
						}
				    },
				    fail: (err) => {
				        console.log(err)
				    }
				})
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText(){
				this.hideDrawer();//隐藏抽屉
				if(!this.textMsg){
					return;
				}
				let content = this.textMsg;
				let msg = {text:content}
				// this.sendMsg(msg,'text');
				this.sendSocketMessage(msg, 'text')
				this.textMsg = '';//清空输入框
			},
			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				let msg = {type:'say',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{sender:"大黑哥",face:"/static/images/face.jpg"},content:content}}
				// 发送消息
				this.screenMsg(msg);
				// 定时器模拟对方回复,三秒
				setTimeout(()=>{
					lastid = this.msgList[this.msgList.length-1].msg.id;
					lastid++;
					msg = {type:'say',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{sender:"售后客服008",face:"/static/images/im/face/face_2.jpg"},content:content}}
					// 本地模拟发送消息
					this.screenMsg(msg);
				},3000)
			},
			sendSocketMessage (content,type) {
				var nowDate = new Date();
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				
				let token = this.checkLogin() // 判断是否登入
				let msg = {"token":token,type:'say',msg:{id:lastid,time:nowDate.getHours()+":"+nowDate.getMinutes(),type:type,userinfo:{sender:this.myName,face:this.myAvatar},content:content}}
				console.log(msg)
				this.websocket.send({data:JSON.stringify(msg)});
			},
			// 添加文字消息到列表
			addTextMsg(msg){
				this.msgList.push(msg);
			},
			// 添加图片消息到列表
			addImgMsg(msg){
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){
				this.msgList.push(msg);
			},
			sendSystemMsg(content,type){
				let lastid = this.msgList[this.msgList.length-1].msg.id;
				lastid++;
				let row = {type:"system",msg:{id:lastid,type:type,content:content}};
				this.screenMsg(row)
			},
			// 预览图片
			showPic(msg){
				uni.previewImage({
					indicator:"none",
					current:msg.content.url,
					urls: this.msgImgList
				});
			},
			discard(){
				return;
			}
		}
	}
</script>
<style lang="scss">
	@import "@/common/chat.scss";
	page {
		-webkit-user-select: text;
		user-select: text;
	}
</style>