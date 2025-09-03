<template>
	<view>
		<sun-tab :value.sync="index" @change="arrayChange" :tabList="tabList" :activeColor="activeColor"></sun-tab>
		<view class="bank-cards-pannel" v-if="index == 1">
			<view class="uni-flex uni-row">
				<view class="flex-item width-1">
					<view class="info-title">银行卡号</view>
				</view>
				<view class="flex-item has-left-border width-2">
					<view class="info-title">银行名称</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">收款人</view>
				</view>
				<view class="flex-item has-left-border width-4">
					<view class="info-title">操作</view>
				</view>
			</view>
			<view>
				<view class="uni-flex uni-row" v-for="(item, index) in bankCards" :key="index">
					<view class="flex-item-v width-1" style="color: #08a100;">{{ item.card_number }}</view>
					<view class="flex-item-v width-2">{{item.bank_name }}</view>
					<view class="flex-item-v width-3">{{item.card_user }}</view>
					<view class="flex-item-v width-4" @click="copy(item.card_number, item.bank_name, item.card_user)">复制</view>
					
				</view>
				<view style="color: #ABABAB; margin: 100rpx auto;border-bottom: 1px solid #CCCCCC; text-align: center;" v-if="bankCards.length==0">
					暂无数据
				</view>
			</view>
		</view>
		
		<view class="bank-cards-pannel" v-if="index == 0">
			
			<view>
				<view style="margin: 100rpx auto;text-align: center;">
					<image :src="paymentCodes.code_img" mode="widthFix"></image>
					<button type="warn" size="small" @click="refreshCode">换一张</button>
				</view>
				<view style="color: #ABABAB; margin: 100rpx auto;border-bottom: 1px solid #CCCCCC; text-align: center;" v-if="paymentCodes.code_img == ''">
					暂无数据
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import {getHistory, getSysBankCards, getPaymentcode} from '../../common/api/index.js'
	export default {
	        data() {
	            return {
	                index: 0,
					activeColor:'#254667',
	                tabList: ['收款码', '银行卡'],
					list:[],
					bankCards:[],
					paymentCodes:{code_img:''}
	            }
	        },
	        methods: {
				refreshCode() {
					this.loadPaymentCodes()
				},
	            arrayChange(e){
					if (this.index == 0) {
						this.loadPaymentCodes()
					} else if(this.index == 1) {
						this.loadBankCards()
					}
				},
				loadBankCards() {
					let token = this.checkLogin() // 判断是否登入
					getSysBankCards({'Authorization': 'Bearer ' + token}).then(data => {
					   this.bankCards = data;
					})
				},
				loadPaymentCodes() {
					let token = this.checkLogin() // 判断是否登入
					getPaymentcode({'Authorization': 'Bearer ' + token}).then(data => {
						console.log(data)
					   this.paymentCodes = data;
					})
				},
				copy(cardNumber, cardName, cardUser) {
					let result
					uni.setClipboardData({
						data: cardNumber + '-' + cardName + '-' + cardUser, //要被复制的内容
						success: () => { //复制成功的回调函数
							uni.showToast({ //提示
								title: '复制成功'
							})
						}
					});
				}
	        },
			mounted() {
				this.loadPaymentCodes()
			}
	    }
</script>

<style scoped>
	.bank-cards-pannel{
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
		width: 40%;
	}
	.width-2{
		width: 25%;
	}
	.width-3{
		width: 20%;
	}
	.width-4{
		width: 15%;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
</style>
