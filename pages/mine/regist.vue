<template>
    <view class="wrapper">
        <view class="login-form">
			<view class="form-wrapper">
				<form @submit="formSubmit">
					<view class="uni-form-item uni-input-my-wrapper">
						<label class="iconfont icon-user"></label>
						<input v-model="userName" class="uni-input" name="username" placeholder="请输入6-16字母开头字母和数字组合" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label class="iconfont icon-password"></label>
					    <input v-model="password" class="uni-input" name="password" placeholder="8-16位的大小写字母和数字组合密码"/>
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label class="iconfont icon-password"></label>
					    <input v-model="repeatpassword" class="uni-input" name="repeatpassword" placeholder="请再次填写密码"/>
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label class="iconfont icon-daohang1"></label>
						<input v-model="inviteCode" class="uni-input" name="invitecode" placeholder="邀请码" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label class="iconfont icon-yanzhengma"></label>
						<input class="uni-input" name="vcode" placeholder="验证码" />
						<image class="vcode" :src=codeImg @click="refreshCaptcha"></image>
					</view>
					<view class="regist-pannel">
						<button class="regist-btn" form-type="submit"></button>
					</view>
				</form>
			</view>
        </view>
    </view>
</template>
<script>
	import {getCaptcha, regist} from '../../common/api/index.js';
    export default {
        data() {
            return {
				userName: '', // 账号
				password: '', // 密码
				repeatpassword: '', // 密码
				inviteCode: '', // 邀请码
				codeImg:''
            }
        },
		onLoad() {
			let res = getCaptcha().then(data => {
			   this.codeImg = data.captcha;
			});
		},
        methods: {
            formSubmit: function(e) {
				var formdata = e.detail.value
				formdata.platform = 'andorid'
				let res = regist(JSON.stringify(formdata)).then(data => {
					uni.showToast({
						title:data.error_message,
						success:function(res){
							uni.setStorageSync('token', data.results.token)
							uni.setStorageSync('username', data.results.username)
							uni.setStorageSync('nickname', data.results.nickname)
							uni.setStorageSync('useravatar', data.results.useravatar)
							
							setTimeout(function(){
								getApp().globalData.socket.initSocket()
								uni.reLaunch({
								    url: '/pages/index/index'
								});
							} , 500);
						}
					})
				});
            },
			refreshCaptcha:function() {
				let res = getCaptcha().then(data => {
				   this.codeImg = data.captcha;
				});
			},
			doRegist:function() {
				
			}
        }
    }
</script>

<style>
	page{
		background: #272e5c;
		background-size: 100% 100%;;
		width: 100%;
		height: 100%;
	}
	.wrapper {
		min-height: 100%;
		background-color: #272e5c;
		width: 100%;
	}
	.login-title {
		position: relative;
		top: 100rpx;
		text-align:center;
		color:#FFF;
		font-size:100rpx;
		font-weight:bold;
	}
	.login-form {
		width: 80%;
		height: calc(100% - 46px);
		display: table;
		margin: auto;
		position: relative;
		min-height: 450px;
	}
	.form-wrapper {
	    display: table-cell;
	    vertical-align: bottom;
	}
	.btn {
	    width: 100%;
	    display: block;
	    border-radius: 2rem;
	    background-color: transparent;
	    border: 0px;
	    outline: none;
	    color: rgb(255, 255, 255);
	    height: 40px;
	    margin: 10px auto;
	    font-weight: bold;
	    text-align: center;
	    line-height: 40px;
		font-size: 28rpx;
		border: 1px solid rgb(255, 255, 255);
	}
	.uni-input-my-wrapper {
	    /* #ifndef APP-NVUE */
	    display: flex;
	    /* #endif */
	    flex-direction: row;
	    flex-wrap: nowrap;
		border-radius: 2rem;
		background-color: #FFFFFF;
	}
	.uni-input {
		padding-left: 110rpx;
	}
	.uni-icon {
	    font-family: uniicons;
	    font-size: 48rpx;
	    font-weight: normal;
	    font-style: normal;
	    width: 48rpx;
	    height: 48rpx;
	    line-height: 78rpx;
	    color: #999999;
		right: 30rpx;
		position: absolute;
	}
	.uni-eye-active {
	    color: #007AFF;
	}
	.uni-form-item {
		margin: 20rpx 0;
	}
	input {
		border-radius: 2rem;
	}
	label {
		position: absolute;
		font-size: 48rpx;
		left: 40rpx;
	}
	.iconfont {
		color: #adc9ff;
		line-height: 80rpx;
	}
	.vcode {
		width: 140rpx;
		height: 78rpx;
		right: 30rpx;
		position: absolute;
	}
	.outline {
		background-image: url('@/static/images/register_btn.png');
		background-size: 100% 100%;
		width: 120rpx;
		height: 140rpx;
		background-repeat: no-repeat;
	}
	.regist-pannel {
		display: flex;
	}
	.regist-btn {
		margin: 20px auto;
		background-image: url('@/static/images/register_btn.png');
		background-size: 100% 100%;
		width: 100%;
		height: 90rpx;
		border-radius: 60rpx;
		background-repeat: no-repeat;
	}
</style>
