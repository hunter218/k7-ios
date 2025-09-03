<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view class="uni-flex uni-column">
                <view class="flex-item flex-item-V" style="background-color: #f1f1ff;">
                    <view class="uni-flex uni-row" style="font-size: 32rpx;color: #666699;">
                        <view class="flex-item" style="width: 20%;">
							<view class="iconfont icon-AULUCKY1027cadb94"></view>
						</view>
                        <view class="flex-item" style="width: 30%;line-height: 120rpx;font-weight:bold">澳洲幸运十</view>
						<view class="flex-item" style="width: 50%;">
							<view class="uni-flex uni-column" style="margin-top: 20rpx;">
								<view class="flex-item flex-item-V">第{{currentDrawNumber}}期</view>
								<view class="flex-item flex-item-V" style="color:#ff0505;">{{drawMsg}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex-item flex-item-V" style="background-color: #0968f5;">
					<view class="uni-flex uni-row">
						<view style="width: 30%;color: #FFF;">{{lastDrawNumber}}</view>
						<view class="priz">
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
				currentLottery:'AZXYS',
				currentDrawNumber:'',
				lastDrawNumber:'',
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
				timeout:1000,
				tictokTimer: null,
				countDownTimer: null,
			}
		},
		methods:{
			hallMessageAzxys: function (msg) {
				if (msg.status == 'success' && msg.result.type == 'azxysTictok') {
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
					this.przBall6 = data.n6
					this.przBall7 = data.n7
					this.przBall8 = data.n8
					this.przBall9 = data.n9
					this.przBall10 = data.n10
					
					let drawLeftTime = this.drawTime - this.currentTime // 距离开奖时间
					if (drawLeftTime > 0) {
						let drawLeftMinutes = Math.floor(drawLeftTime / 60)
						let drawLeftSeconds = Math.floor(drawLeftTime % 60)
						if (10 > drawLeftMinutes > 0) {
							drawLeftMinutes = "0" + drawLeftMinutes
						}
						if (10 > drawLeftSeconds > 0) {
							drawLeftSeconds = "0" + drawLeftSeconds
						}
						this.drawMsg = drawLeftMinutes + ":" + drawLeftSeconds
						--drawLeftTime
					} else {
						this.drawMsg = "开奖中"
					}
				}
			},
			initTictok () {
				clearInterval(this.tictokTimer)
			    this.tictokTimer = setInterval(() => {
			        let token = this.checkLogin()
			        let param = {
			        	"type":"hall",
			        	"lottery":"AZXYS",
			        	"token":token,
			        };
			        getApp().globalData.socket.sendSocketMessage(JSON.stringify(param));
			    }, this.timeout);
			}
		},
		created() {
			clearInterval(this.tictokTimer)
			uni.$on('hallMessageAzxys', (msg)=>{
				this.hallMessageAzxys(msg);
			})
			this.initTictok()
		},
		destroyed() {
			clearInterval(this.tictokTimer)
			uni.$off('hallMessageAzxys')
		}
	}
</script>

<style>
.uni-padding-wrap {
	width: 90%;
	padding: 0;
	margin: 30rpx auto;
	border-top: 2px solid #0968f5;
	border-left: 2px solid #0968f5;
	border-right: 2px solid #0968f5;
}
.flex-item {
	text-align: center;
}
.iconfont {
	display: flex;
	flex-direction: row;
	font-size: 110rpx;
	color: #6783c1;
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