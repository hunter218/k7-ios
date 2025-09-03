<template>
    <view>
        <sun-tab :value.sync="index" @change="arrayChange" :tabList="tabList" :activeColor="activeColor"></sun-tab>
        <stat-lm v-if="index==0"></stat-lm>
		<stat-lz v-if="index==1 && (currentLottery=='SGFT' || currentLottery=='XYFT' || currentLottery=='BJSC' || currentLottery=='AZXYS' || currentLottery=='JSFT' || currentLottery=='JSSC')"></stat-lz>
		<stat-lz-azxyw v-if="index==1 && (currentLottery=='XYSSC' || currentLottery=='JSSSC' || currentLottery=='AZXYW')"></stat-lz-azxyw>
		<stat-lz-cqhlsx v-if="index==1 && (currentLottery=='CQHLSX')"></stat-lz-cqhlsx>
    </view>
    
</template>

<script>
    export default {
            data() {
                return {
                    index: 0,
					currentLottery: getApp().globalData.currentLottery,
                    activeColor:'#254667',
                    tabList: ['两面长龙', '路珠'],
                    list:[]
                }
            },
			methods:{
				arrayChange(e){
				},
			}
        }
</script>

<style scoped>
    .history-pannel{
        width: 100%;
    }
    .info-title {
        line-height: 60rpx;
        font-size: 18rpx;
    }
    .flex-item {
        text-align: center;
        line-height: 180rpx;
        background-color: #EBEBEB;
        border-bottom: 1rpx solid #ccc;
        color: #666666;
    }
    .flex-item-v {
        width: 100%;
        color: #666666;
        min-height: 60px;
        -webkit-box-align: center;
        align-items: center;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        border-bottom: 1px solid #cccccc;
        padding-top: 50rpx;
    }
    .width-1{
        width: 30%;
    }
    .width-2{
        width: 10%;
    }
    .width-3{
        width: 20%;
    }
    .has-left-border {
        border-left: 1rpx solid #ccc;
    }
</style>
