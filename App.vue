<script>
	import UniSocket from "@i5920/uni-socket" 
	// 导入组件
	const JModule = uni.requireNativePlugin('J-FrontService')
	export default {
		globalData: {
			previousLottery: '',
			currentLottery: 'JSFT',
			currentLotteryTitle: '极速飞艇',
			currentGame: 'LM1'
		},
		methods: {
		},
		onLaunch: function() {
			// 开启服务
			JModule.startFrontService({
			    // IOS生效的配置
			    localtion: true,    // 后台持续定位保活
			    voice: true         // 播放无声音乐保活
			}, res => {
			    let { flag, msg } = res
			    // flag 为 true，开启成功，否则失败
			    // msg 为 成功失败的消息
			})
			
			this.globalData.socket = new UniSocket({
				url: "ws://43.155.11.101:2346",
				timeout: 1 * 60 * 1000,   // 心跳时间间隔
				isSendHeart: false,        // 是否发送心跳
				heartData: "Ping",        // 心跳数据
				isReconnection:true,      // 是否断线重连
				reConnectTime: 3000,      // 断线重连检测时间间隔
				params: {                 // 发送消息时如果时json则自动加上组合里面参数
				  // token: this.$store.state.user.TOKEN
				},
				debug: false,  // debug
				onSocketOpen: header => {console.log(header)},
				onSocketMessage: msg => {
					if (msg.status == 'success' && msg.result.type == 'tictok') {
						uni.$emit('drawMessage', msg);
					} else if (msg.status == 'success' && msg.result.type == 'jsftTictok') {
						uni.$emit('hallMessageJsft', msg);
					} else if (msg.status == 'success' && msg.result.type == 'jsscTictok') {
						uni.$emit('hallMessageJssc', msg);
					} else if (msg.status == 'success' && msg.result.type == 'azxysTictok') {
						uni.$emit('hallMessageAzxys', msg);
					} else if (msg.status == 'success' && msg.result.type == 'jssscTictok') {
						uni.$emit('hallMessageJsssc', msg);
					} else if (msg.status == 'success' && msg.result.type == 'azxywTictok') {
						uni.$emit('hallMessageAzxyw', msg);
					} else if (msg.status == 'success' && msg.result.type == 'history') {
						uni.$emit('historyDrawMessage', msg);
					} else if ((msg.status == 'success' && msg.result.type != 'tictok') || msg.status == 'error') {
						uni.$emit('chatMessage', msg);
					} else if (msg.status == 'info') {
					} else if (msg.status == 401) {
						uni.reLaunch({
						    url: '/pages/mine/login'
						});
					} 
				},
				onSocketError:res => {
					console.log(res)
				},
				onSocketClose:res => {
					uni.reLaunch({
						url:'/pages/mine/login'
					})
				}
			});
		},
		onShow: function() {
			// 连接socket
			this.globalData.socket.initSocket();
			let pages  = getCurrentPages()
			let currentPage = pages[pages.length-1]
			if (typeof currentPage !== 'undefined' && currentPage.route === "pages/room/index") {
				uni.reLaunch({
					url:'/pages/index/index'
				})
			}
			
		},
		onHide: function() {
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import url("./static/fonts/iconfont.css");
	/*  #endif  */
</style>