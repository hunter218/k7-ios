<template>
    <view class="wrapper">
        <view class="login-form">
			<view class="form-wrapper">
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-form-item uni-input-my-wrapper">
						<label>旧密码</label>
						<input class="uni-input" name="old_pwd" placeholder="请输入旧密码" :password="showPassword" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label>新密码</label>
					    <input class="uni-input" name="new_pwd" placeholder="6~20字符必须包含大小写和数字" :password="showPassword" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label>确认密码</label>
						<input class="uni-input" name="new_pwd_confirm" placeholder="确认密码" :password="showPassword" />
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
	import {password} from '../../common/api/index.js'
    export default {
        data() {
            return {
				showPassword: true
            }
        },
        methods: {
            formSubmit: function(e) {
				if (e.detail.value.new_pwd != e.detail.value.new_pwd_confirm) {
					uni.showModal({
						title:'提示',
						content:'密码不一致',
						showCancel:false
					})
				}
				let token = this.checkLogin() // 判断是否登入
				var formdata = e.detail.value
				let res = password(JSON.stringify(formdata), {'Authorization': 'Bearer' + token}).then(data => {
					uni.showToast({
						title:data.error_message,
					})
					setTimeout(function(){
						uni.reLaunch({
						    url: '/pages/index/index'
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
		font-size: 32rpx;
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
