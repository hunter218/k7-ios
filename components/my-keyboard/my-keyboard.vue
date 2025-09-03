<template>
	<!-- 弹出框 -->
	<uni-popup ref="popup" type="bottom" @change='popcha'>
		<view class="mode">
			<view class="inp f-c-c">
				<text v-if="pass">
					<text v-for="(item,index) in num">*</text>
				</text>
			</view>
			<view class="key f-sb-c">
				<view class="uni-flex uni-row">
					<view class="flex-item">A</view>
					<view class="flex-item">B</view>
					<view class="flex-item">C</view>
					<view class="flex-item">E</view>
					<view class="flex-item">F</view>
					<view class="flex-item">G</view>
				</view>
				<view>
					<view class="uni-flex uni-row">
						<view class="flex-item uni-bg-gray border-style-1">A</view>
						<view class="flex-item uni-bg-gray border-style-1">B</view>
						<view class="flex-item uni-bg-gray border-style-1">C</view>
						<view class="flex-item uni-bg-gray border-style-1">E</view>
						<view class="flex-item uni-bg-gray border-style-2">F</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="flex-item uni-bg-gray border-style-3">A</view>
						<view class="flex-item uni-bg-gray border-style-1">B</view>
						<view class="flex-item uni-bg-gray border-style-1">C</view>
						<view class="flex-item uni-bg-gray border-style-1">E</view>
						<view class="flex-item uni-bg-gray border-style-2">F</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="flex-item uni-bg-gray border-style-3">A</view>
						<view class="flex-item uni-bg-gray border-style-1">B</view>
						<view class="flex-item uni-bg-gray border-style-1">C</view>
						<view class="flex-item uni-bg-gray border-style-1">E</view>
						<view class="flex-item uni-bg-gray border-style-2">F</view>
					</view>
					<view class="uni-flex uni-row">
						<view class="flex-item uni-bg-gray border-style-3 border-style-4">A</view>
						<view class="flex-item uni-bg-gray border-style-1 border-style-4">B</view>
						<view class="flex-item uni-bg-gray border-style-1 border-style-4">C</view>
						<view class="flex-item uni-bg-gray border-style-1 border-style-4">E</view>
						<view class="flex-item uni-bg-gray border-style-2 border-style-4">F</view>
					</view>
				</view>

			</view>
		</view>
	</uni-popup>
</template>

<script>
	
	/**
	 * ongetnum_ -> 绑定方法 数字变化
	 * getnum_   -> 绑定方法 点击确认
	 * */ 
	
	export default {
		name: "my-keyboard",
		props: {
			leng: { //输入长度
				type: [String, Number],
				default:'6'
			},
			pass:{ // 是否开启密码模式
				type: Boolean,
				default:false
			},
			pnum: { //初始化数量
				type: [String, Number],
				default: '0'
			},
			
			decimal:{ // 保存几位小数
				type: [String, Number],
				default:0
			},
		},
		data() {
			return {
				num: '0', //初始化输入数字
			};
		},
		created() {
			//自定义初始化值
			let pnum = this.pnum;
			this.num = pnum;
		},
		methods: {
			// 模态状态改变
			popcha(e) {
					this.num = this.pnum;
			},

			// 显示弹窗
			openfun() {
				this.$refs.popup.open()
			},
			// 关闭弹窗
			closefun() {
				this.$refs.popup.close()
			},

			// 输入
			setnum(e) {
				let num = String(this.num);
				
				//输入长度小于设置
				if(num.length < this.leng){
					
				// 判断小数点
				let numof = num.indexOf('.');
				if (numof > -1) {  //小数点处理
					if(e != '.'){
						if (num == 0) {
							num = e;
						} else {
							num = String(num) + e;
						}
						
						// 设置保留几位
						let decimal = this.decimal;//小数点
						if(num.length > (numof+1)+decimal){
							num = num.substr(0, (numof+1)+decimal);
						}
					}
				} else {
					if (num == 0) {
						num = e;
					} else {
						num = String(num) + e;
					}
				}
				
				this.num = num;
				this.$emit('ongetnum_', num);//数字变化调用
				}
			},
			
			// 删除
			del() {
				let num = String(this.num);
				num = num.substr(0, num.length - 1);
				if (num.length == 0) {
					if(this.pass){
						this.num = '';
					}else{
						this.num = 0;
					}
				} else {
					this.num = num;
				}
				
				this.$emit('ongetnum_', num);//数字变化调用
			},
			// 确定
			confirm() {
				let num = String(this.num);
				
				if(num.charAt(num.length - 1) == '.'){ // 最后一位是小数点就去掉
					num = num.substr(0, num.length - 1);
					this.num = num;
				}
				
				this.$emit('getnum_', num);
				this.closefun();
			},
		}
	}
</script>

<style >
	.border-style-1 {
		border-top: 1px solid #ccc;
		border-left: 1px solid #ccc;
	}
	.border-style-2 {
		border-top: 1px solid #ccc;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
	}
	.border-style-3 {
		border-left: 1px solid #ccc;
	}
	.border-style-4 {
		border-bottom: 1px solid #ccc;
	}
	.flex-item {
			width: 33.3%;
			height: 3.25rem;
			text-align: center;
			line-height: 3.25rem;
		}
	
		.flex-item-V {
			width: 100%;
			height: 150rpx;
			text-align: center;
			line-height: 150rpx;
		}
	
		.text {
			margin: 15rpx 10rpx;
			padding: 0 20rpx;
			background-color: #ebebeb;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			color: #777;
			font-size: 26rpx;
		}
	
		.desc {
			/* text-indent: 40rpx; */
		}
		.flex-pc {
			display: flex;
			justify-content: center;
		}
		
	.mode {
		background-color: #fff;
		padding-bottom: 40rpx;
		
		.f-c-c{
			display:flex;
			justify-content: center;
			align-items: center;
		}
		.f-sb-c{
			display:flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.inp {
			height: 90rpx;
			padding: 20rpx;
			background-color: #f1f1f1;

			.text {
				width: 100%;
				display: flex;
				height: 62rpx;
				background-color: #fff;
				border-radius: 8rpx;
			}
		}

		.key {
			width: 100%;
			padding: 20rpx;

			.key-num {
				width: 534rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;

				.keynum {
					text-align: center;
					line-height: 80rpx;
					margin-top: 8rpx;
					width: 132rpx;
					height: 100rpx;
					box-shadow: #dcdcdc 2px 1px 3px 0px;
				}

				.keynum0 {
					width: 354rpx;
				}
			}

			.btn {
				margin-right: 42rpx;
				width: 160rpx;

				.delete {
					text-align: center;
					line-height: 120rpx;
					height: 120rpx;
					box-shadow: #dcdcdc 2px 1px 3px 0px;
				}

				.confirm {
					margin-top: 28rpx;
					text-align: center;
					line-height: 270rpx;
					height: 270rpx;
					box-shadow: #dcdcdc 2px 1px 3px 0px;
				}
			}
			.dxds {
				width: 160rpx;
				.keynum {
					text-align: center;
					line-height: 80rpx;
					margin-top: 8rpx;
					width: 132rpx;
					height: 100rpx;
					box-shadow: #dcdcdc 2px 1px 3px 0px;
				}
			}
		}
	}
</style>
