<template>
	<view>
		<scroll-view class="wrapper" scroll-y="true" scroll-with-animation="true">
			<hall-jsft @click.native="listSelected('JSFT', '极速飞艇', 'LM1')" v-if="lotts.JSFT == 1"></hall-jsft>
			<hall-jssc @click.native="listSelected('JSSC', '极速赛车', 'LM1')" v-if="lotts.JSSC == 1"></hall-jssc>
			<hall-azxys @click.native="listSelected('AZXYS', '澳洲幸运10', 'LM1')" v-if="lotts.AZXYS == 1"></hall-azxys>
			<hall-jsssc @click.native="listSelected('JSSSC', '极速时时彩', 'LM1')" v-if="lotts.JSSSC == 1"></hall-jsssc>
			<hall-azxyw @click.native="listSelected('AZXYW', '澳洲幸运5', 'LM1')" v-if="lotts.AZXYW == 1"></hall-azxyw>
			<hall-amlhc @click.native="listSelected('AM', '澳门六合彩', 'MC49')" v-if="lotts.AM == 1"></hall-amlhc>
		</scroll-view>
		
		<view class="bottom" style="width: 100%;">
			<view class="uni-flex uni-row">
				<view class="menu-flex-item" @tap="goTo(1)">
					<view class="iconfont icon-gerenzhongxin-xuanzhong" style="height: 90rpx;"></view>
					<view style="font-size: 18rpx;">个人中心</view>
				</view>
				<view class="menu-flex-item" @tap="goTo(2)">
					<view class="iconfont icon-qunfengjinrong" style="height: 90rpx;"></view>
					<view style="font-size: 18rpx;">小金库</view>
				</view>
				<view class="menu-flex-item" @tap="goTo(3)">
					<view class="iconfont icon-tixian" style="height: 90rpx;"></view>
					<view style="font-size: 18rpx;">上下分</view>
				</view>
				<view class="menu-flex-item" @tap="goTo(4)">
					<view class="iconfont icon-kefu2" style="height: 90rpx;"></view>
					<view style="font-size: 18rpx;">客服</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { getLotteryState } from '../../common/api/index.js'
export default {
	data() {
		return {
			lotts: {'AZXYS':1, 'JSFT':1, 'JSSC':1, 'JSSSC':1, 'AZXYW':1, 'AM':1}
		}
	},
	mounted() {
		this.loadInfo()
	},
	methods:{
		listSelected (lottery, lotteryTitle, game) {
			getApp().globalData.currentLottery = lottery;
			getApp().globalData.previousLottery = getApp().globalData.currentLottery;
			getApp().globalData.currentGame = game;
			getApp().globalData.currentLotteryTitle = lotteryTitle;
			if (lottery === 'AM') {
				uni.navigateTo({
					url:'/pages/lhc/am'
				});
			} else {
				uni.navigateTo({
					url:'/pages/room/index'
				});
			}
			
		},
		goTo : (i) => {
			switch (i){
				case 1:
					const drawer = uni.getSubNVueById('myDrawer')
					drawer.show('slide-in-left', 200, () => {
						console.log('open my drawer')
					})
					break
				case 2:
					uni.navigateTo({
						url:'/pages/coffer/index'
					})
					break
				case 3:
					uni.navigateTo({
						url:'/pages/score/index'
					})
					break
				case 4:
					uni.navigateTo({
						url:'/pages/kefu/index'
					})
					break
			}
		},
		
		loadInfo: function() {
			let token = this.checkLogin() // 判断是否登入
			getLotteryState({'Authorization': 'Bearer ' + token}).then(data => {
			   this.lotts = data
			})
		},
	},
	onNavigationBarButtonTap(e) {
		if(e.index == 0) {
			const drawer = uni.getSubNVueById('myDrawer')
			drawer.show('slide-in-left', 200, () => {
				console.log('open my drawer')
			})
		}
	}
}
</script>
<style>
	.bottom{
		position: fixed;
		bottom: 10rpx;
	}
	.menu-flex-item {
		width: 33.3%;
		text-align: center;
	}
	.icon-gerenzhongxin-xuanzhong,.icon-qunfengjinrong,.icon-tixian,.icon-kefu2{
		color: #4f73b3;
		font-size: 60rpx;
	}
</style>