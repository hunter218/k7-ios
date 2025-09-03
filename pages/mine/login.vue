<template>
    <view class="wrapper">
        <view class="login-form">
			<view class="form-wrapper">
				<form @submit="formSubmit">
					<view class="uni-form-item uni-input-my-wrapper">
						<label class="iconfont icon-user"></label>
						<input v-model="user.userName" class="uni-input" name="username" placeholder="用户昵称" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label class="iconfont icon-password"></label>
					    <input v-model="user.password" class="uni-input" name="password" placeholder="您的密码" :password="showPassword" />
					    <text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword">&#xe568;</text>
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label class="iconfont icon-yanzhengma"></label>
						<input class="uni-input" name="vcode" placeholder="验证码" />
						<image class="vcode" :src=codeImg @click="refreshCaptcha"></image>
					</view>
					<view class="remember-psw">
						<checkbox-group @change="checkboxChange">
							<checkbox id="chkRem" type="checkbox"  :checked='rememberPsw' @tap="rememberPsw = !rememberPsw" color="#2660ff" style="transform: scale(0.7);"/>
							<text style="color: #FFF;">记住密码</text>
						</checkbox-group>
					</view>
					
					<button class="btn outline" form-type="submit">登入</button>
				</form>
			</view>
        </view>
    </view>
</template>
<script>
	import {getCaptcha, login} from '../../common/api/index.js';
    export default {
        data() {
            return {
				value: "",
				rememberPsw: true,//复选框状态 默认勾选
				user: {
					userName: '', // 账号
					password: '', // 密码
					nickName: '', // 昵称
				},
				showPassword: true,
				codeImg:''
            }
        },
		mounted() {
			const K8username = uni.getStorageSync('K8username');
			const K8password = uni.getStorageSync('K8password');
			if (K8username && K8password) {
				this.user.userName = K8username;
				this.user.password = K8password;
			} else {
				this.user.userName = '';
				this.user.password = '';
			}
		},
		onLoad() {
			let res = getCaptcha().then(data => {
			   this.codeImg = data.captcha;
			});
		},
        methods: {
			checkboxChange: function(e) {
				if (e.detail.value.length == 1) {
					uni.getStorageSync('K8username',this.user.userName);
					uni.getStorageSync('K8password',this.user.password);
				} else {
					uni.removeStorageSync('K8username');
					uni.removeStorageSync('K8password');              
				}
			},
            formSubmit: function(e) {
				var formdata = e.detail.value
				formdata.platform = 'andorid'
				let res = login(JSON.stringify(formdata)).then(data => {
					uni.setStorageSync('token', data.results.token)
					uni.setStorageSync('username', data.results.username)
					uni.setStorageSync('nickname', data.results.nickname)
					
					if (this.rememberPsw) {
						uni.setStorageSync('K8username', this.user.userName);
						uni.setStorageSync('K8password', this.user.password);
					} else {
						uni.removeStorageSync('K8username');
						uni.removeStorageSync('K8password');
					}
					
					uni.showToast({
						title:data.error_message,
						success:function(res){
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
			changePassword: function() {
			    this.showPassword = !this.showPassword;
			},
			refreshCaptcha:function() {
				let res = getCaptcha().then(data => {
				   this.codeImg = data.captcha;
				});
			},
			doRegist: function() {
				uni.navigateTo({
					url:'/pages/mine/regist'
				})
			}

        }
    }
</script>

<style>
	page{
		background: #272e5c;
		height: 100%;
	}
	.wrapper {
		height: 100%;
	}
	.login-form {
		width: 80%;
		height: calc(100% - 46px);
		display: table;
		margin: auto;
		position: relative;
		min-height: 350px;
	}
	.form-wrapper {
	    display: table-cell;
	    vertical-align: middle;
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
		color: #BCBEC2;
		line-height: 80rpx;
	}
	.vcode {
		width: 140rpx;
		height: 78rpx;
		right: 30rpx;
		position: absolute;
	}
	.regist-pannel {
		display: flex;
	}
	.regist-btn {
		margin: 2px auto;
		background-image: url('@/static/images/login_register_btn.png');
		background-size: 100% 100%;
		width: 80%;
		height: 110rpx;
		background-repeat: no-repeat;
	}
</style>
