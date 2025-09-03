<template>
	<view>
		<view class="content">
			<view v-for="(item, index) in list" :key="index" class="row-record" style="height: 70px; left: 0px; width: 100%;">
				<view class="dresult-title-l">
					<view class="title">{{ item.period }}</view><view class="title">{{ item.drawTime }}</view>
				</view>
				<view class="dresult-title-r" v-if="lott=='SGFT' || lott=='XYFT' || lott=='BJSC' || lott=='AZXYS' || lott=='JSFT' || lott=='JSSC'">
					<view :class="'priz-ball color-'+item.b1">{{ item.b1 }}</view>
					<view :class="'priz-ball color-'+item.b2">{{ item.b2 }}</view>
					<view :class="'priz-ball color-'+item.b3">{{ item.b3 }}</view>
					<view :class="'priz-ball color-'+item.b4">{{ item.b4 }}</view>
					<view :class="'priz-ball color-'+item.b5">{{ item.b5 }}</view>
					<view :class="'priz-ball color-'+item.b6">{{ item.b6 }}</view>
					<view :class="'priz-ball color-'+item.b7">{{ item.b7 }}</view>
					<view :class="'priz-ball color-'+item.b8">{{ item.b8 }}</view>
					<view :class="'priz-ball color-'+item.b9">{{ item.b9 }}</view>
					<view :class="'priz-ball color-'+item.b10">{{ item.b10 }}</view>
				</view>
				<view class="dresult-title-r" v-if="lott=='XYSSC' || lott=='JSSSC' || lott=='AZXYW'">
					<view class="azxyw-ball" v-if="">{{ item.b1 }}</view>
					<view class="azxyw-ball">{{ item.b2 }}</view>
					<view class="azxyw-ball">{{ item.b3 }}</view>
					<view class="azxyw-ball">{{ item.b4 }}</view>
					<view class="azxyw-ball">{{ item.b5 }}</view>
				</view>
				<view class="dresult-title-r" v-if="lott=='CQHLSX'">
					<view :class="'cqhlsx-ball ball-'+item.b1">{{ item.b1 }}</view>
					<view :class="'cqhlsx-ball ball-'+item.b2">{{ item.b2 }}</view>
					<view :class="'cqhlsx-ball ball-'+item.b3">{{ item.b3 }}</view>
					<view :class="'cqhlsx-ball ball-'+item.b4">{{ item.b4 }}</view>
					<view :class="'cqhlsx-ball ball-'+item.b5">{{ item.b5 }}</view>
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
		},
		created() {
			console.log(this.lott)
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
