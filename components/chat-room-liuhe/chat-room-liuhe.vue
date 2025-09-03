<template>
	<view style="width: 100%;" @touchstart="touchStart" @touchend="touchEnd">
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :lower-threshold=0 @scrolltolower="reachedBottom" :scroll-into-view="scrollToView" @click="hideKeyboard">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="chat-ls" v-for="(item,index) in unshiftmsg" :key="index" :id="'msg'+ index">
					<view class="msg-m msg-left" v-if="item.sender !=  myName">
						<image class="user-img" :src="item.avatar"></image>
						<view>
							<view class="sender">{{item.sender}}</view>
							<view class="msg-text" v-if="item.type == 'notice'">
								<view>{{item.msg}}</view>
							</view>
							<view class="message">
								<view class="msg-text" v-if="item.type == 'recharge' || item.type == 'withdraw'">
									<view class="at" v-if="item.sender != item.receiver">@{{ item.receiver }}</view>
									<view>{{item.msg}}</view>
								</view>
								<view class="msg-text" v-if="item.type == 'liuheWager'">
									<view class="at" v-if="item.sender != item.receiver">@{{ item.receiver }}</view>
									<view @click="followWager(item.msg)">{{item.msg}}</view>
									<view>{{item.used}}</view>
									<view>{{item.rest}}</view>
									<view v-if="item.order_no !== ''">竞猜内容：</view>
									<view v-for="(order, title) in item.orders" :key="title" v-if="item.order_no !== ''">
										<view>{{ title }}[ <text decode v-for="(detail, k) in order" :key="k" >{{spaceText}}{{ detail.text }}/{{ detail.amount }}{{spaceText}}</text>]</view>
									</view>
								</view>
								<view class="msg-text" v-if="item.type == 'closeWarning'">
									<view>{{item.title}}</view>
									<view>====================</view>
									<view>距离封盘还有{{item.second}}秒</view>
									<view>封盘后将无法下单</view>
									<view>====================</view>
								</view>
								<view class="msg-text" v-if="item.type == 'closed'">
									<view>{{item.title}}</view>
									<view>========已休战========</view>
									<view>{{item.msg}}</view>
									<view>=====================</view>
								</view>
								<view class="msg-text" v-if="item.type == 'picture'" @tap="openPreview(item.msg)">
									<image :src="item.msg" class="msg-img" mode="widthFix"></image>
								</view>
								<view class="msg-text" v-if="item.type == 'orders'">
									<view>竞猜列表核对：</view>
									<view>{{item.title}}有效投注</view>
									<view v-for="(detail, username) in item.orders" :key="username">
										<view>[{{ username }}]汇总：{{ detail.amount }}</view>
										
										<view v-for="(order, title) in detail.orders" :key="title">
											<view>{{ title }}[ <text decode v-for="(detail, k) in order" :key="k" >{{spaceText}}{{ detail.text }}/{{ detail.amount }}{{spaceText}}</text>]</view>
										</view>
										
										
										<view></view>
									</view>
								</view>
								<view class="msg-text" v-if="item.type == 'settled'">
									<view>{{item.title}}已开奖</view>
									<view>中奖名单如下：</view>
									<view v-for="(detail, username) in item.orders" :key="username">
										<view>[{{ username }}]得分：{{ detail.amount }}</view>
										<view  v-for="(order, orderId) in detail.orders" :key="orderId">
											<view>{{ order.title }}[ {{ order.text }}/{{ order.amount }} = {{ order.settledAmount }} ]</view>
										</view>
										<view></view>
									</view>
									<view>=========================</view>
								</view>
							</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.sender == myName">
						<image class="user-img" :src="item.avatar"></image>
						<view>
							<view class="me">
								<view style="float:right;">{{myName}}</view>
							</view>
							<view class="message">
								<view class="msg-text">{{item.msg}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<view class="submit">
			<view class="submit-chat">
				<view class="iconfont icon-jianpan" @tap="showKeyboard"></view>
				<textarea disabled auto-height="true" class="chat-send btn" @click="focus" v-model="message"></textarea>
				<view class='iconfont icon-jiahao' v-if="isShowPlusBtn == true" @click="showKeyboard"></view>
				<view class='iconfont icon-send' v-if="isShowSendBtn == true" @click="sendMessage"></view>
			</view>
			<!-- 软键盘 -->
			<view class="keyboard"v-if="isShowKeyboard == true">
				<view class="uni-flex uni-row">
					<view class="flex-item" :style="{background:bgColor1}" @touchstart="setMsg('鼠各', 'bgColor1')">鼠各</view>
					<view class="flex-item" :style="{background:bgColor2}" @touchstart="setMsg('牛各', 'bgColor2')">牛各</view>
					<view class="flex-item" :style="{background:bgColor3}" @touchstart="setMsg('虎各', 'bgColor3')">虎各</view>
					<view class="flex-item" :style="{background:bgColor4}" @touchstart="setMsg('兔各', 'bgColor3')">兔各</view>
					<view class="flex-item" :style="{background:bgColor5}" @touchstart="setMsg('龙各', 'bgColor5')">龙各</view>
					<view class="flex-item" :style="{background:bgColor6}" @touchstart="setMsg('上分', 'bgColor5')">上分</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="flex-item border-left" :style="{background:bgColor7}" @touchstart="setMsg('蛇各', 'bgColor7')">蛇各</view>
					<view class="flex-item border-left" :style="{background:bgColor8}" @touchstart="setMsg('1', 'bgColor8')">1</view>
					<view class="flex-item border-left" :style="{background:bgColor9}" @touchstart="setMsg('2', 'bgColor9')">2</view>
					<view class="flex-item border-left" :style="{background:bgColor10}" @touchstart="setMsg('3', 'bgColor10')">3</view>
					<view class="flex-item border-left border-right tuigeBtn" :style="{background:bgColor11}" @touchstart="removeMsg()" @longpress="removeAllMsg()"></view>
				</view>
				<view class="uni-flex uni-row">
					<view class="flex-item border-left" :style="{background:bgColor12}" @touchstart="setMsg('马各', 'bgColor12')">马各</view>
					<view class="flex-item border-left" :style="{background:bgColor13}" @touchstart="setMsg('4', 'bgColor13')">4</view>
					<view class="flex-item border-left" :style="{background:bgColor14}" @touchstart="setMsg('5', 'bgColor14')">5</view>
					<view class="flex-item border-left" :style="{background:bgColor15}" @touchstart="setMsg('6', 'bgColor15')">6</view>
					<view class="flex-item border-left border-right" :style="{background:bgColor16}"  @touchstart="setMsg('鸡各', 'bgColor16')">鸡各</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="flex-item border-left" :style="{background:bgColor17}" @touchstart="setMsg('羊各', 'bgColor17')">羊各</view>
					<view class="flex-item border-left" :style="{background:bgColor18}" @touchstart="setMsg('7', 'bgColor18')">7</view>
					<view class="flex-item border-left" :style="{background:bgColor19}" @touchstart="setMsg('8', 'bgColor19')">8</view>
					<view class="flex-item border-left" :style="{background:bgColor20}" @touchstart="setMsg('9', 'bgColor20')">9</view>
					<view class="flex-item border-left border-right" :style="{background:bgColor21}" @touchstart="setMsg('狗各', 'bgColor21')">狗各</view>
				</view>
				<view class="uni-flex uni-row">
					<view class="flex-item border-left" :style="{background:bgColor22}" @touchstart="setMsg('猴各', 'bgColor22')">猴各</view>
					<view class="flex-item border-left" :style="{background:bgColor23}" @touchstart="setMsg('-', 'bgColor23')">-</view>
					<view class="flex-item border-left" :style="{background:bgColor24}" @touchstart="setMsg('0', 'bgColor24')">0</view>
					<view class="flex-item border-left" :style="{background:bgColor25}" @touchstart="setMsg('/', 'bgColor25')">/</view>
					<view class="flex-item border-left border-right" :style="{background:bgColor26}" @touchstart="setMsg('猪各', 'bgColor26')">猪各</view>
				</view>
			</view>
		</view>
		
		<view class="btn-plusempty" @tap="goBottom" :style="{bottom:bottomPx+'px'}" v-if="showNewMessage == true">
			<view>新消息</view>
		</view>
		
		<view class="btn-kefu" @tap="goChatRoom" style="bottom:360px" >
			<view class="iconfont icon-kefu2" style="font-size: 32px;"></view>
		</view>
		
		<view v-if="showDrawImg == true" class="preview-img" @click="closePreview">
			<image :src="drawImg" style="width: 100%;margin-top: 200px"></image>
		</view>
	</view>
</template>

<script>
	import {getOrderDetail, getUserOrder} from '../../common/api/index.js'
	export default {
		data() {
			return {
				currentLottery:'',
				lockScroll:false,
				showNewMessage: false,
				isShowPlusBtn: true,
				isShowSendBtn:false,
				isShowKeyboard:false,
				myName: "匿名",
				spaceText: '&ensp;',
				orderDetailText: '&ensp;&ensp;订单详情',
				msg: [],
				unshiftmsg: [], // 反转数据接收
				scrollToView: '',
				message: '',
				timeout:3000,
				heartbeatInterval: null,
				lockReconnect: false,
				showDrawImg: false,
				drawImg: "",
				bottomPx:60,
				inputh:150,
				bgColor1:'EBEBEB',
				bgColor2:'EBEBEB',
				bgColor3:'EBEBEB',
				bgColor4:'EBEBEB',
				bgColor5:'EBEBEB',
				bgColor6:'EBEBEB',
				bgColor7:'EBEBEB',
				bgColor8:'EBEBEB',
				bgColor9:'EBEBEB',
				bgColor10:'EBEBEB',
				bgColor11:'EBEBEB',
				bgColor12:'EBEBEB',
				bgColor13:'EBEBEB',
				bgColor14:'EBEBEB',
				bgColor15:'EBEBEB',
				bgColor16:'EBEBEB',
				bgColor17:'EBEBEB',
				bgColor18:'EBEBEB',
				bgColor19:'EBEBEB',
				bgColor20:'EBEBEB',
				bgColor21:'EBEBEB',
				bgColor22:'EBEBEB',
				bgColor23:'EBEBEB',
				bgColor24:'EBEBEB',
				bgColor25:'EBEBEB',
				bgColor26:'EBEBEB',
			}
		},
		props:['currentDrawNumber', 'windowHeight'],
		watch: {
			message:{
				handler(val){
					if (val != '') {
						this.isShowSendBtn = true;
						this.isShowPlusBtn = false;
					} else {
						this.isShowSendBtn = false;
						this.isShowPlusBtn = true;
					}
				}
			}
		},
		methods:{
			goChatRoom(e) {
				uni.navigateTo({
					url:'/pages/kefu/index'
				});
			},
			followWager(msg) {
				this.message = msg
			},
			/**  
			* 触摸开始  
			**/  
			touchStart(e) {  
				// console.log("触摸开始")  
				this.touchStartX = e.touches[0].clientX;  
				this.touchStartY = e.touches[0].clientY;  
			},  

			/**  
			* 触摸结束  
			**/  
			touchEnd(e) {  
				// console.log("触摸结束")  
				let deltaX = e.changedTouches[0].clientX - this.touchStartX;  
				let deltaY = e.changedTouches[0].clientY - this.touchStartY;  
				if(Math.abs(deltaY) > 50 && Math.abs(deltaX) < Math.abs(deltaY)) {  
					if (deltaY < 0) {  
						// console.log("上滑")
					} else {  
						// console.log("下滑")
						this.lockScroll = true
					}  
				} else {  
					// console.log("可能是误触！")  
				}  
			},
			reachedBottom() {
				this.lockScroll = false
				this.showNewMessage = false
			},
			setMsg(msg, btnNum) {
				this[btnNum] = '#cfbb93'
				setTimeout(()=> {
					this.message = this.message + msg;
					this[btnNum] = '#EBEBEB'
				},50)
			},
			removeAllMsg () {
				this.message = '';
			},
			removeMsg() {
				this.message = this.message.slice(0, this.message.length - 1);
			},
			repeat(btnNum) {
				this[btnNum] = '#cfbb93'
				setTimeout(()=> {
					this[btnNum] = '#EBEBEB'
				},50)
				this.message = uni.getStorageSync('command-' + getApp().globalData.currentLottery);
			},
			openPreview(e) {
				this.drawImg = e
				this.showDrawImg = true
			},
			closePreview() {
				this.showDrawImg = false
			},
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.bottomPx = (data.height);
					this.inputh = data.height + 150;
				}).exec();
			},

			// 滚动到底部
			goBottom() {
				setTimeout(() => {
					this.scrollToView = 'msg' + (this.unshiftmsg.length - 1)
				}, 300)
				this.lockScroll = false
				this.showNewMessage = false
			},
			//文字发送
			sendMessage() {
				if (this.message != '') {
					let param = {};
					let token = this.checkLogin();
					if (this.message.indexOf('上分') == 0) {
						param = {
							"type":"recharge",
							"lottery":getApp().globalData.currentLottery,
							"token":token,
							"content":this.message,
						};
					} else {
						param = {
							"type":"liuheWager",
							"lottery":getApp().globalData.currentLottery,
							"token":token,
							"content":this.message,
							"period":this.currentDrawNumber,
						};
					}
					uni.setStorageSync('command-' + getApp().globalData.currentLottery, this.message);
					this.socketSend(JSON.stringify(param));
					setTimeout(() => {
						this.message = '';
					}, 0);
				}
			},
			// 输入框聚焦
			focus() {
				this.showKeyboard()
			},
			hideKeyboard() {
				this.isShowKeyboard = false;console.log(this.isShowKeyboard)
				this.$nextTick(function() {
					this.getElementHeight()
				})
			},
			// 软键盘显示
			showKeyboard() {
				this.isShowKeyboard = true;
				this.$nextTick(function() {
					this.getElementHeight()
				})
			},
			chatMessage: function (msg) {
				if (msg.status == 'success' && msg.result.type != 'tictok') {
					if (this.lockScroll == true) {
						this.showNewMessage = true
					}
					this.unshiftmsg.push(msg.result);
					// 跳转到最后一条数据 与前面的:id进行对照
					if (!this.lockScroll) {
						this.goBottom()
					}
					
					if (msg.result.sender == '旺财' && (msg.result.type == 'liuheWager' || msg.result.type == 'recharge' || msg.result.type == 'settled' || msg.result.type == 'orders')) {
						uni.$emit('updateQuotaLiuhe');
					}
				} else if (msg.status == 'error') {
					uni.showToast({
						title:msg.message,
						icon:'none'
					});
				}
			},
			socketSend: function (params) {
				getApp().globalData.socket.sendSocketMessage(params);
			},
		},
		created() {
			this.currentLottery = getApp().globalData.currentLottery;
			uni.$on('chatMessage', (msg)=>{
				this.chatMessage(msg)
			})
			
			this.$nextTick(function() {
				let token = this.checkLogin() // 判断是否登入
				let data = {"type":"join","lottery":getApp().globalData.currentLottery,"token":token};
				getApp().globalData.socket.sendSocketMessage(JSON.stringify(data));
			})
		},
		mounted() {
			this.myName = uni.getStorageSync('nickname');
			if (this.myName === '') {
				this.myName = uni.getStorageSync('username');
			}
		},
		destroyed() {
			uni.$off('chatMessage')
			let token = this.checkLogin() // 判断是否登入
			let data = {"type":"leave","lottery":getApp().globalData.previousLottery,"token":token}
			getApp().globalData.socket.sendSocketMessage(JSON.stringify(data));
		}
	}
</script>

<style lang="scss">
.chat {
	height: 100%;
	background-color: #eeeeee;
	-webkit-user-select: text;
	user-select: text;

	.chat-main {
		padding-left: 16rpx;
		padding-right: 16rpx;
		display: flex;
		flex-direction: column;
	}
	.chat-ls {
		.msg-m {
			display: flex;
			padding: 10rpx 0;

			.user-img {
				flex: none;
				width: 80rpx;
				height: 80rpx;
				border-radius: 20rpx;
			}
			.message {
				flex: none;
				max-width: 500rpx;
			}
			.msg-text {
				color: rgba(39, 40, 50, 1);
				line-height: 30rpx;
				padding: 10rpx 24rpx;
				background-color: #e8e8e8;
			}
			.msg-changlong-text {
				color: rgba(39, 40, 50, 1);
				line-height: 30rpx;
				padding: 10rpx 24rpx;
			}
			.msg-img {
				max-width: 400rpx;
			}
		}

		.msg-left {
			flex-direction: row;
			.msg-text {
				margin-left: 16rpx;
				background-color: #FFF;
				border-radius: 0rpx 20rpx 20rpx 20rpx;
			}
		}

		.msg-right {
			flex-direction: row-reverse;
			.msg-text {
				margin-right: 16rpx;
				background-color: rgba(255, 228, 49, 0.8);
				border-radius: 20rpx 0rpx 20rpx 20rpx;
			}
		}
		.sender {
			margin-left: 10px;
			color: #686868;
			font-size: 24rpx;
		}
		.me {
			display: flex;
			flex-direction: row-reverse;
			margin-right: 8px;
			color: #686868;
			font-size: 24rpx;
		}
		.at{
			color: #1378bd;
		}
		.order-info {
			color: #826bca;
		}
	}
}
.submit {
	background: rgba(244, 244, 244, 0.96);
	border-top: 1px solid rgba(39, 40, 50, 0.1);
	width: 100%;
	position: fixed;
	bottom: 0;
	// z-index: 100;
	padding-bottom: env(safe-area-inset-bottom);
}
	
.displaynone {
	display: none;
}
	
.submit-chat {
	width: 100%;
	display: flex;
	align-items: flex-end;
	box-sizing: border-box;
	padding: 14rpx 14rpx;

	image {
		width: 56rpx;
		height: 56rpx;
		margin: 0 10rpx;
		flex: auto;
	}

	.btn {
		flex: auto;
		background-color: #fff;
		border-radius: 10rpx;
		padding: 20rpx;
		max-height: 160rpx;
		margin: 0 10rpx;
	}

	.chat-send {
		color: #2d90fc;
		font-weight: bold;
		line-height: 44rpx;
	}

	.record {
		line-height: 44rpx;
		text-align: center;
		font-size: 20rpx;
		color: rgba(39, 40, 50, 0.6);
	}
}

.border-left {
	border-left: 1px solid #ccc;
}

.border-right {
	border-right: 1px solid #ccc;
}
.icon-jianpan:before,.icon-jiahao:before,.icon-send {
	font-size: 60rpx;
	line-height: 80rpx;
}
.icon-send{
	color: #282e5d;
}
.tuigeBtn {
	background-image: url('/static/icon/tuige.svg');
	background-size: 40rpx 40rpx;
	background-repeat: no-repeat;
	background-position: 50% 50%;
}
.xianliaoBtn {
	color: #FFF;
	background-color: #ccc;
}
.long {
	color: #c74040;
}
.guanya {
	color: #029911;
}
.hu {
	color: #1621b0;
}
</style>

<style scoped>
	.changlong-pannel{
		width: 210px;
	}
	.info-title {
		line-height: 60rpx;
		font-size: 24rpx;
	}
	.flex-item {
		width: 33.3%;
		height: 3rem;
		text-align: center;
		line-height: 3rem;
		background-color: #EBEBEB;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
		font-size: 32rpx;
		font-weight: bold;
	}
	.flex-item-v {
		text-align: center;
		line-height: 80rpx;
		background-color: #FFF;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
		font-size: 24rpx;
	}
	
	.changlong-flex-item {
		width: 33.3%;
		text-align: center;
		line-height: 3rem;
		background-color: #EBEBEB;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
		font-size: 32rpx;
		font-weight: bold;
		background-color: #9f7b43;
		color:#FFF;
		
	}
	.changlong-flex-item-v {
		text-align: center;
		line-height: 80rpx;
		background-color: #FFF;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
		font-size: 24rpx;
	}
	.width-11{
		width: 60%;
	}
	.width-22{
		width: 40%;
	}
	
	.width-1{
		width: 40%;
	}
	.width-2{
		width: 30%;
	}
	.width-3{
		width: 30%;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
	.btn-plusempty {
		width: 100rpx;
		height: 50rpx;
		background: #FFF;
		position: fixed;
		right: 40rpx;
		text-align: center;
		color:#3b993a;
		border-radius: 10rpx;
	}
	.btn-kefu {
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right: 40rpx;
		text-align: center;
		color:#3e4995;
	}
	.icon-angle {
		color: #dcb945;
	}
	.preview-img {
		width: 100%;
		height:100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		background: #000000cc;
		transform-origin: center center;
		transform: translateX(0px) translateY(0px) translateZ(0px) scale(1);
	}
</style>
