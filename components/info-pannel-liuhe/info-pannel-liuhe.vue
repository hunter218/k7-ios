<template>
	<view>
		<view class="info-pannel">
			<view class="uni-flex uni-row" :class="(open ? 'gSbRmf' : 'dRtNjK')">
				<view class="flex-item">
					<view class="info-title">积分</view>
					<view class="info-content">{{ kk_quota }}</view>
				</view>
				<view class="flex-item has-left-border">
					<view class="info-title">今日澳彩流水</view>
					<view class="info-content">{{ todayTotalAmount }}</view>
				</view>
				<view class="flex-item has-left-border">
					<view class="info-title">今日澳彩输赢</view>
					<view class="info-content">{{ todaySettledSmount }}</view>
				</view>
			</view>
		</view>
		<view class="fCZmpJ">
			<view class="uq_icon" @click="togglePannel"></view>
		</view>
	</view>
</template>

<script>
	import {getMyQuotaLiuhe} from '../../common/api/index.js';
	export default {
		data() {
			return {
				open: true,
				kk_quota: '0.0',
				todayTotalAmount: '0.0',
				todaySettledSmount: '0.0',
			}
		},
		methods: {
			togglePannel() {
				this.open = !this.open
			},
			refreshQuotaLiuhe() {
				let token = this.checkLogin() // 判断是否登入
				getMyQuotaLiuhe({'Authorization': 'Bearer ' + token}).then(data => {
					this.kk_quota = data.kk_quota
					this.todayTotalAmount = data.today_total_amount
					this.todaySettledSmount = data.today_settled_amount
				})
			}
		},
		created() {
			this.refreshQuotaLiuhe();
			uni.$on('updateQuotaLiuhe', (item)=>{
				this.refreshQuotaLiuhe();
			})
		},
		destroyed() {
			uni.$off('updateQuotaLiuhe')
		}
	}
</script>

<style>
	.info-pannel {
		overflow: hidden;
		border: 0rpx solid red;
	}
	.info-title{
		line-height: 60rpx;
	}
	.info-content{
		line-height: 10rpx; 
		color: #ff4d4d;
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
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
	.fCZmpJ {
	    width: 100%;
	    height: 30rpx;
	    background-color: rgb(235, 235, 235);
	    box-shadow: rgb(187, 187, 187) 0px 0.5px 1px inset;
	}
	.uq_icon {
	    width: 124rpx;
	    height: 32rpx;
	    background: url(../../static/images/sprites.png) -130rpx 32rpx / 710rpx 220rpx;;
	    transform: scale(0.9);
		transform-origin: center top;
	    margin: -1px auto 0px;
	}
	.gSbRmf {
		transition: height 0.4s ease-in-out 0s;
		height: 90rpx;
	}
	.dRtNjK {
		transition: height 0.4s ease-in-out 0s;
		height: 0;
	}
</style>
