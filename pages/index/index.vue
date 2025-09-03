<template>
	<view>
		<view style="text-align: center;margin:60rpx auto;">
        	<button :type=buttonTypePrimary size="mini">房间号</button>
 
		</view>
		
		<view class="item" @tap='KeyboarOpen'>
		  <password-input :numLng='doorNumber'></password-input>
		</view>
		<number-keyboard tabBar ref='KeyboarHid' @input='input' psdLength='6'></number-keyboard>
		
		
		<view style="width:60%;margin:60rpx auto;">
			<button type=primary @click="doEntry()">进入房间</button>
		</view>
		
		<view class="fCZmpJ">
			<view class="uq_icon"></view>
		</view>
		
		<view style="margin-left: 50rpx;margin-top: 50rpx;">
			历史房间：<span style="color: #AAA;font-size: 22rpx;">长按房间头像，即可删除历史记录</span>
		</view>
		<view v-if="historyRoom != ''">
			<view @longtap="removeRoom()" @click="goIntoHall()" class="room-history">
				<image class="room-img" src="/static/icon/room.png"></image>
				<view class="room-text">{{this.historyRoom}}</view>
			</view>
		</view>
		<section class="Popup-Page">
			<s-popup custom-class="center-popup" position="center" v-model="showCenterVisible">
				<view style="width:600rpx;height:800rpx;">
					<view style="">
						<view style="margin: 50rpx auto;text-align: center;">公告</view>
					</view>
					<view style="padding: 10px 30px;">
						{{ noticeContent }}
					</view>
					<view style="position: absolute;bottom: 10rpx;left: 230rpx;margin: 10px auto;">
						<button type="primary" @click="closeModal">关闭</button>
					</view>
				</view>
			</s-popup>
		</section>
	</view>
</template>

<script>
	import { getNotice, doEntry} from '../../common/api/index.js';
	import numberKeyboard from '@/components/number-keyboard/number-keyboard.vue'
	import passwordInput from '@/components/password-input/password-input.vue'

	export default {
		components: {
			numberKeyboard,
			passwordInput
		},
		data() {
			return {
				kk_quota: '0.0',
				unsettledAmount: '0.0',
				todaySettledSmount: '0.0',
				showCenterVisible: false,
				noticeTitle: '',
				noticeContent: '',
				doorNumber:'',
				buttonTypePrimary: 'primary',
				buttonTypeDefault: 'default',
				historyRoom: ''
			}
		},
		mounted() {
			let hisotry = uni.getStorageSync('history')
			if (hisotry != '') {
				this.historyRoom = hisotry
			}
		},
		onShow() {
			getNotice().then(data => {
				this.noticeTitle = data.title
				this.noticeContent = data.content
				if (this.noticeTitle !== '') {
					this.showCenterVisible = true
				}
			})
		},
		methods:{
			//打开键盘
			KeyboarOpen(e) {
				this.$refs.KeyboarHid.open();
			},
			//输入的值
			input(val) {
				this.doorNumber = val;
			},
			listSelected :(lottery, lotteryTitle, game) =>{
				getApp().globalData.currentLottery = lottery;
				getApp().globalData.currentGame = game;
				getApp().globalData.currentLotteryTitle = lotteryTitle;
				uni.reLaunch({
					url:'/pages/game/index'
				});
			},
			closeModal() {
				this.showCenterVisible = false
			},
			removeRoom() {
				let room = uni.getStorageSync('history');
				uni.showModal({
					title: '是否删除' + room + '房间历史记录',
					showCancel: true,
					success: function (res) {
						if (res.confirm) {
							this.historyRoom = "";
							uni.removeStorageSync('history');
							setTimeout(function(){
								uni.reLaunch({
								    url: '/pages/index/index'
								});
							} , 500)
						}
					}
				});
			},
			goIntoHall() {
				setTimeout(function(){
					uni.reLaunch({
					    url: '/pages/hall/index'
					});
				} , 500)
			},
			doEntry() {
				let token = this.checkLogin() // 判断是否登入
				var formdata = {'type':1, 'number':this.doorNumber}
				let res = doEntry(JSON.stringify(formdata), {'Authorization': 'Bearer ' + token}).then(data => {
					if (data.status == 'SUCCESS') {
						uni.setStorageSync('history', this.doorNumber)
						setTimeout(function(){
							uni.reLaunch({
							    url: '/pages/hall/index'
							});
						} , 500)
					} else {
						uni.showToast({
							title:data.error_message,
						})
					}
				});
			}
		}
	}
</script>

<style>
	.info-pannel {
		border: 0rpx solid red;
	}
	.info-title{
		line-height: 80rpx;
	}
	.flex-item {
		width: 33.3%;
		/* height: 80rpx; */
		text-align: center;
		line-height: 80rpx;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
	.fCZmpJ {
	    width: 100%;
	    height: 30rpx;
	    background-color: rgb(235, 235, 235);
	    box-shadow: rgb(187, 187, 187) 0px 0.5px 1px inset;
	}
	.iconfont {
		display: flex;
		flex-direction: row;
		width: 160rpx;
		height: 160rpx;
		font-size: 160rpx;
		color: #6783c1;
		margin: 20rpx auto;
	}
	.uni-input-my-wrapper {
	    flex-direction: row;
	    flex-wrap: nowrap;
	    border: 4rpx solid #ef7915;
	}
	.uni-input {
		background-color:#ced4ff;
	}
	.uni-form-item {
		padding:0;
		width:600rpx;
		margin: 20rpx auto;
	}
</style>
<style lang="scss">
	.Popup-Page {
	  padding: 40rpx;
	  .btn {
	    width: 100%;
	    height: 80rpx;
	    font-size: 28rpx;
	    &:not(:first-child) {
	      margin-top: 40rpx;
	    }
	  }
	  .center-popup {
	    .s-popup-wrapper {
	      width: 500rpx;
	      height: 500rpx;
	    }
	    // #ifdef H5
	    /deep/ .s-popup-wrapper {
	      width: 500rpx;
	      height: 500rpx;
	    }
	    // #endif
	  }
	  .left-popup,
	  .right-popup {
	    .s-popup-wrapper {
	      width: 200rpx;
	    }
	    // #ifdef H5
	    /deep/ .s-popup-wrapper {
	      width: 200rpx;
	    }
	    // #endif
	  }
	  .top-popup,
	  .bottom-popup {
	    .s-popup-wrapper {
	      height: 200rpx;
	    }
	    // #ifdef H5
	    /deep/ .s-popup-wrapper {
	      height: 200rpx;
	    }
	    // #endif
	  }
	}
.room-history{
	margin-left: 50rpx;
}
.room-img {
	flex: none;
	width: 80rpx;
	height: 80rpx;
	border-radius: 20rpx;
}
.room-text {
	font-size: 12px;
}
</style>
