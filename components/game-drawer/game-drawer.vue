<template>
	<view>
		<uni-drawer ref="draw" :mask="mask" :width="drawWid" :mode='mode'>
			<view>
				<uni-list >
					<uni-list-item :clickable=false style="background-color: #264567;height: calc(44px + env(safe-area-inset-top));"/>
					<uni-list-item :clickable=true @click="listSelected('JSFT', '极速飞艇', 'LM1')" title="极速飞艇" class="iconfont icon-game"/>
					<uni-list-item :clickable=true @click="listSelected('JSSC', '极速赛车', 'LM1')" title="极速赛车" class="iconfont icon-game"/>
					<uni-list-item :clickable=true @click="listSelected('AZXYS', '澳洲幸运10', 'LM1')" title="澳洲幸运10" class="iconfont icon-game"/>
					
					<uni-list-item :clickable=true @click="chatRoom('JSFT', '极速飞艇', 'LM1')" title="群聊-极速飞艇" class="iconfont icon-game"/>
					<uni-list-item :clickable=true @click="chatRoom('JSSC', '极速赛车', 'LM1')" title="群聊-极速赛车" class="iconfont icon-game"/>
					<uni-list-item :clickable=true @click="chatRoom('AZXYS', '澳洲幸运10', 'LM1')" title="群聊-澳洲幸运10" class="iconfont icon-game"/>
				</uni-list>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mask: true,
				drawWid:280,//最好把uni-drawer组件里的参数width的type改为String，不然想用百分比报错烦
				maskClick:true,
				mode:'right'
			}
		},
		methods: {
			//显示抽屉
			show(){
				this.$refs.draw.open();
			},
			hide(){
				this.$refs.draw.close();
			},
			listSelected :(lottery, lotteryTitle, game) =>{
				getApp().globalData.currentLottery = lottery;
				getApp().globalData.currentGame = game;
				getApp().globalData.currentLotteryTitle = lotteryTitle;
				uni.reLaunch({
					url:'/pages/game/index'
				});
			},
			
			chatRoom :(lottery, lotteryTitle, game) =>{
				getApp().globalData.previousLottery = getApp().globalData.currentLottery;
				getApp().globalData.currentLottery = lottery;
				getApp().globalData.currentGame = game;
				getApp().globalData.currentLotteryTitle = lotteryTitle;
				uni.reLaunch({
					url:'/pages/room/index'
				});
			}
		},
	}
</script>

<style>
	.uni-list-item__container {
		padding-left: 22rpx;
	}
	.icon-zhuye:before,.icon-wode:before,.icon-jilu:before,.icon-password:before,.icon-game:before {
		font-size: 38rpx;
		margin-top: 12rpx;
		margin-left: 18rpx;
	}
	.icon-game:before{
		color: #32418c;
	}
</style>
