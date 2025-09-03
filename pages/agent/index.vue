<template>
	<view>
		<view style="text-align: left;line-height: 4rpx;">
			<button type="primary" plain="true" size="mini" :style="btn1Checked ? {margin:'10rpx',background:'#ffc833',border:'1px solid #b9cfe6'} : {margin:'10rpx',background:'#FFF',border:'1px solid #b9cfe6'}" @click="handleRequest(1)">今日</button>
			<button type="primary" plain="true" size="mini" :style="btn2Checked ? {margin:'10rpx',background:'#ffc833',border:'1px solid #b9cfe6'} : {margin:'10rpx',background:'#FFF',border:'1px solid #b9cfe6'}" @click="handleRequest(2)">昨日</button>
		</view>
		<view class="agent-pannel">
			<view class="uni-flex uni-row">
				<view class="flex-item width-1">
					<view class="info-title">佣金</view>
				</view>
				<view class="flex-item has-left-border width-2">
					<view class="info-title">{{ total_commission }}</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">总下线人数</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">{{ total_users }}</view>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item width-1">
					<view class="info-title">名称/退点</view>
				</view>
				<view class="flex-item has-left-border width-2">
					<view class="info-title">最高级退点</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">流水</view>
				</view>
				<view class="flex-item has-left-border width-3">
					<view class="info-title">佣金</view>
				</view>
			</view>
			<view>
				<view class="uni-flex uni-row" v-for="(item, index) in list" :key="index">
					<view class="flex-item-v width-1">{{ item.agent_name }}/{{ item.agent_water }}</view>
					<view class="flex-item-v width-2">{{ item.ancestor_name }}/{{ item.ancestor_water }}</view>
					<view class="flex-item-v width-3">{{ item.amount }}</view>
					<view class="flex-item-v width-3">{{ item.commission }}</view>
				</view>
				<view style="color: #ABABAB; margin: 100rpx auto;border-bottom: 1px solid #CCCCCC; text-align: center;" v-if="list.length==0">
					暂无数据
				</view>
			</view><!--  -->
			
			<view class="uni-flex uni-row">
				<view class="flex-item width-title">
					<view class="info-title">未下注下级</view>
				</view>
			</view>
			<view class="uni-flex uni-row">
				<view class="flex-item width-11">
					<view class="info-title">名称/退点</view>
				</view>
				<view class="flex-item has-left-border width-12">
					<view class="info-title">最高级退点</view>
				</view>
				<view class="flex-item has-left-border width-13">
					<view class="info-title">最后登入时间</view>
				</view>
			</view>
			<view>
				<view class="uni-flex uni-row" v-for="(item, index) in no_wager_list" :key="index">
					<view class="flex-item-v width-11">{{ item.agent_name }}/{{ item.agent_water }}</view>
					<view class="flex-item-v width-12">{{ item.ancestor_name }}/{{ item.ancestor_water }}</view>
					<view class="flex-item-v width-13">{{ item.login_time }}</view>
				</view>
				<view style="color: #ABABAB; margin: 100rpx auto;border-bottom: 1px solid #CCCCCC; text-align: center;" v-if="no_wager_list.length==0">
					暂无数据
				</view>
			</view><!--  -->
		</view>

	</view>
</template>

<script>
	import {getAgent} from '../../common/api/index.js'
	var formatUtils = require('../../common/util.js').formatUtils
	export default {
		data() {
			return {
				type: 'today',
				total_users:0,
				total_commission: 0,
				list:[],
				no_wager_list:[],
				btn1Checked:true,
				btn2Checked:false,
			}
		},
		methods: {
			handleRequest(index) {
				if (index == 1) {
					this.btn1Checked = true
					this.btn2Checked = false
					this.type = 'today'
					this.loadInfo()
				} else {
					this.btn1Checked = false
					this.btn2Checked = true
					this.type = 'yesterday'
					this.loadInfo()
				}
			},
			loadInfo: function() {
				let token = this.checkLogin() // 判断是否登入
				getAgent({t: this.type}, {'Authorization': 'Bearer ' + token}).then(data => {
				   this.list = data.agent;
				   this.no_wager_list = data.descendants
				   this.total_users = data.total_users;
				   this.total_commission = data.total_commission;
				})
			},
		},
		onLoad() {
			this.loadInfo()
		},
	}
</script>

<style scoped>
	.agent-pannel{
		width: 100%;
	}
	.info-title {
		line-height: 60rpx;
		font-size: 24rpx;
	}
	.flex-item {
		text-align: center;
		line-height: 80rpx;
		background-color: #EBEBEB;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
	}
	.flex-item-v {
		text-align: center;
		line-height: 80rpx;
		background-color: #FFF;
		border-bottom: 1rpx solid #ccc;
		color: #666666;
		font-size: 24rpx;
	}
	.width-1{
		width: 40%;
	}
	.width-2{
		width: 30%;
	}
	.width-3{
		width: 30%;
	}
	.width-11{
		width: 30%;
	}
	.width-12{
		width: 30%;
	}
	.width-13{
		width: 40%;
	}
	.width-title{
		width: 100%;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
	.selected-btn{
		margin: 10rpx;
		background-color: #ffc833;
		border: 1px solid #b9cfe6;
	}
	.un-selected-btn{
		margin: 10rpx;
		background-color: #b9cfe6;
		border: 1px solid #b9cfe6;
	}
</style>
