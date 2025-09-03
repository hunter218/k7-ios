<template>
	<view>
		<view class="uni-flex uni-column">
			<view class="flex-item-V uni-bg-purple-black" @click="setMenu('STAT')" v-bind:class="{ active: active == 'STAT' }">统计</view>
		</view>
		
		<view class="uni-flex uni-column" v-if="currentLottery=='SGFT' || currentLottery=='XYFT' || currentLottery=='BJSC' || currentLottery=='AZXYS' || currentLottery=='JSFT' || currentLottery=='JSSC'">
			<view class="flex-item-V uni-bg-purple-black" @click="setMenu('LM1')" v-bind:class="{ active: active == 'LM1' }">两面</view>
			<view class="flex-item-V uni-bg-purple-black" @click="setMenu('MC10')" v-bind:class="{ active: active == 'MC10' }">1 ~ 10名</view>
			<view class="flex-item-V uni-bg-purple-black" @click="setMenu('GYH')" v-bind:class="{ active: active == 'GYH' }">冠亚和</view>
		</view>
		
		
		<view class="uni-flex uni-column" v-if="currentLottery=='XYSSC' || currentLottery=='CQHLSX' || currentLottery=='JSSSC' || currentLottery=='AZXYW'">
			<view class="flex-item-V uni-bg-purple-black" @click="setMenu('LM2')" v-bind:class="{ active: active == 'LM2' }">两面</view>
			<view class="flex-item-V uni-bg-purple-black" @click="setMenu('MC5')" v-bind:class="{ active: active == 'MC5' }">1 ~ 5</view>
		</view>
		
		<view class="uni-flex uni-column">
			<view class="flex-item-V uni-bg-purple-black" @click="chatRoom()">聊天室</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				currentLottery:getApp().globalData.currentLottery,
				active:getApp().globalData.currentGame
			}
		},
		methods:{
			setMenu(game) {
				if (game == 'STAT') {
					uni.navigateTo({
						url:'/pages/stat/index'
					})
				} else {
					this.active = game
					getApp().globalData.currentGame = game
					uni.$emit('showMenu',game)
					uni.$emit('clearShoppingCard')
				}
			},
			chatRoom() {
				uni.navigateTo({
					url:'/pages/room/index'
				})
			}
		}
	}
</script>

<style>
	.flex-item-V {
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		border-bottom: 2rpx solid #32515f;
		box-shadow: rgba(0, 0, 0, 0.67) 0px -3px 3px -3px inset, rgb(255, 255, 255) 0px 3px 1px -3px;
	}
	.active {
		background-color: #2C61A2;
	}
	
</style>
