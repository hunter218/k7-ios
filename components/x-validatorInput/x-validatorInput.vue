<template>
	<view class="input-box">
		<view :class="['input-content',item.sort == focusIndex?'focus':'']" @click="selectInput"
			:data-content="item.value" v-for="(item,index) in inputLength" :data-index="index" :key="index"></view>
		<input auto-blur @blur="inputBlur" type="text" class="input-hidden" id="hidden-input" :focus="inputFocus" @input="inputValue" :value="value" />
	</view>
</template>

<script>
	export default {
		name: "x-validatorInput",
		data() {
			return {
				inputFocus: false,
				inputLength: [],
				focusIndex: 0,
			};
		},
		mounted() {
			let strArr = this.value.split("");
			var arr = [];
			for (var i = 0; i < this.numArr; i++) {
				var item = {
					sort: i,
					value: ''
				}
				arr.push(item);
			}
			if (this.value) {
				for (let i in strArr) {
					arr[i].value = strArr[i]
				}
			}
			this.inputLength = arr;
			this.focusIndex = strArr.length
		},
		props: {
			value: {
				type: String,
				default: ''
			},
			numArr:{
				type:Number,
				default:8
			}
		},
		methods: {
			selectInput() {
				this.inputFocus = true;
			},
			inputBlur(){
				this.inputFocus = false;
			},
			inputValue(e) {
				let strArr = e.detail.value.split("");
				let arr = this.inputLength;
				for (let i in arr) {
					arr[i].value = '';
					for (let j in strArr) {
						if (i == j) {
							arr[j].value = strArr[j];
						}
					}
				}
				this.inputLength = arr;
				this.focusIndex = e.detail.value.length;
				this.$emit('input', e.detail.value)
				if (e.detail.value.length > this.numArr -1) {
					this.inputFocus = false;
					this.$emit('blur',e.detail.value)
				}
			}
		}
	}
</script>

<style scoped>
	.input-content {
		width: 80rpx;
		height: 80rpx;
		border: 4rpx solid #ef7915;
		display: flex;
		border-radius:20rpx;
		justify-content: center;
		align-items: center;
	}

	.input-content input {
		width: 40px;
		text-align: center;
		color: rgb(109, 109, 109);
		font-size: 34rpx;
	}

	.input-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 600rpx;
		margin: 30rpx auto;
	}

	.input-content::before {
		content: attr(data-content);
	}

	.focus::after {
		content: ' ';
		border-right: 1px solid black;
		height: 40%;
		opacity: 1;
		animation: div-focus .7s forwards infinite;
	}

	@keyframes div-focus {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	.input-hidden {
		width: 0;
	}
</style>
