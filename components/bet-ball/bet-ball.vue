<template>
	<view style="margin-bottom: 430rpx;">
		<uni-collapse v-for="(item, index) in list" :key="index">
			<uni-collapse-item :title=index :open=true :disabled=clickDisabled>
				<view class="ball-btns-wrapper">
					<button :disabled=clickDisabled
					v-for="(ball, key) in item" :index="key" :key="key" 
					class="ball-btn"
					@click="change(index, key)" v-bind:class="{ active: ball.isActive }">
						<view class="lott-ball ball-yellow" v-if="ball.val==1">{{ ball.val}}</view>
						<view class="lott-ball ball-wathet" v-if="ball.val==2">{{ ball.val}}</view>
						<view class="lott-ball ball-earthy" v-if="ball.val==3">{{ ball.val}}</view>
						<view class="lott-ball ball-orange" v-if="ball.val==4">{{ ball.val}}</view>
						<view class="lott-ball ball-brandy" v-if="ball.val==5">{{ ball.val}}</view>
						<view class="lott-ball ball-blue" v-if="ball.val==6">{{ ball.val}}</view>
						<view class="lott-ball ball-gray" v-if="ball.val==7">{{ ball.val}}</view>
						<view class="lott-ball ball-red" v-if="ball.val==8">{{ ball.val}}</view>
						<view class="lott-ball ball-brown" v-if="ball.val==9">{{ ball.val}}</view>
						<view class="lott-ball ball-green" v-if="ball.val==10">{{ ball.val}}</view>
						<view class="odds" v-if="clickDisabled==false">{{ ball.odds }}</view>
						<view class="odds" v-if="clickDisabled==true">--</view>
					</button>
				</view>
			</uni-collapse-item>
			<view class="rough_lines"></view>
		</uni-collapse>
	</view>
</template>
<script>
	var arrayUtils = require('@/common/util.js').arrayUtils;
	export default {
		data() {
			return {
			}
		},
		props:['list', 'clickDisabled'],
		methods:{
			change(index, key) {
				this.list[index][key].isActive = !this.list[index][key].isActive
				if (this.list[index][key].isActive) {
					uni.$emit('addToShoppingCard',this.list[index][key].game + "-" +this.list[index][key].ball + "-" + this.list[index][key].val)
				} else {
					uni.$emit('removeFromShoppingCard',this.list[index][key].game + "-" +this.list[index][key].ball + "-" + this.list[index][key].val)
				}
				uni.$emit('updateTotalBet','single')
			},
			setButtonsDisActive() {
				let data = this.list
				for (var key in data){
					for(var i = 0;i < data[key].length; i++){
						data[key][i].isActive = false
					}
				}
			}
		},
		mounted() {
			this.setButtonsDisActive()
			uni.$on('setButtonsDisActive', ()=>{
				this.setButtonsDisActive()
			})
		}
	}
</script>

<style>
	.active {
		background-color: #3397FF;
	}
	.active .odds{
		color: #FFFFFF;
	}
	.active .text{
		color: #FFFFFF;
	}
	.text {
		margin-top: 5px;
		font-size: 0.8rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
		color: #666666;
	}
	.odds {
	    color: rgb(255, 77, 77);
	    font-size: 16px;
	}
	.ball-btns-wrapper{
		overflow: hidden;
		padding: 4px 0px;
		text-align: center;
	}
	.ball-btn {
		width: 25%;
		min-height: 100rpx;
		height: auto;
		display: inline-flex;
		flex-direction: column;
		-webkit-box-pack: center;
		justify-content: center;
		border: 1rpx solid #cccccc;
		text-align: center;
		border-radius: 5px;
		margin: 10rpx;
		box-sizing: border-box;
		user-select: none;
		vertical-align: middle;
		cursor: pointer;
	}
	.rough_lines {
	    width: 100%;
	    height: 10px;
	    background-color: #ebebeb;
	    box-shadow: #bbbbbb 0px 1px 1px inset;
	}
	uni-button:after{
		border: none;
	}
</style>
