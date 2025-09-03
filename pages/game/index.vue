<template>
	<view>
		<view class="main-content">
			<view style="height: 100%;">
				<info-pannel></info-pannel>
				<view class="priz-board">
					<view class="draw">
						<span>{{ lastDrawNumber }}</span>期
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
						<view class="azxyw-ball">{{ przBall1 }}</view>
						<view class="azxyw-ball">{{ przBall2 }}</view>
						<view class="azxyw-ball">{{ przBall3 }}</view>
						<view class="azxyw-ball">{{ przBall4 }}</view>
						<view class="azxyw-ball">{{ przBall5 }}</view>
					</view>
					<view class="priz" v-if="currentLottery=='CQHLSX'">
						<view :class="'cqhlsx-ball ball-'+przBall1"></view>
						<view :class="'cqhlsx-ball ball-'+przBall2"></view>
						<view :class="'cqhlsx-ball ball-'+przBall3"></view>
						<view :class="'cqhlsx-ball ball-'+przBall4"></view>
						<view :class="'cqhlsx-ball ball-'+przBall5"></view>
					</view>
				</view>
				<view class="priz-board">
					<view class="draw">
						<span>{{ currentDrawNumber }}</span>期
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
				<view class="content">
					<view class="left-pannel">
						<game-menu></game-menu>
					</view>
				
					<view class="right-pannel">
						<bet-gyh :clickDisabled=clickDisabled :list=list.GYH v-if="currentGame=='GYH'"></bet-gyh>
						<bet-ball :clickDisabled=clickDisabled :list=list.MC10 v-if="currentGame=='MC10'"></bet-ball>
						<bet-ball-cqhlsx :clickDisabled=clickDisabled :list=list.MC5 v-if="currentGame=='MC5'&& (currentLottery=='CQHLSX')"></bet-ball-cqhlsx>
						<bet-ball-azxyw :clickDisabled=clickDisabled :list=list.MC5 v-if="currentGame=='MC5' && (currentLottery=='AZXYW' || currentLottery=='JSSSC' || currentLottery=='XYSSC')"></bet-ball-azxyw>
						<bet-lm :clickDisabled=clickDisabled :list=list.LM1 v-if="currentGame=='LM1'"></bet-lm>
						<bet-lm :clickDisabled=clickDisabled :list=list.LM2 v-if="currentGame=='LM2'"></bet-lm>
					</view>
				</view>
			</view>
		</view>
		<my-pop ref="myPop" :currentDrawNumber=currentDrawNumber></my-pop>
		<my-drawer ref="mydraw"></my-drawer>
		<game-drawer ref="gamedraw"></game-drawer>
		
		<section class="Popup-Page">
			<s-popup custom-class="center-popup" position="center" v-model="showCenterVisible">
				<view style="width:600rpx;height:800rpx; border: 1px solid green;">
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
	import {getBets, getPeriod} from '../../common/api/index.js'
	var arrayUtils = require('@/common/util.js').arrayUtils
	export default {
		data() {
			return {
				showCenterVisible: false,
				showErrorVisible: false,
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
				tictokTimer:null,
				list:[],
				clickDisabled:false,
			}
		},
		methods:{
			open(){
				this.$refs.popup.open()
			},
			drawMessage: function (msg) {
				if (msg.status == 'success') {
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
						this.clickDisabled = false
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
						this.clickDisabled = true
						uni.$emit('setButtonsDisActive')
						uni.$emit('clearShoppingCard')
						this.closeMsg = "已封盘"
					}
				} else if (infos.status == 'error') {
					uni.showToast({
						title:infos.message,
						icon:'none'
					});
				}
			},
			tictok () {
			    this.tictokTimer = setInterval(() => {
					if (getApp().globalData.socket.isLogin == false) {
						this.showErrorVisible = true
					} else {
					 	this.showErrorVisible = false
					}
			        let token = this.checkLogin()
			        let param = {
			        	"type":"tictok",
			        	"lottery":getApp().globalData.currentLottery,
			        	"token":token,
			        };
			        getApp().globalData.socket.sendSocketMessage(JSON.stringify(param));
			    }, this.timeout);
			},
		},
		created() {
			clearTimeout(this.tictokTimer)
			this.tictok();
		},
		mounted(){
			uni.$on('showMenu', (game)=>{
				this.currentGame = game
			})
			uni.$on('drawMessage', (msg)=>{
				this.drawMessage(msg)
			})
		},
		onLoad() {
			let token = this.checkLogin() // 判断是否登入
			getBets({data:{'l':this.currentLottery},headers: {'Authorization': 'Bearer ' +  token}}).then(data => {
			   this.list = data.game;
			})
		},
		onUnload() {
			uni.$off('showMenu')
			uni.$off('drawMessage')
		},
		onShow() {
			uni.setNavigationBarTitle({
				title:this.currentLotteryTitle
			})
		},
		beforeDestroy() {
			clearTimeout(this.tictokTimer)
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.$refs.mydraw.show();
			} else if (e.index == 1) {
				this.$refs.gamedraw.show();
			}
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
	    height: 70rpx;
		line-height:70rpx ;
	    display: flex;
		flex-direction: row;
	    -webkit-box-pack: justify;
	    box-sizing: border-box;
		padding-left: 6rpx;
		padding-right: 6rpx;
	    border-bottom: 1px solid rgb(204, 204, 204);
	}
	.draw{
		display: inline-block;
		line-height: 70rpx;
		color: #999999;
		font-size: 32rpx;
		margin-right: 16rpx;
		max-width: 240rpx;
	}
	.draw span {
		font-size: 30rpx;
		color: #1378bd;
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
