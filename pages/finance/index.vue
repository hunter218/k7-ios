<template>
	<view>
		<view class="bill-pannel">
			<view class="uni-flex uni-row">
				<view class="flex-item width-1">
					<view class="info-title">时间</view>
				</view>
				<view class="flex-item has-left-border width-2">
					<view class="info-title">变动金额</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">变动后余额</view>
				</view>
				<view class="flex-item has-left-border width-4">
					<view class="info-title">类型</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">订单/期号</view>
				</view>
			</view>
			<view>
				<view class="uni-flex uni-row" v-for="(item, index) in logs" :key="index">
					<view class="flex-item-v width-1">{{ item.created_at }}</view>
					<view class="flex-item-v width-2" v-if="item.direction == 1">+{{ item.amount }}</view>
					<view class="flex-item-v width-2" v-else>-{{ item.amount }}</view>
					<view class="flex-item-v width-3">{{ item.balance }}</view>
					<view class="flex-item-v width-4" v-if="item.type == 1">上分</view>
					<view class="flex-item-v width-4" v-if="item.type == 2">下分</view>
					<view class="flex-item-v width-4" v-if="item.type == 3">投注</view>
					<view class="flex-item-v width-4" v-if="item.type == 4">结算</view>
					<view class="flex-item-v width-4" v-if="item.type == 5">退水</view>
					<view class="flex-item-v width-4" v-if="item.type == 6">返佣</view>
					<view class="flex-item-v width-4" v-if="item.type == 7">取消</view>
					<view class="flex-item-v width-4" v-if="item.type == 8">转入金库</view>
					<view class="flex-item-v width-4" v-if="item.type == 9">转出金库</view>
					
					<view class="flex-item-v width-3" @click="showOrderDetail(item.target_id)" v-if="item.type == 3">订单详情</view>
					<view class="flex-item-v width-3" @click="showOrderDetail(item.target_id)" v-else-if="item.type == 4">{{item.period}}</view>
					<view class="flex-item-v width-3" v-else>-</view>
				</view>
				<view style="color: #ABABAB; margin: 100rpx auto;border-bottom: 1px solid #CCCCCC; text-align: center;" v-if="logs.length==0">
					暂无数据
				</view>
			</view>
		</view>
		
		<section class="Popup-Page">
			<s-popup custom-class="center-popup" position="center" v-model="showOrderVisible">
				<view class="order-pannel">
					<view class="uni-flex uni-row">
						<view class="flex-item width-11">
							<view class="info-title">期号</view>
						</view>
						<view class="flex-item has-left-border width-22">
							<view class="info-title">玩法</view>
						</view>
						<view class="flex-item has-left-border width-33">
							<view class="info-title">押注</view>
						</view>
						<view class="flex-item has-left-border width-44">
							<view class="info-title">金额</view>
						</view>
					</view>
					<view>
						<view class="uni-flex uni-row" v-for="(item, index) in orders" :key="index">
							<view class="flex-item-v width-11">{{ item.period }}</view>
							<view class="flex-item-v width-22">{{ item.title }}</view>
							<view class="flex-item-v width-33">{{ item.text }}</view>
							<view class="flex-item-v width-44">{{ item.amount }}</view>
						</view>
					</view>
				</view>
			</s-popup>
		</section>
		
	</view>
</template>

<script>
	import {getFinance, getOrderDetail} from '../../common/api/index.js'
	var formatUtils = require('../../common/util.js').formatUtils
	export default {
		data() {
			return {
				showOrderVisible:false,
				logs: [],
				orders:[]
			}
		},
		methods: {
			showOrderDetail(orderNo) {
				this.showOrderVisible = true
				let token = this.checkLogin() // 判断是否登入
				getOrderDetail({'order_no': orderNo}, {'Authorization': 'Bearer ' + token}).then(data => {
				   this.orders = data.orders;
				})
			},
		},
		onLoad() {
			let token = this.checkLogin() // 判断是否登入
			getFinance({'Authorization': 'Bearer ' + token}).then(data => {
			   this.logs = data.logs.list;
			})
		}
	}
</script>

<style scoped>
	.order-pannel{
		width: 300px;
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
		width: 40%;
	}
	.width-2{
		width: 20%;
	}
	.width-3{
		width: 20%;
	}
	.width-4{
		width: 15%;
	}
	.width-11{
		width: 40%;
	}
	.width-22{
		width: 20%;
	}
	.width-33{
		width: 20%;
	}
	.width-44{
		width: 20%;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
</style>
