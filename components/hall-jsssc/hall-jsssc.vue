<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view class="uni-flex uni-column">
                <view class="flex-item flex-item-V" style="background-color: #f1f1ff;">
                    <view class="uni-flex uni-row" style="font-size: 32rpx;color: #666699;">
                        <view class="flex-item" style="width: 20%;">
							<view class="iconfont icon-SSCJSC5a31db0b"></view>
						</view>
                        <view class="flex-item" style="width: 30%;line-height: 120rpx;font-weight:bold">极速时时彩</view>
						<view class="flex-item" style="width: 50%;">
							<view class="uni-flex uni-column" style="margin-top: 20rpx;">
								<view class="flex-item flex-item-V"></view>
								<view class="flex-item flex-item-V" style="color:#ff0505;">{{drawMsg}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex-item flex-item-V" style="background-color: #f47f38;">
					<view class="uni-flex uni-row">
						<view style="width: 30%;color: #FFF;"></view>
						<view class="priz">
							
						</view>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
	import { getPeriod } from '../../common/api/index.js'
	export default {
		data() {
			return {
				currentLottery:'JSSSC',
				currentDrawNumber:'',
				lastDrawNumber:'',
				przBall1:'',
				przBall2:'',
				przBall3:'',
				przBall4:'',
				przBall5:'',
				drawMsg:'运营中',
				timeout:1000,
				tictokTimer: null,
				countDownTimer: null,
			}
		},
		methods:{
			hallMessageJsssc: function (msg) {
				if (msg.status == 'success' && msg.result.type == 'jssscTictok') {
					let data = msg.result
					this.drawTime = data.drawTime
					this.currentTime = data.currentTime
					this.lastDrawNumber = data.pNumber
					this.currentDrawNumber = data.cNumber
					
					this.przBall1 = data.n1
					this.przBall2 = data.n2
					this.przBall3 = data.n3
					this.przBall4 = data.n4
					this.przBall5 = data.n5
					
					if (data.bounce === true) {
						this.drawMsg = "停止运营"
					} else {
						this.drawMsg = "运营中"
					}
				}
			},
			initTictok () {
			    let token = this.checkLogin()
			    let param = {
			    	"type":"hall",
			    	"lottery":"JSSSC",
			    	"token":token,
			    };
			    getApp().globalData.socket.sendSocketMessage(JSON.stringify(param));
			}
		},
		created() {
		},
	}
</script>

<style>
.uni-padding-wrap {
	width: 90%;
	padding: 0;
	margin: 30rpx auto;
	border-top: 2px solid #f47f38;
	border-left: 2px solid #f47f38;
	border-right: 2px solid #f47f38;
}
.flex-item {
	text-align: center;
}
.iconfont {
	display: flex;
	flex-direction: row;
	font-size: 110rpx;
	color: #f31506;
	line-height: 130rpx;
	margin-left: 20rpx;
}
.priz {
	margin: 0 auto;
	display: inline-flex;
	-webkit-box-align: center;
	align-items: center;
	width: auto;
	flex-flow: row wrap;
	height: 40rpx;
}
.priz-board {
	height: 40rpx;
	line-height:40rpx ;
	display: flex;
	flex-direction: row;
	-webkit-box-pack: justify;
	box-sizing: border-box;
	padding-left: 6rpx;
	padding-right: 6rpx;
	border-bottom: 1px solid rgb(204, 204, 204);
}
.priz-ball{
	width: 40rpx;
	height: 40rpx;
	line-height:40rpx;
}
</style>