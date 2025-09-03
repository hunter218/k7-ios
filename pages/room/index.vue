<template>
	<view>
		<view class="main-content">
			<view style="height: 100%;">
				<info-pannel></info-pannel>
				<view class="priz-board">
					<view class="draw">
						<span>{{ DrawNumberFormat(currentDrawNumber) }}</span>
					</view>
					<view class="close">
						封盘:
						<span>{{ closeMsg }}</span>
					</view>
					<view class="open">
						开奖:
						<span>{{ drawMsg }}</span>
					</view>
				</view>
				<view class="priz-board" style="background-color: #192d43;">
					<view class="draw">
						<span>{{ DrawNumberFormat(lastDrawNumber) }}</span>
					</view>
					<view class="priz" v-if="currentLottery=='SGFT' || currentLottery=='XYFT' || currentLottery=='BJSC' || currentLottery=='AZXYS' || currentLottery=='JSFT' || currentLottery=='JSSC'">
						<view :class="'priz-ball color-'+przBall1">{{ przBall1 }}</view>
						<view :class="'priz-ball color-'+przBall2">{{ przBall2 }}</view>
						<view :class="'priz-ball color-'+przBall3">{{ przBall3 }}</view>
						<view :class="'priz-ball color-'+przBall4">{{ przBall4 }}</view>
						<view :class="'priz-ball color-'+przBall5">{{ przBall5 }}</view>
						<view :class="'priz-ball color-'+przBall6">{{ przBall6 }}</view>
						<view :class="'priz-ball color-'+przBall7">{{ przBall7 }}</view>
						<view :class="'priz-ball color-'+przBall8">{{ przBall8 }}</view>
						<view :class="'priz-ball color-'+przBall9">{{ przBall9 }}</view>
						<view :class="'priz-ball color-'+przBall10">{{ przBall10 }}</view>
					</view>
					<view class="priz" v-if="currentLottery=='XYSSC' || currentLottery=='JSSSC' || currentLottery=='AZXYW'">
						<view :class="'priz-ball color-'+przBall1">{{ przBall1 }}</view>
						<view :class="'priz-ball color-'+przBall2">{{ przBall2 }}</view>
						<view :class="'priz-ball color-'+przBall3">{{ przBall3 }}</view>
						<view :class="'priz-ball color-'+przBall4">{{ przBall4 }}</view>
						<view :class="'priz-ball color-'+przBall5">{{ przBall5 }}</view>
					</view>
					<view class="priz" v-if="currentLottery=='CQHLSX'">
						<view :class="'cqhlsx-ball ball-'+przBall1"></view>
						<view :class="'cqhlsx-ball ball-'+przBall2"></view>
						<view :class="'cqhlsx-ball ball-'+przBall3"></view>
						<view :class="'cqhlsx-ball ball-'+przBall4"></view>
						<view :class="'cqhlsx-ball ball-'+przBall5"></view>
					</view>
					<view>
						<span class="iconfont icon-angle" @click="showHistory"></span>
					</view>
				</view>
				
				<view style="z-index:999;position: fixed;background-color: #FFF;width: 100%;" v-if="showHistoryVisible">
					<!-- <view class="priz-board">
						<view class="draw">
							<span style="margin-left:10rpx;">期数</span>
						</view>
						<view class="priz" v-if="currentLottery=='SGFT' || currentLottery=='XYFT' || currentLottery=='BJSC' || currentLottery=='AZXYS' || currentLottery=='JSFT' || currentLottery=='JSSC'">
							<view class="history-title" style="margin-left: 12rpx;">一</view>
							<view class="history-title">二</view>
							<view class="history-title">三</view>
							<view class="history-title">四</view>
							<view class="history-title">五</view>
							<view class="history-title">六</view>
							<view class="history-title">七</view>
							<view class="history-title">八</view>
							<view class="history-title">九</view>
							<view class="history-title">十</view>
							<view class="history-gyh">冠亚和</view>
							<view class="history-longhu">1-5龙虎</view>
						</view>
						<view class="priz"  v-if="currentLottery=='JSSSC'">
							<view class="history-title" style="margin-left: 10rpx;">一</view>
							<view class="history-title" style="margin-left: 6rpx;">二</view>
							<view class="history-title" style="margin-left: 6rpx;">三</view>
							<view class="history-title" style="margin-left: 6rpx;">四</view>
							<view class="history-title" style="margin-left: 6rpx;">五</view>
						</view>
					</view> -->
					<scroll-view class="priz-board" style="height:245px;background-color: #192d43;" scroll-y="true" scroll-with-animation="true">
						<view class="priz-board" v-for="(item, index) in history" :key="index" v-if="index > 0">
							<view class="draw">
								<span>{{ DrawNumberFormat(item.period) }}</span>
							</view>
							<view class="priz" v-if="currentLottery=='SGFT' || currentLottery=='XYFT' || currentLottery=='BJSC' || currentLottery=='AZXYS' || currentLottery=='JSFT' || currentLottery=='JSSC'">
								<view :class="'history-ball color-'+item.b1">{{ item.b1 }}</view>
								<view :class="'history-ball color-'+item.b2">{{ item.b2 }}</view>
								<view :class="'history-ball color-'+item.b3">{{ item.b3 }}</view>
								<view :class="'history-ball color-'+item.b4">{{ item.b4 }}</view>
								<view :class="'history-ball color-'+item.b5">{{ item.b5 }}</view>
								<view :class="'history-ball color-'+item.b6">{{ item.b6 }}</view>
								<view :class="'history-ball color-'+item.b7">{{ item.b7 }}</view>
								<view :class="'history-ball color-'+item.b8">{{ item.b8 }}</view>
								<view :class="'history-ball color-'+item.b9">{{ item.b9 }}</view>
								<view :class="'history-ball color-'+item.b10">{{ item.b10 }}</view>
								<view style="line-height: 2rpx;margin-left: 12rpx;width: 90rpx;font-size: 14rpx;">
									<span style="color: #FFF;">{{item.gyh}}</span>
									<span v-if="item.gydx == '大'" class="dsstyle">{{item.gydx}}</span>
									<span v-else class="xdstyle">{{item.gydx}}</span>
									<span v-if="item.gyds == '双'" class="dsstyle">{{item.gyds}}</span>
									<span v-else class="xdstyle">{{item.gyds}}</span>
								</view>
								<view style="line-height: 2rpx;margin-left: -12rpx;font-size: 14rpx;">
									<span v-if="item.lh1 == '龙'" class="dsstyle">{{item.lh1}}</span>
									<span v-else class="xdstyle">{{item.lh1}}</span>
									<span v-if="item.lh2 == '龙'" class="dsstyle">{{item.lh2}}</span>
									<span v-else class="xdstyle">{{item.lh2}}</span>
									<span v-if="item.lh3 == '龙'" class="dsstyle">{{item.lh3}}</span>
									<span v-else class="xdstyle">{{item.lh3}}</span>
									<span v-if="item.lh4 == '龙'" class="dsstyle">{{item.lh4}}</span>
									<span v-else class="xdstyle">{{item.lh4}}</span>
									<span v-if="item.lh5 == '龙'" class="dsstyle">{{item.lh5}}</span>
									<span v-else class="xdstyle">{{item.lh5}}</span>
								</view>
							</view>
							
							<view class="priz" v-if="currentLottery=='JSSSC' || currentLottery=='AZXYW'">
								<view :class="'history-ball color-'+item.b1">{{ item.b1 }}</view>
								<view :class="'history-ball color-'+item.b2">{{ item.b2 }}</view>
								<view :class="'history-ball color-'+item.b3">{{ item.b3 }}</view>
								<view :class="'history-ball color-'+item.b4">{{ item.b4 }}</view>
								<view :class="'history-ball color-'+item.b5">{{ item.b5 }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
				
				<view class="content">
					<chat-room :currentDrawNumber=currentDrawNumber></chat-room>
				</view>
			</view>
		</view>
		<section class="Popup-Page">
			<s-popup custom-class="center-popup" position="center" v-model="showCenterVisible">
				<view style="width:600rpx;height:800rpx;">
					<view style="background-color: red;">
						<view style="margin: 50rpx auto;"></view>
					</view>
					<view style="padding: 10px 30px;text-align: center;">
						<image
						style="width: 200px; height: 200px;"
						src="/static/images/forbid.jpeg"></image>
						<view style="margin: 50rpx auto;color: #264567;font-weight: bold;">
							{{ currentLotteryTitle }}已停止运营
						</view>
					</view>
				</view>
			</s-popup>
		</section>
		
		<section class="Popup-Page">
			<s-popup custom-class="center-popup" position="center" v-model="showErrorVisible">
				<view style="width:600rpx;height:800rpx; border: 1px solid green;">
					<view style="background-color: red;">
						<view style="margin: 50rpx auto;"></view>
					</view>
					<view style="padding: 10px 30px;text-align: center;">
						<image
						style="width: 200px; height: 200px;"
						src="/static/images/forbid.jpeg"></image>
						<view style="margin: 50rpx auto;color: #264567;font-weight: bold;">
							链接已断开,请检查您的网络!
						</view>
					</view>
				</view>
			</s-popup>
		</section>
	</view>
</template>
<script>
	import { getPeriod } from '../../common/api/index.js'
	export default {
		data() {
			return {
				showCenterVisible: false,
				showErrorVisible: false,
				showHistoryVisible: false,
				currentLottery:getApp().globalData.currentLottery,
				currentLotteryTitle:getApp().globalData.currentLotteryTitle,
				currentGame:getApp().globalData.currentGame,
				currentDrawNumber:'',
				lastDrawNumber:'',
				closeTime:'',
				drawTime:0,
				currentTime:0,
				openTime:'',
				przBall1:'',
				przBall2:'',
				przBall3:'',
				przBall4:'',
				przBall5:'',
				przBall6:'',
				przBall7:'',
				przBall8:'',
				przBall9:'',
				przBall10:'',
				drawMsg:'',
				closeMsg:'',
				timeout:1000,
				tictokTimer: null,
				history: [],
			}
		},
		methods:{
			DrawNumberFormat (num) {
				var period =  num.toString()
				return period.substring(3, period.length)
			},
			showHistory() {
				this.showHistoryVisible = !this.showHistoryVisible
			},
			drawMessage: function (msg) {
				if (msg.status == 'success' && msg.result.type == 'tictok') {
					let data = msg.result
					this.drawTime = data.drawTime
					this.openTime = data.openTime
					this.closeTime = data.closeTime
					this.currentTime = data.currentTime
					this.lastDrawNumber = data.pNumber
					this.currentDrawNumber = data.cNumber
					
					this.przBall1 = data.n1
					this.przBall2 = data.n2
					this.przBall3 = data.n3
					this.przBall4 = data.n4
					this.przBall5 = data.n5
					this.przBall6 = data.n6
					this.przBall7 = data.n7
					this.przBall8 = data.n8
					this.przBall9 = data.n9
					this.przBall10 = data.n10
					this.showCenterVisible = data.bounce
					if (this.showCenterVisible === true) {
						this.showCenterVisible = true
					}
					let drawLeftTime = this.drawTime - this.currentTime // 距离开奖时间
					if (drawLeftTime >= 0) {
						let drawLeftMinutes = Math.floor(drawLeftTime / 60)
						let drawLeftSeconds = Math.floor(drawLeftTime % 60)
						if (10 > drawLeftMinutes > 0) {
							drawLeftMinutes = "0" + drawLeftMinutes
						}
						if (10 > drawLeftSeconds > 0) {
							drawLeftSeconds = "0" + drawLeftSeconds
						}
						this.drawMsg = drawLeftMinutes + ":" + drawLeftSeconds
						--drawLeftTime;
					} else{
						clearInterval(this.drawTimer);
						this.drawMsg = "00:00"
					}
					
					let closeLeftTime = this.closeTime - this.currentTime // 距离封盘时间
					if (closeLeftTime > 0) {
						let closeLeftMinutes = Math.floor(closeLeftTime / 60)
						let closeLeftSeconds = Math.floor(closeLeftTime % 60)
						if (10 > closeLeftMinutes > 0) {
							closeLeftMinutes = "0" + closeLeftMinutes
						}
						if (10 > closeLeftSeconds > 0) {
							closeLeftSeconds = "0" + closeLeftSeconds
						}
						this.closeMsg = closeLeftMinutes + ":" + closeLeftSeconds
						--closeLeftTime;
					} else{
						this.closeMsg = "已封盘"
					}
				} else if (msg.status == 'error') {
					uni.showToast({
						title:msg.message,
						icon:'none'
					});
				}
			},
			historyDrawMessage: function (msg) {
				if (msg.status == 'success' && msg.result.type == 'history') {
					this.history = msg.result.data
				}
			},
			tictok () {
			    this.tictokTimer = setInterval(() => {
			        let token = this.checkLogin()
			        let param = {
			        	"type":"tictok",
			        	"lottery":getApp().globalData.currentLottery,
			        	"token":token,
			        };
			        getApp().globalData.socket.sendSocketMessage(JSON.stringify(param));
			    }, this.timeout);
			},
			onNavigationBarButtonTap(e) {
				if (e.index == 0) {
					this.$refs.mydraw.show();
				}
			}
		},
		onLoad() {
			uni.$on('drawMessage', (msg)=>{
				this.drawMessage(msg);
			})
			uni.$on('historyDrawMessage', (msg)=>{
				this.historyDrawMessage(msg);
			})
		},
		mounted() {
			clearInterval(this.tictokTimer)
			this.tictok()
		},
		onShow() {
			uni.setNavigationBarTitle({
				title:this.currentLotteryTitle
			})
		},
		onUnload() {
			uni.$off('drawMessage')
			uni.$off('historyDrawMessage')
		},
		beforeDestroy() {
			clearInterval(this.tictokTimer)
		}
	}
</script>

<style>
	.main-content{
		height: calc((100% - 90rpx) - 70rpx);
		position: fixed;
		width: 100%;
	}
	.content {
		width: 100%;
		height: calc(100% - 20rpx);
		margin: 0;
		display: flex;
		flex-direction: row;
	}
	.flex-item {
		width: 33.3%;
		/* height: 80rpx; */
		text-align: center;
		line-height: 80rpx;
		background-color: #EBEBEB;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
	}
	.left-pannel {
		width: 20%;
		height: 100%;
		min-height: 1300rpx;
		background-color: #264567;
		justify-content: flex-start;
		position: relative;
	}
	.right-pannel {
		width: 80%;
		height: 100%;
		position: relative;
		overflow: auto;
	}
	.priz-board {
	    height: 50rpx;
		line-height:50rpx ;
	    display: flex;
		flex-direction: row;
	    -webkit-box-pack: justify;
	    box-sizing: border-box;
		padding-left: 2rpx;
		padding-right: 6rpx;
	    border-bottom: 0px solid rgb(204, 204, 204);
	}
	.draw{
		display: inline-block;
		line-height: 56rpx;
		color: #999999;
		font-size: 32rpx;
		margin-right: 6rpx;
		width: 85rpx;
	}
	.history-title {border:1px solid #FFF;
		width: 45rpx;
		text-align: center;
	}
	.history-gyh {
		font-size: 14rpx;
		margin-left: 6rpx;
	}
	.history-longhu {
		font-size: 14rpx;
		margin-left: 32rpx;
	}
	.draw span {
		font-size: 30rpx;
		color: #5e5c5e;
	}
	.priz {
		display: inline-flex;
		-webkit-box-align: center;
		align-items: center;
		width: auto;
		margin-right: auto;
		flex-flow: row wrap;
	}
	.close{
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		color: #666666;
		font-size: 30rpx;
		margin-right: 8rpx;
	}
	.close span{
		color: #ff5b26;
		margin-left: 6rpx;
	}
	.open{
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		color: #666666;
		font-size: 30rpx;
		margin-right: 8rpx;
	}
	.open span{
		margin-left: 6rpx;
		color: #00cd22;
	}
	.rough_lines {
	    width: 100%;
	    height: 10px;
	    background-color: rgb(235, 235, 235);
	    box-shadow: rgb(187, 187, 187) 0px 1px 1px inset;
	}
	.dsstyle {
	    color: #d10430;
	}
	.xdstyle {
	    color: #335aff;
	}
	.icon-angle {
		line-height: 60rpx;
		font-size: 60rpx;
		color:#ff8643;
		
	}
</style>

<style lang="scss">
	.Popup-Page {
	  padding: 40rpx;
	  .btn {
	    width: 100%;
	    height: 80rpx;
	    font-size: 28rpx;
	    &:not(:first-child) {
	      margin-top: 40rpx;
	    }
	  }
	  .center-popup {
	    .s-popup-wrapper {
	      width: 500rpx;
	      height: 500rpx;
	    }
	    // #ifdef H5
	    /deep/ .s-popup-wrapper {
	      width: 500rpx;
	      height: 500rpx;
	    }
	    // #endif
	  }
	  .left-popup,
	  .right-popup {
	    .s-popup-wrapper {
	      width: 200rpx;
	    }
	    // #ifdef H5
	    /deep/ .s-popup-wrapper {
	      width: 200rpx;
	    }
	    // #endif
	  }
	  .top-popup,
	  .bottom-popup {
	    .s-popup-wrapper {
	      height: 200rpx;
	    }
	    // #ifdef H5
	    /deep/ .s-popup-wrapper {
	      height: 200rpx;
	    }
	    // #endif
	  }
	}
</style>
