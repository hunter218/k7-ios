<template>
    <view class="wrapper">
        <view class="login-form">
			<view class="form-wrapper">
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-form-item uni-input-my-wrapper">
						<label>用户名</label>
						<input class="uni-input" name="username" placeholder="字母开头只能包含英文和数字3-10位" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label>密码</label>
						<input class="uni-input" name="password" placeholder="6~20字符必须包含字母和数字" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label>返水点数</label>
					    <input class="uni-input" name="water" placeholder="必须是数字只能包含一位小数点" />
					</view>
					<view style="display: flex;">
					<button class="btn" form-type="submit">确认</button>
					<button class="btn" form-type="reset">重置</button>
					</view>
				</form>
			</view>
        </view>
    </view>
</template>
<script>
	import {addAgent} from '../../common/api/index.js'
    export default {
        data() {
            return {
            }
        },
        methods: {
            formSubmit: function(e) {
				const pattern1 = /^[a-zA-Z]{1}[a-z|A-Z|0-9]{2,9}$/
				if (!pattern1.test(e.detail.value.username)) {
					uni.showModal({
						title:'提示',
						content:'用户名只能包含英文和数字3-10位，并且字母开头',
						showCancel:false
					})
					return ;
				}
				const pattern2 = /^[a-zA-Z0-9]{6,}$/
				if (!pattern2.test(e.detail.value.password)) {
					uni.showModal({
						title:'提示',
						content:'密码不能小于6个字符必须包含字母和数字',
						showCancel:false
					})
					return ;
				}
				const pattern3 = /(^[0-9]\.[0-9]$)/
				if (!pattern3.test(e.detail.value.water)) {
					uni.showModal({
						title:'提示',
						content:'返水点数必须是数字只能包含一位小数点',
						showCancel:false
					})
					return ;
				}
				let token = this.checkLogin() // 判断是否登入
				var formdata = e.detail.value
				let res = addAgent(JSON.stringify(formdata), {'Authorization': 'Bearer' + token}).then(data => {
					uni.showToast({
						title:data.error_message,
					})
					setTimeout(function(){
						uni.navigateTo({
						    url: '/pages/user/info'
						});
					} , 2000);
				})
            },
			formReset: function(e) {
				e.detail.value = ''
			}
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
		height: calc(100% - 46px);
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
	    background-color: #264567;
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
</style>
