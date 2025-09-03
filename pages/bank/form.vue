<template>
    <view class="wrapper">
        <view class="login-form">
			<view class="form-wrapper">
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-form-item uni-input-my-wrapper">
						<label>持卡人姓名</label>
						<input class="uni-input" name="card_user" placeholder="请输入持卡人姓名" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label>银行名称</label>
						<input class="uni-input" name="bank_name" placeholder="请输入银行名称" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label>银行卡号</label>
					    <input class="uni-input" name="card_number" placeholder="请输入银行卡号" />
					</view>
					<view style="display: flex;">
					<button class="btn" form-type="submit">确认</button>
					<button class="btn" form-type="reset">重置</button>
					</view>
				</form>
			</view>
        </view>
		
		<view class="rough-lines"></view>
		<view style="text-align: center; background-color: #272e5c; color: #FFFFFF;font-size: 32rpx;">银行卡</view>
		<view class="card-pannel">
			<view class="uni-flex uni-row">
				<view class="card-flex-item width-1">
					<view class="info-title">持卡人</view>
				</view>
				<view class="card-flex-item has-left-border width-2">
					<view class="info-title">银行名称</view>
				</view>
				<view class="card-flex-item has-left-border width-3">
					<view class="info-title">银行卡号</view>
				</view>
				<view class="card-flex-item has-left-border width-4">
					<view class="info-title">默认</view>
				</view>
				<view class="card-flex-item has-left-border width-5">
					<view class="info-title">操作</view>
				</view>
			</view>
			<view>
				<view class="uni-flex uni-row" v-for="(item, index) in cardInfo" :key="index">
					<view class="card-flex-item-v width-1">{{ item.card_user }}</view>
					<view class="card-flex-item-v has-left-border width-2">{{ item.bank_name }}</view>
					<view class="card-flex-item-v has-left-border width-3">{{ item.card_number }}</view>
					<view class="card-flex-item-v has-left-border width-4" v-if="item.is_default=='1'">是</view>
					<view class="card-flex-item-v has-left-border width-4" v-if="item.is_default=='2'">否</view>
					<view class="card-flex-item-v has-left-border width-5">
						<button type="primary" size="mini" class="set-card-btn" @click="setCard(item.id)">设置</button>
					</view>
				</view>
			</view>
		</view>
    </view>
</template>
<script>
	import {addBankCard, getBankCards, setDefaultCard} from '../../common/api/index.js'
    export default {
        data() {
            return {
				cardInfo:{}
            }
        },
        methods: {
            formSubmit: function(e) {
				const pattern = /^[0-9]{18,20}$/
				if (!pattern.test(e.detail.value.card_number)) {
					uni.showModal({
						title:'提示',
						content:'请输入正确的银行卡号',
						showCancel:false
					})
					return ;
				}
				let token = this.checkLogin() // 判断是否登入
				var formdata = e.detail.value
				let res = addBankCard(JSON.stringify(formdata), {'Authorization': 'Bearer' + token}).then(data => {
					uni.showToast({
						title:data.error_message,
					})
					this.loadInfo()
				})
            },
			formReset: function(e) {
				e.detail.value = ''
			},
			
			loadInfo: function() {
				let token = this.checkLogin() // 判断是否登入
				getBankCards({'Authorization': 'Bearer ' + token}).then(data => {
				   this.cardInfo = data.bank_cards
				})
			},
			setCard: function(id) {
				let token = this.checkLogin() // 判断是否登入
				var formdata = {'id': id}
				let res = setDefaultCard(JSON.stringify(formdata), {'Authorization': 'Bearer' + token}).then(data => {
					uni.showToast({
						title:data.error_message,
					})
					
					setTimeout(() => {
						uni.reLaunch({
							url:'/pages/index/index'
						})
					}, 1000)
				})
			}
        },
		mounted() {
			this.loadInfo()
		}
    }
</script>

<style>
	page{
		background-color: #EFEFEF;
		height: 100%;
	}
	.wrapper {
		height: 100%;
	}
	.login-form {
		width: 90%;
		display: table;
		margin: auto;
		position: relative;
		min-height: 350px;
	}
	.form-wrapper {
	    display: table-cell;
	    vertical-align: top;
	}
	
	.uni-input-my-wrapper {
	    /* #ifndef APP-NVUE */
	    display: flex;
	    /* #endif */
	    flex-direction: row;
	    flex-wrap: nowrap;
		border-radius: 10rpx;
		border: 1rpx solid #CCCCCC;
	    background-color: #FFFFFF;
		
	}
	.uni-input-placeholder{
		color: #D6D6D6;
	}
	.uni-input {
		font-size: 26rpx;
		padding-left: 200rpx;
	}
	.uni-form-item {
		margin: 20rpx 0;
	}
	.btn {
	    width: 45%;
	    display: block;
	    border-radius: 10rpx;
	    background-color: #272e5c;
	    border: 0px;
	    outline: none;
	    color: #FFFFFF;
	    height: 40px;
	    margin: 10px auto;
	    font-weight: bold;
	    text-align: center;
	    line-height: 40px;
		font-size: 28rpx;
		border: 1px solid rgb(255, 255, 255);
	}
	input {
		border-radius: 10rpx;
	}
	label {
		position: absolute;
		font-size: 32rpx;
		line-height: 78rpx;
		left: 20rpx;
		color: #9e9c9c;
	}
	
	.rough-lines {
	    width: 100%;
	    height: 10px;
	    background-color: #ebebeb;
	    box-shadow: #bbbbbb 0px 1px 1px inset;
	}
	
	.card-pannel{
		width: 100%;
	}
	.info-title {
		line-height: 60rpx;
		font-size: 24rpx;
	}
	.card-flex-item {
		text-align: center;
		line-height: 40rpx;
		background-color: #EBEBEB;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
	}
	.card-flex-item-v {
		text-align: center;
		line-height: 80rpx;
		background-color: #FFF;
		color: #666666;
		height: 80rpx;
		border-bottom: 1rpx solid #ccc;
		font-size: 24rpx;
	}
	.width-1{
		width: 15%;
	}
	.width-2{
		width: 20%;
	}
	.width-3{
		width: 35%;
	}
	.width-4{
		width: 10%;
	}
	.width-5{
		width: 20%;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
	.set-card-btn {
		vertical-align: middle;
	}
</style>
