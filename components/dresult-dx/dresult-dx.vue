<template>
	<view>
		<view class="content">
			<view v-for="(item, index) in list" :key="index" class="row-record" style="height: 70px; left: 0px; width: 100%;">
				<view class="dresult-title-l">
					<view class="title">{{ item.period }}</view><view class="title">{{ item.drawTime }}</view>
				</view>
				<view class="dresult-title-r" v-if="lott=='SGFT' || lott=='XYFT' || lott=='BJSC' || lott=='AZXYS' || lott=='JSFT' || lott=='JSSC'">
					<view v-if="item.b1 <= 5" class="sxstyle">小</view>
					<view v-else="item.b1 > 5" class="ddstyle">大</view>
					<view v-if="item.b2 <= 5" class="sxstyle">小</view>
					<view v-else="item.b2 > 5" class="ddstyle">大</view>
					<view v-if="item.b3 <= 5" class="sxstyle">小</view>
					<view v-else="item.b3 > 5" class="ddstyle">大</view>
					<view v-if="item.b4 <= 5" class="sxstyle">小</view>
					<view v-else="item.b4 > 5" class="ddstyle">大</view>
					<view v-if="item.b5 <= 5" class="sxstyle">小</view>
					<view v-else="item.b5 > 5" class="ddstyle">大</view>
					<view v-if="item.b6 <= 5" class="sxstyle">小</view>
					<view v-else="item.b6 > 5" class="ddstyle">大</view>
					<view v-if="item.b7 <= 5" class="sxstyle">小</view>
					<view v-else="item.b7 > 5" class="ddstyle">大</view>
					<view v-if="item.b8 <= 5" class="sxstyle">小</view>
					<view v-else="item.b8 > 5" class="ddstyle">大</view>
					<view v-if="item.b9 <= 5" class="sxstyle">小</view>
					<view v-else="item.b9 > 5" class="ddstyle">大</view>
					<view v-if="item.b10 <= 5" class="sxstyle">小</view>
					<view v-else="item.b10 > 5" class="ddstyle">大</view>
				</view>
				<view class="dresult-title-r" v-if="lott=='XYSSC' || lott=='JSSSC' || lott=='AZXYW' || lott=='CQHLSX'">
					<view v-if="item.b1 < 5" class="sxstyle-circle">小</view>
					<view v-else="item.b1 >= 5" class="ddstyle-circle">大</view>
					<view v-if="item.b2 < 5" class="sxstyle-circle">小</view>
					<view v-else="item.b2 >= 5" class="ddstyle-circle">大</view>
					<view v-if="item.b3 < 5" class="sxstyle-circle">小</view>
					<view v-else="item.b3 >= 5" class="ddstyle-circle">大</view>
					<view v-if="item.b4 < 5" class="sxstyle-circle">小</view>
					<view v-else="item.b4 >= 5" class="ddstyle-circle">大</view>
					<view v-if="item.b5 < 5" class="sxstyle-circle">小</view>
					<view v-else="item.b5 >= 5" class="ddstyle-circle">大</view>
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
</style>

