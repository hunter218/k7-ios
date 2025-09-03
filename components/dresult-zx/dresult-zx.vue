<template>
	<view>
		<view class="content">
			<view v-for="(item, index) in list" :key="index" class="row-record" style="height: 70px; left: 0px; width: 100%;">
				<view class="dresult-title-l">
					<view class="title">{{ item.period }}</view><view class="title">{{ item.drawTime }}</view>
				</view>
				<view class="dresult-title-r">
					<view class="rbb">{{ parseInt(item.b1)+parseInt(item.b2)+parseInt(item.b3)+parseInt(item.b4)+parseInt(item.b5) }}</view>
					<view class="ddstyle-circle" v-if="item.b1+item.b2+item.b3+item.b4+item.b5 >= 23">大</view>
					<view class="sxstyle-circle" v-else="item.b1+item.b2+item.b3+item.b4+item.b5 <= 22">小</view>
					<view class="ddstyle-circle" v-if="(item.b1+item.b2+item.b3+item.b4+item.b5)%2 == 0">双</view>
					<view class="sxstyle-circle" v-else="(item.b1+item.b2+item.b3+item.b4+item.b5)%2 == 1">单</view>
					<view class="ddstyle-circle" v-if="parseInt(item.b1) > parseInt(item.b5)">龙</view>
					<view class="ddstyle-circle" v-if="parseInt(item.b1) < parseInt(item.b5)">虎</view>
					<view class="hestyle-circle" v-if="parseInt(item.b1) == parseInt(item.b5)">和</view>
					
					<view class="bzstyle" v-if="isBaozi(parseInt(item.b1), parseInt(item.b2), parseInt(item.b3))">豹子</view>
					<view class="dzstyle" v-else-if="isDuizi(parseInt(item.b1), parseInt(item.b2), parseInt(item.b3))">对子</view>
					<view class="szstyle" v-else-if="isShunzi(parseInt(item.b1), parseInt(item.b2), parseInt(item.b3))">顺子</view>
					<view class="bsstyle" v-else-if="isBanshun(parseInt(item.b1), parseInt(item.b2), parseInt(item.b3))">半顺</view>
					<view class="zlstyle" v-else>杂六</view>
					
					<view class="bzstyle" v-if="isBaozi(parseInt(item.b2), parseInt(item.b3), parseInt(item.b4))">豹子</view>
					<view class="dzstyle" v-else-if="isDuizi(parseInt(item.b2), parseInt(item.b3), parseInt(item.b4))">对子</view>
					<view class="szstyle" v-else-if="isShunzi(parseInt(item.b2), parseInt(item.b3), parseInt(item.b4))">顺子</view>
					<view class="bsstyle" v-else-if="isBanshun(parseInt(item.b2), parseInt(item.b3), parseInt(item.b4))">半顺</view>
					<view class="zlstyle" v-else>杂六</view>
					
					<view class="bzstyle" v-if="isBaozi(parseInt(item.b3), parseInt(item.b4), parseInt(item.b5))">豹子</view>
					<view class="dzstyle" v-else-if="isDuizi(parseInt(item.b3), parseInt(item.b4), parseInt(item.b5))">对子</view>
					<view class="szstyle" v-else-if="isShunzi(parseInt(item.b3), parseInt(item.b4), parseInt(item.b5))">顺子</view>
					<view class="bsstyle" v-else-if="isBanshun(parseInt(item.b3), parseInt(item.b4), parseInt(item.b5))">半顺</view>
					<view class="zlstyle" v-else>杂六</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props:['list', 'lott'],
		methods:{
			isShunzi(n1, n2, n3) {
				let arr = [n1, n2, n3]
				arr.sort()
				if ((arr[0] + 1 == arr[1]) && (arr[1] + 1 == arr[2])) {
					return true
				} else if (arr[0] == 0 && arr[1] == 8 && arr[2] == 9) { // 特殊判断098
					return true
				} else {
					return false
				}
			},
			isDuizi(n1, n2, n3) {
				let arr = [n1, n2, n3]
				arr.sort()
				console.log(arr)
				if (arr[0] == arr[1] || arr[1] == arr[2]) {
					return true
				} else {
					return false
				}
			},
			isBanshun(n1, n2, n3) {
				let arr = [n1, n2, n3]
				arr.sort()
				if (arr[0] + 1 == arr[1] || arr[1] + 1 == arr[2]) {
					return true
				} else {
					return false
				}
			},
			isBaozi(n1, n2, n3) {
				if(parseInt(n1) == parseInt(n2) && parseInt(n2) == parseInt(n3)){
					return true
				} else {
					return false
				}
			}
		},
		mounted() {
			// let r = this.isDuizi(4,3,7)
			// console.log(r)
		}
	}
</script>

<style scoped>
	.content{
		width: auto;
		height: calc(100% - 47px);
		max-width: 375px;
		position: relative;
	}
	.dresult-title-l {
	    flex: 2 1 0%;
	    display: flex;
	    justify-content: space-around;
	    -webkit-box-align: center;
	    align-items: center;
	    height: 100%;
	}
	.dresult-title-r {
	    flex: 5 1 0%;
	    display: flex;
	    justify-content: space-around;
	    -webkit-box-align: center;
	    align-items: center;
	    height: 100%;
	}
	.ddstyle {
	    height: 23px;
	    width: 23px;
	    line-height: 23px;
	    color: #FFFFFF;
	    border-radius: 4px;
	    text-align: center;
	    font-size: 14px;
	    font-weight: bold;
	    margin-right: 1rpx;
	    background-color: #006cda;
	}
	.sxstyle {
	    height: 23px;
	    width: 23px;
	    line-height: 23px;
	    color: #FFFFFF;
	    border-radius: 4px;
	    text-align: center;
	    font-size: 14px;
	    font-weight: bold;
	    margin-right: 1rpx;
	    background-color: #ffa735;
	}
	.sxstyle-circle {
	    width: 30px;
	    height: 30px;
	    border-radius: 50%;
	    display: flex;
	    -webkit-box-align: center;
	    align-items: center;
	    font-size: 15px;
	    -webkit-box-pack: center;
	    justify-content: center;
	    background: linear-gradient(#ff9a00 0px, #ff6600);
	    color: #ffffff;
	    margin: auto;
	}
	.ddstyle-circle {
	    width: 30px;
	    height: 30px;
	    border-radius: 50%;
	    display: flex;
	    -webkit-box-align: center;
	    align-items: center;
	    font-size: 15px;
	    -webkit-box-pack: center;
	    justify-content: center;
	    background: linear-gradient(#619cff 0px, #0a5eff);
	    color: #ffffff;
	    margin: auto;
	}
	.hestyle-circle {
	    width: 30px;
	    height: 30px;
	    border-radius: 50%;
	    display: flex;
	    -webkit-box-align: center;
	    align-items: center;
	    font-size: 15px;
	    -webkit-box-pack: center;
	    justify-content: center;
	    background: linear-gradient(#59e14b 1%, #3ac12c);
	    color: #FFFFFF;
	    margin: auto;
	}
	.bzstyle {
	    font-size: 15px;
	    font-weight: bold;
	    min-width: 20px;
	    text-align: left;
	    color: #ff0000;
	}
	.szstyle {
	    font-size: 15px;
	    font-weight: bold;
	    min-width: 20px;
	    text-align: left;
	    color: #0066cc;
	}
	.dzstyle {
	    font-size: 15px;
	    font-weight: bold;
	    min-width: 20px;
	    text-align: left;
	    color: #00dd34;
	}
	.bsstyle {
	    font-size: 15px;
	    font-weight: bold;
	    min-width: 20px;
	    text-align: left;
	    color: #ff9b00;
	}
	.zlstyle {
	    font-size: 15px;
	    font-weight: bold;
	    min-width: 20px;
	    text-align: left;
	    color: #666666;
	}
	.title {
	    font-size: 14px;
	    color: rgb(51, 51, 51);
	}
	.row-record {
	    display: flex;
	    justify-content: space-around;
	    -webkit-box-align: center;
	    align-items: center;
	    border-bottom: 1px solid #cccccc;
	}
	.rbb {
		font-size: 36rpx;
		font-weight: bold;
		min-width: 40px;
		text-align: center;
		color: #ff0000;
	}
</style>

