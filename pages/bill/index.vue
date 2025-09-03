<template>
	<view>
		<view class="bill-pannel">
			<view class="uni-flex uni-row">
				<view class="flex-item width-1">
					<view class="info-title">注单号</view>
				</view>
				<view class="flex-item has-left-border width-2">
					<view class="info-title">类型</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">玩法</view>
				</view>
				<view class="flex-item has-left-border width-4">
					<view class="info-title">下注金额</view>
				</view>
				<view class="flex-item has-left-border width-4">
					<view class="info-title">可赢金额</view>
				</view>
			</view>
			<view>
				<view class="uni-flex uni-row" v-for="(item, index) in list" :key="index">
					<view class="flex-item-v width-1">{{ item.order_no }}</view>
					<view class="flex-item-v width-2">{{ formatLottery(item.lottery) }}</view>
					<view class="flex-item-v width-3">{{ item.title }}</view>
					<view class="flex-item-v width-4">{{ item.amount }}</view>
					<view class="flex-item-v width-4">{{ parseFloat(item.amount * item.odds).toFixed(2) }}</view>
				</view>
				<view style="color: #ABABAB; margin: 100rpx auto;border-bottom: 1px solid #CCCCCC; text-align: center;" v-if="list.length==0">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUnsettled} from '../../common/api/index.js'
	var formatUtils = require('../../common/util.js').formatUtils
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			formatLottery(lottery){
				return formatUtils.lotteryFormatter(lottery)
			}
		},
		onLoad() {
			let token = this.checkLogin() // 判断是否登入
			getUnsettled({'Authorization': 'Bearer ' + token}).then(data => {
			   this.list = data.orders;
			})
		}
	}
</script>

<style scoped>
	.bill-pannel{
		width: 100%;
	}
	.info-title {
		line-height: 60rpx;
		font-size: 24rpx;
	}
	.flex-item {
		text-align: center;
		line-height: 80rpx;
		background-color: #EBEBEB;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
	}
	.flex-item-v {
		text-align: center;
		line-height: 80rpx;
		background-color: #FFF;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
		font-size: 24rpx;
	}
	.width-1{
		width: 35%;
	}
	.width-2{
		width: 20%;
	}
	.width-3{
		width: 18%;
	}
	.width-4{
		width: 15%;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
</style>
