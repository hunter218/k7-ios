<template>
	<view>
		<view class="main-content">
			<view style="height: 100%;">
				<info-pannel-liuhe></info-pannel-liuhe>
				<view class="priz-board" style="border-bottom: 1px solid #dddee3;">
					<view class="draw">
						<span>{{ currentDrawNumber }}</span>
					</view>
					<view class="close">
						状态:
						<span>{{ closeMsg }}</span>
					</view>
				</view>
				<view class="priz-board">
					<view class="draw">
						<span>{{ lastDrawNumber }}</span>
					</view>
					<view class="priz">
						<view :class="'lh-priz-ball lh-ball-'+przBall7"></view>
						<view style="text-align: center;font-size: 48rpx;">{{przAnimal7}}</view>
					</view>
					
					<view>
						<span class="iconfont icon-angle" @click="showHistory"></span>
					</view>
				</view>
				
				<view style="z-index:999;position: fixed;background-color: #FFF;width: 100%;" v-if="showHistoryVisible">
					<scroll-view class="priz-board" style="height:245px;" scroll-y="true" scroll-with-animation="true">
						<view class="priz-board" v-for="(item, index) in history" :key="index" v-if="index > 0">
							<view class="draw">
								<span>{{ item.period }}</span>
							</view>
							<view class="priz">
								<view :class="'lh-priz-ball lh-ball-'+item.b7"></view>
								<view style="text-align: center;font-size: 48rpx;">{{item.a7}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
				
				<view class="content">
					<chat-room-liuhe :currentDrawNumber=currentDrawNumber></chat-room-liuhe>
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
				przBall7:'',
				przAnimal7: '',
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
					this.closeMsg = data.closeMsg
					this.lastDrawNumber = data.pNumber
					this.currentDrawNumber = data.cNumber

					this.przBall7 = data.n7
					this.przAnimal7 = data.a7
					this.showCenterVisible = data.bounce
					if (this.showCenterVisible === true) {
						this.showCenterVisible = true
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
	    height: 86rpx;
		line-height:86rpx ;
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
		line-height: 86rpx;
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
		line-height: 78rpx;
		font-size: 78rpx;
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
<style>
    .lh-priz-ball{
        width: 70rpx;
        height: 76rpx;
        text-align: center;
    }
</style>
