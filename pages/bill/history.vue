<template>
	<view>
		<sun-tab :value.sync="index" @change="arrayChange" :tabList="tabList" :activeColor="activeColor"></sun-tab>
		<view class="history-pannel">
			<view class="uni-flex uni-row">
				<view class="flex-item width-1">
					<view class="info-title">日期</view>
				</view>
				<view class="flex-item has-left-border width-2">
					<view class="info-title">注数</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">下注金额</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">有效金额</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">盈亏</view>
				</view>
			</view>
			<view>
				<view class="uni-flex uni-row" v-for="(item, index) in list" :key="index">
					<view class="flex-item-v width-1" style="color: #08a100;">{{ item.date }}星期{{ weekDateMap(index) }}</view>
					<view class="flex-item-v width-2">{{ item.totalNote == null ? '0' : item.totalNote }}</view>
					<view class="flex-item-v width-3">{{ item.totalAmount == null ? '0.0' : item.totalAmount }}</view>
					<view class="flex-item-v width-3">{{ item.effectiveAmount == null ? '0.0' : item.effectiveAmount }}</view>
					<view class="flex-item-v width-3">{{ item.profit == null ? '0.0' : item.profit }}</view>
				</view>
				<view style="color: #ABABAB; margin: 100rpx auto;border-bottom: 1px solid #CCCCCC; text-align: center;" v-if="list.length==0">
					暂无数据
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import {getHistory} from '../../common/api/index.js'
	export default {
	        data() {
	            return {
	                index: 0,
					activeColor:'#254667',
	                tabList: ['本周', '上周'],
					list:[]
	            }
	        },
	        methods: {
	            arrayChange(e){
					this.loadBill()
				},
				weekDateMap(i){
					switch(i){
						case 0: return '一';break;
						case 1: return '二';break;
						case 2: return '三';break;
						case 3: return '四';break;
						case 4: return '五';break;
						case 5: return '六';break;
						case 6: return '日';break;
					}
				},
				loadBill() {
					let token = this.checkLogin() // 判断是否登入
					getHistory({'t':this.index}, {'Authorization': 'Bearer ' + token}).then(data => {
					   this.list = data.bill;
					})
				}
	        },
			mounted() {
				this.loadBill()
			}
	    }
</script>

<style scoped>
	.history-pannel{
		width: 100%;
	}
	.info-title {
		line-height: 60rpx;
		font-size: 24rpx;
	}
	.flex-item {
		text-align: center;
		line-height: 180rpx;
		background-color: #EBEBEB;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
	}
	.flex-item-v {
		width: 100%;
		color: #666666;
		min-height: 60px;
		-webkit-box-align: center;
		align-items: center;
		text-align: center;
		vertical-align: middle;
		box-sizing: border-box;
		border-bottom: 1px solid #cccccc;
		padding-top: 50rpx;
	}
	.width-1{
		width: 30%;
	}
	.width-2{
		width: 10%;
	}
	.width-3{
		width: 20%;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
</style>
