<template>
	<view>
		<view style="display: inline-flex;width: 100%;">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						类型
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		
		<view class="info-pannel">
			<view class="uni-flex uni-row">
				<view class="flex-item">
					<view class="info-title">会员账号</view>
					<view class="info-content">{{ userInfo.username }}</view>
				</view>
				<view class="flex-item has-left-border">
					<view class="info-title">返水</view>
					<view class="info-content">{{ userInfo.water }}</view>
				</view>
				<view class="flex-item has-left-border">
					<view class="info-title">所属盘口</view>
					<view class="info-content">{{ userInfo.range }}</view>
				</view>
				<view class="flex-item has-left-border">
					<view class="info-title">账号状态</view>
					<view class="info-content" v-if="userInfo.state == 1">正常</view>
					<view class="info-content" v-if="userInfo.state == 2">冻结</view>
				</view>
			</view>
		</view>
		<view class="info-pannel">
			<view class="uni-flex uni-row">
				<view class="flex-item">
					<view class="info-title">快开彩额度</view>
					<view class="info-content">{{ userInfo.kk_quota }}</view>
				</view>
				<view class="flex-item has-left-border">
					<view class="info-title">全国彩额度</view>
					<view class="info-content">{{ userInfo.zg_quota }}</view>
				</view>
				<view class="flex-item has-left-border">
					<view class="info-title">香港彩额度</view>
					<view class="info-content">{{ userInfo.hk_quota }}</view>
				</view>
			</view>
		</view>
		<view class="rough-lines"></view>
		<view style="text-align: center; background-color: #272e5c; color: #FFFFFF;font-size: 32rpx;">{{array[index].name}}</view>
		
		<view v-for="(item, index) in lottInfo" :index="index" :key="index">
			<view style="text-align: center;color: #908a8a;font-size: 32rpx;">{{ index }}</view>
			<view class="info-pannel">
				<view class="uni-flex uni-row">
					<view class="flex-item" :class="{'has-left-border':index > 0}" v-for="(val, key, index) in item" :index="key" :key="key" v-if="index != 0">
						<view class="info-title">{{ key }}</view>
						<view class="info-content">{{ val }}</view>
					</view>
					
				</view>
			</view>
			<view class="rough-lines"></view>
		</view>
	</view>
	
</template>

<script>
	import {getMyInfo, getBankCards, setDefaultCard} from '../../common/api/index.js'
	export default {
		data() {
			return {
				array: [
					{lott:'AZXYS', name: '澳洲幸运10'},
					{lott:'JSFT', name:'极速飞艇'},{lott:'JSSC', name: '极速赛车'}
				],
				index: 0,
				lott: 'AZXYS',
				kk_quota: '',
				unsettledAmount: '0.0',
				todaySettledSmount: '0.0',
				userInfo:{},
				lottInfo:{},
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.index = e.detail.value
				this.lott = this.array[this.index].lott
	
				this.loadInfo()
			},
			loadInfo: function() {
				let token = this.checkLogin() // 判断是否登入
				getMyInfo({'l':this.lott}, {'Authorization': 'Bearer ' + token}).then(data => {
				   this.userInfo = data.userInfo
				   this.lottInfo = data.lottInfo;
				})
			},
			setCard: function(id) {
				let token = this.checkLogin() // 判断是否登入
				var formdata = {'id': id}
				let res = setDefaultCard(JSON.stringify(formdata), {'Authorization': 'Bearer' + token}).then(data => {
					uni.showToast({
						title:data.error_message,
					})
					setTimeout(function(){
						uni.navigateTo({
						    url: '/pages/hall/index',
						});
					} , 500);
				})
			}
		},
		mounted() {
			this.loadInfo()
		}
	}
</script>

<style>
	.info-pannel {
		overflow: hidden;
	}
	.info-title{
		font-size: 24rpx;
		line-height: 60rpx;
	}
	.info-content{
		line-height: 2rpx; 
		color: #c11d00;
		font-size: 24rpx;
	}
	.flex-item {
		width: 33.3%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #FFFFFF;
		border-top: 1rpx solid #ccc;
		color: #666666;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
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
