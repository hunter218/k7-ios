<template>
	<view class="outer">
		<yan-pop ref="pop" :direction="direction" :is_close="false" :is_mask="false" :width="100">
			<view style="margin-bottom: -4px;height: 190rpx;">
				<view class="bets-show-list">
					<label>已选{{ totalBet }}注</label>
				</view>
				<view style="display: flex;padding-top: 30rpx; margin-bottom: 22rpx;">
					<!-- <view class="money-btn" v-for="(chip, index) in chips" :key=index>{{ chip }}</view> -->
					<view class="money-btn" @click="setChip(chip1)">{{ chip1 }}</view>
					<view class="money-btn" @click="setChip(chip2)">{{ chip2 }}</view>
					<view class="money-btn" @click="setChip(chip3)">{{ chip3 }}</view>
					<view class="money-btn" @click="setChip(chip4)">{{ chip4 }}</view>
					<view class="money-btn" @click="setChip(chip5)">{{ chip5 }}</view>
					<view class="edit-btn" @click="editChip">编辑</view>
				</view>
				<view style="display:flex;margin-bottom: 22rpx;">
					<view style="width: 38%;margin-top: 2rpx;">
						<input @blur="onBlur" @focus="inputFocus" @input="setMyChip" :value="currentChip" class="amount-input" type="number" placeholder="输入金额" />
					</view>
					<view style="width: 32%;line-height: 58rpx;margin-left: 20rpx;">
						<checkbox @click="checkboxChange" :checked="checked" value="cb" style="transform:scale(0.8)" color="#CCC"/>预设金额
					</view>
					<view style="width: 12%;line-height: 55rpx;margin-left: 5rpx;" @click="close">
						<label style="color: #F90000;">取消</label>
					</view>
					<view style="width: 42%;margin-right: 10rpx;">
						<view @click="submit" class="submit-btn">确认{{ totalAmount }}</view>
					</view>
				</view>
			</view>
		</yan-pop>
		
		<uni-popup ref="popup" type="dialog">
		    <view style="display: flex; width: 300rpx; padding: 30rpx; border-radius: 20rpx; background-color: #FFF;">
				<view style="width: 200rpx; margin: auto;">
					<input :value="chip1"  @input="inputChange(1, $event)" class="chip-input" type="number"/>
					<input :value="chip2"  @input="inputChange(2, $event)" class="chip-input" type="number"/>
					<input :value="chip3"  @input="inputChange(3, $event)" class="chip-input" type="number"/>
					<input :value="chip4"  @input="inputChange(4, $event)" class="chip-input" type="number"/>
					<input :value="chip5"  @input="inputChange(5, $event)" class="chip-input" type="number"/>
					<view @click="cancel" class="chip-btn">关闭</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import {wager} from '../../common/api/index.js';
	var arrayUtils = require('../../common/util.js').arrayUtils;
	export default {
		data() {
			return {
				totalBet:0,
				totalAmount:0,
				shoppingCard:[],
				hasDown: false,
				direction: "below",
				currentChip: "",
				chip1:10,
				chip2:20,
				chip3:30,
				chip4:40,
				chip5:50,
				checked:false
			}
		},
		props:['currentDrawNumber'],
		created() {
			let chipPersistChecked = uni.getStorageSync('chipPersistChecked')
			if(chipPersistChecked != ""){
				this.checked = chipPersistChecked
			}
			let currentChip = uni.getStorageSync('currentChip')
			if(currentChip != ""){
				this.currentChip = currentChip
			}
			
			let localChip1 = uni.getStorageSync('chip1')
			if(localChip1){
				this.chip1 = localChip1
			}
			let localChip2 = uni.getStorageSync('chip2')
			if(localChip2){
				this.chip2 = localChip2
			}
			let localChip3 = uni.getStorageSync('chip3')
			if(localChip3){
				this.chip3 = localChip3
			}
			let localChip4 = uni.getStorageSync('chip4')
			if(localChip4){
				this.chip4 = localChip4
			}
			let localChip5 = uni.getStorageSync('chip5')
			if(localChip5){
				this.chip5 = localChip5
			}
		},
		mounted(){
			uni.$on('updateTotalBet', (type)=>{
				if (type == 'single') { // 单式计算方法
					this.totalBet = this.shoppingCard.length
				} else if (type == 'compound') { // 复式计算方法
					this.totalBet = this.shoppingCard.length
				}
			}),
			uni.$on('addToShoppingCard', (item)=>{
				this.shoppingCard.push(item)
				// console.log(this.shoppingCard)
			}),
			uni.$on('removeFromShoppingCard', (item)=>{
				arrayUtils.remove(this.shoppingCard,item)
				// console.log(this.shoppingCard)
			})
			uni.$on('clearShoppingCard', (item)=>{
				this.shoppingCard = []
			})
		},
		beforeDestroy() {
			uni.$off(['updateTotalBet','addToShoppingCard','removeFromShoppingCard'])
		},
		watch:{
			shoppingCard:function(val){
				if (val.length >= 1) {
					this.caculateTotalAmount()
					this.$refs.pop.show()
				} else {
					this.$refs.pop.close()
				}
			}
		},
		methods: {
			open(e) {
				this.$refs.pop.show()
			},
			close() {
				uni.$emit('setButtonsDisActive')
				this.shoppingCard = []
				this.$refs.pop.close()
			},
			inputFocus() {
				this.hasDown = true
			},
			onBlur() {
				this.hasDown = false
				setTimeout(function() {
					if (!this.hasDown) {
						window.scrollTo(0,0);
					}
				}, 200);
			},
			caculateTotalAmount(){
				let bets = this.shoppingCard.length
				this.totalAmount = bets * this.currentChip
			},
			checkboxChange(){
				this.checked = !this.checked
				uni.setStorageSync('chipPersistChecked', this.checked)
				if (this.checked) {
					uni.setStorageSync('currentChip', this.currentChip)
				} else {
					uni.removeStorageSync('currentChip');
				}
			},
			setChip(chip){
				this.currentChip = chip
				if (this.checked) {
					uni.setStorageSync('currentChip', this.currentChip)
				} else {
					uni.removeStorageSync('currentChip');
				}
				this.caculateTotalAmount()
			},
			setMyChip(e){
				let val = e.detail.value
				this.currentChip = val
				if (this.checked) {
					uni.setStorageSync('currentChip', this.currentChip)
				} else {
					uni.removeStorageSync('currentChip');
				}
				this.caculateTotalAmount()
			},
			editChip(){
				this.$refs.popup.open()
			},
			cancel(){
				this.$refs.popup.close()
			},
			inputChange(index, e) {
				switch(index) {
					case 1 : 
						this.chip1 = Number(e.target.value)
						uni.setStorageSync('chip1', this.chip1)
						break;
					case 2 :
						this.chip2 = Number(e.target.value)
						uni.setStorageSync('chip2', this.chip2)
						break;
					case 3 :
						this.chip3 = Number(e.target.value)
						uni.setStorageSync('chip3', this.chip3)
						break;
					case 4 :
						this.chip4 = Number(e.target.value)
						uni.setStorageSync('chip4', this.chip4)
						break;
					case 5 :
						this.chip5 = Number(e.target.value)
						uni.setStorageSync('chip5', this.chip5)
						break;
				}
			},
			submit() {
				if (this.currentChip == "") {
					return uni.showToast({
						title:"请选择金额",
						icon:'none'
					})
				}
				
				let itemArr = []
				let payload = {}
				let amount = this.currentChip
				this.shoppingCard.map(function(value,index,array){
					let arr = value.split("-");
					let item = {};
					item.game = arr[0];
					item.ball = arr[1];
					item.val = arr[2];
					item.amount = amount;
					itemArr.push(item)
				});
				
				payload.bets = itemArr
				payload.period = this.currentDrawNumber
				payload.lottery = getApp().globalData.currentLottery
				// console.log(JSON.stringify(payload))
				
				let token = this.checkLogin() // 判断是否登入
				wager(payload, {'Authorization': 'Bearer ' + token}).then(data => {
					uni.showModal({
						title: '提示',
						content: data.error_message,
						showCancel:false,
						success: function () {
							setTimeout(function() {
								uni.reLaunch({
									url:'/pages/game/index'
								})
							}, 1000);
							
						}
					})
				})
			}
		}
	}
</script>

<style scoped>
	.outer {
		bottom: 0;
		width: 100%;
		position: fixed;
		height: initial;
		top: initial;
	}
	.bets-show-list{
		position: absolute;
		bottom: calc(110% - 40rpx);
		left: calc(50% - 82rpx);
		background-color: #969896;
		font-size: 12px;
		width: 88px;
		height: 46rpx;
		border-radius: 12px;
		color: white;
		text-align: center;
		line-height: 23px;
		z-index: 20;
	}
	.money-btn {
		padding: 8rpx 20rpx; 
		margin: 2rpx auto; 
		height: 30rpx;
		width: 9%;
		border-radius: 30rpx; 
		border: 2rpx solid #04baee; 
		text-align: center;
		line-height: 35rpx;
		font-size: 18rpx;
		justify-content: start;
	}
	.edit-btn {
		padding: 10rpx 30rpx;
		margin-top: 2rpx;
		margin-right: 10rpx;
		height: 30rpx;
		border-radius: 30rpx; 
		border: 1rpx solid; 
		text-align: center;
		line-height: 30rpx;
		font-size: 24rpx;
		background: linear-gradient(121deg, #4c98f2, #467bb9, #416690) #ffffff;
		color: #FFFDEF;
	}
	.amount-input {
		padding: 8rpx; 
		margin-left: 12rpx; 
		min-height: 35rpx; 
		height: 35rpx; 
		border: 1px solid #767676;
		border-radius: 26rpx;
		font-size: 18rpx;
	}
	.submit-btn{
		color: #FFF; 
		background: linear-gradient(121deg, #4c98f2, #467bb9, #416690) #ffffff;
		padding: 10rpx 30rpx; 
		margin: 2rpx auto; 
		height: 30rpx;
		border-radius: 30rpx; 
		border: 1rpx solid; 
		text-align: center;
		line-height: 32rpx;
	}
	.chip-input{
		padding: 8rpx;
		margin: 10rpx auto;
		min-height: 35rpx; 
		height: 35rpx; 
		border: 1px solid #007AFF;
		border-radius: 26rpx;
		text-align: center;
	}
	.chip-btn {
		color: #FFF; 
		background-color: #2C61A2; 
		padding: 10rpx 35rpx; 
		margin: 16rpx auto; 
		height: 30rpx;
		border-radius: 30rpx; 
		border: 4rpx solid #2C61A2; 
		text-align: center;
		line-height: 30rpx;
	}
</style>
