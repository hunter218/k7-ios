<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view class="uni-flex uni-column">
                <view class="flex-item flex-item-V" style="background-color: #f1f1ff;">
                    <view class="uni-flex uni-row" style="font-size: 32rpx;color: #666699;">
                        <view class="flex-item" style="width: 20%;">
							<view class="iconfont icon-AULUCKY55ac510c5"></view>
						</view>
                        <view class="flex-item" style="width: 30%;line-height: 120rpx;font-weight:bold">澳洲幸运五</view>
						<view class="flex-item" style="width: 50%;">
							<view class="uni-flex uni-column" style="margin-top: 20rpx;">
								<view class="flex-item flex-item-V"></view>
								<view class="flex-item flex-item-V" style="color:#ff0505;">{{drawMsg}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex-item flex-item-V" style="background-color: #4b368e;">
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
				currentLottery:'AZXYW',
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
			hallMessageAzxyw: function (msg) {
				if (msg.status == 'success' && msg.result.type == 'azxywTictok') {
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
			    	"lottery":"AZXYW",
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
	border-top: 2px solid #4b368e;
	border-left: 2px solid #4b368e;
	border-right: 2px solid #4b368e;
}
.flex-item {
	text-align: center;
}
.iconfont {
	display: flex;
	flex-direction: row;
	font-size: 110rpx;
	color: #4b368e;
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