<template>
    <view class="wrapper">
        <view class="login-form">
			<view class="form-wrapper">
				<form @submit="formSubmit">
					<view class="uni-form-item uni-input-my-wrapper">
						<label>返点</label>
					    <input class="uni-input" name="water" placeholder="必须是数字只能包含一位小数点" />
					</view>
					<view class="uni-form-item uni-input-my-wrapper">
						<label>备注</label>
						<input class="uni-input" name="remark" placeholder="备注" />
					</view>
					<view class="uni-form-item">
						<label style="color: #ff0000;font-size: 22rpx;">注：邀请码使用后自动失效</label>
					</view>
					<view class="uni-form-item"></view>
					
					<view style="display: flex;">
						<button class="btn" form-type="submit">确定</button>
					</view>
				</form>
			</view>
        </view>
		
		<view class="rough-lines"></view>
		
		<view class="uni-flex uni-column">
			<view class="flex-item" style="margin: auto;">邀请码：{{ codeInfo.code }}</view>
			<view class="flex-item" style="margin: auto;">
				<button type="warn" @click="deleteCode()" size="mini">删除</button>
				<button type="primary" @click="copyCode(codeInfo.code)" size="mini" style="margin-left: 6rpx;">复制</button>
			</view>
		</view>
    </view>
</template>
<script>
	import {setInviteCode, getInviteCode, delInviteCode} from '../../common/api/index.js'
    export default {
        data() {
            return {
				codeInfo: {},
            }
        },
        methods: {
            formSubmit: function(e) {
				const pattern = /(^[0-9]\.[0-9]$)/
				if (!pattern.test(e.detail.value.water)) {
					uni.showModal({
						title:'提示',
						content:'返水点数必须是数字只能包含一位小数点',
						showCancel:false
					})
					return ;
				}
				let token = this.checkLogin() // 判断是否登入
				var formdata = e.detail.value
				
				let that = this
				let res = setInviteCode(JSON.stringify(formdata), {'Authorization': 'Bearer' + token}).then(data => {
					uni.showToast({
						title:data.error_message,
					})
					setTimeout(() => {
						that.loadInfo()
					}, 1000)
				})
            },
			loadInfo: function() {
				let token = this.checkLogin() // 判断是否登入
				getInviteCode({'Authorization': 'Bearer ' + token}).then(data => {
				   this.codeInfo = data.codeInfo
				})
			},
			deleteCode : function() {
				let that = this
				uni.showModal({
				    title: '提示',
				    content: '确认进行此操作吗？',
				    success: function (res) {
				        if (res.confirm) {
				            let token = that.checkLogin() // 判断是否登入
				            let res = delInviteCode({'Authorization': 'Bearer' + token}).then(data => {
				            	uni.showToast({
				            		title:data.error_message,
				            	})
								setTimeout(() => {
									that.loadInfo()
								}, 1000)
				            })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			copyCode(inviteCode) {
				let result
				uni.setClipboardData({
					data: inviteCode, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功'
						})
					}
				});
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
	.login-form {
		width: 90%;
		display: table;
		margin: auto;
		position: relative;
		min-height: 200px;
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
</style>
