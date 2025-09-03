<template>
	<view>
		<view class="info-pannel">
			<view class="uni-flex uni-row" :class="{'has-top-border':index == 0}" v-for="(item, index) in lmdx" :index="index" :key="index">
				<view class="flex-item" v-for="(key, val) in item" :key="key">
					<view class="info-title">{{ val }}</view>
					<view class="info-content has-left-border">{{ key }}</view>
				</view>
			</view>
			<view class="uni-flex uni-row" v-for="(item, index) in lmds" :key="'ds' + index">
				<view class="flex-item" v-for="(key, val) in item" :key="key">
					<view class="info-title">{{ val }}</view>
					<view class="info-content has-left-border">{{ key }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getLm} from '../../common/api/index.js'
	export default {
		data() {
			return {
				lmdx: [],
				lmds: [],
				lott: getApp().globalData.currentLottery,
			}
		},
		mounted() {
		    this.loadLm()
		},
		methods: {
			loadLm:function() {
				let token = this.checkLogin() // 判断是否登入
				getLm({'l':this.lott}, {'Authorization': token}).then(data => {
				   this.lmdx = data.lmdx;
				   this.lmds = data.lmds;
				})
			},
		}
	}
</script>

<style>
	.info-pannel {
		overflow: hidden;
	}
	.flex-item {
		width: 100%;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
		display: flex;
	}
	.info-title{
		width: 50%;
		font-size: 32rpx;
		line-height: 82rpx;
	}
	.info-content{
		width: 50%;
		line-height: 82rpx; 
		color: #ff0000;
		font-size: 32rpx;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
	.has-top-border {
		border-top: 1rpx solid #ccc;
	}
</style>
