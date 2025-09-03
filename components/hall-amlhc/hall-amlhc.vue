<template>
    <view>
        <view class="uni-padding-wrap uni-common-mt">
            <view class="uni-flex uni-column">
                <view class="flex-item flex-item-V" style="background-color: #f1f1ff;">
                    <view class="uni-flex uni-row" style="font-size: 32rpx;color: #b26646;">
                        <view class="flex-item" style="width: 20%;">
							<view class="iconfont icon-num-s6"></view>
						</view>
                        <view class="flex-item" style="width: 30%;line-height: 120rpx;font-weight:bold">新澳门六合彩</view>
						<view class="flex-item" style="width: 50%;">
							<view class="uni-flex uni-column" style="margin-top: 20rpx;">
								<view class="flex-item flex-item-V"></view>
								<view class="flex-item flex-item-V" style="color:#b26646;">{{drawMsg}}</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex-item flex-item-V" style="background-color: #b26646;">
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
				currentLottery:'AM',
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
				drawMsg:'运营中',
				timeout:1000,
				tictokTimer: null,
				countDownTimer: null,
			}
		},
		methods:{
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
	border-top: 2px solid #b26646;
	border-left: 2px solid #b26646;
	border-right: 2px solid #b26646;
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
.icon-num-s6 {
	color: #b26646;
}
</style>