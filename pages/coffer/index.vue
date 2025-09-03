<template>
    <view class="wrapper">
		<view class="coffer">
			金库余额：{{coffer_quota}}
		</view>
		<view class="rough-lines"></view>
        <view class="coffer-form">
			<view class="form-wrapper">
				<form>
					<view class="uni-form-item uni-input-my-wrapper">
						<label>金额</label>
						<input class="uni-input" name="amount" placeholder="请输入金额" v-model="amount"/>
					</view>
					<view style="display: flex;">
					<button class="btn" @click="recharge">存入</button>
					<button class="btn" @click="withdraw">转出</button>
					</view>
				</form>
			</view>
        </view>
		
		<view style="text-align: center;color:#966060;">
			怕下注错误无法撤回，可以把积分暂存于此，随时可以提取
		</view>
    </view>
</template>
<script>
	import {cofferOut, cofferIn, getMyQuota} from '../../common/api/index.js'
    export default {
        data() {
            return {
				coffer_quota:0.00,
				amount:'',
            }
        },
        methods: {
            recharge: function() {
				if (parseFloat(this.amount) <= 0 || isNaN(parseFloat(this.amount))) {
					uni.showModal({
						title:'提示',
						content:'请输入正确的金额',
						showCancel:false
					})
					return ;
				}
				let token = this.checkLogin() // 判断是否登入
				let res = cofferIn({amount:this.amount}, {'Authorization': 'Bearer' + token}).then(data => {
					uni.showToast({
						title:data.error_message,
					})
					this.loadInfo()
				})
            },
			withdraw: function() {
				if (parseFloat(this.amount) <= 0 || isNaN(parseFloat(this.amount))) {
					uni.showModal({
						title:'提示',
						content:'请输入正确的金额',
						showCancel:false
					})
					return ;
				}
				let token = this.checkLogin() // 判断是否登入
				let res = cofferOut({amount:this.amount}, {'Authorization': 'Bearer' + token}).then(data => {
					uni.showToast({
						title:data.error_message,
					})
					this.loadInfo()
				})
			},
			
			loadInfo: function() {
				let token = this.checkLogin() // 判断是否登入
				getMyQuota({'Authorization': 'Bearer ' + token}).then(data => {
					this.coffer_quota = data.coffer_quota
				})
			},
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
	.coffer{
		border: 1px solid #ffcb00;
		background-color:#ffcb00;
		width: 200px;
		margin: 20px auto;
		text-align: center;
		font-size: 32rpx;
		color: #b20000;
		border-radius:52rpx;
	}
	.coffer-form {
		width: 90%;
		display: table;
		margin: 20px auto;
		position: relative;
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
		width: 25%;
	}
	.width-3{
		width: 30%;
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
