<template>
	<view>
		<view class="title">筛选名次</view>
		<view class="uni-flex uni-row">
			<view class="flex-item" v-bind:class="{ active:oneActive }" @click="changeM('oneActive')">
				<view class="info-title">冠军</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:twoActive }" @click="changeM('twoActive')">
				<view class="info-title">亚军</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:thrActive }" @click="changeM('thrActive')">
				<view class="info-title">第三名</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:fouActive }" @click="changeM('fouActive')">
				<view class="info-title">第四名</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:fivActive }" @click="changeM('fivActive')">
				<view class="info-title">第五名</view>
			</view>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item" v-bind:class="{ active:sixActive }" @click="changeM('sixActive')">
				<view class="info-title">第六名</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:sevActive }" @click="changeM('sevActive')">
				<view class="info-title">第七名</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:eigActive }" @click="changeM('eigActive')">
				<view class="info-title">第八名</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:ninActive }" @click="changeM('ninActive')">
				<view class="info-title">第九名</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:tenActive }" @click="changeM('tenActive')">
				<view class="info-title">第十名</view>
			</view>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item">
				<view class="lott-ball ball-yellow">1</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-wathet">2</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-earthy">3</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-orange">4</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-brandy">5</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-blue">6</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-gray">7</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-red">8</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-brown">9</view>
			</view>
			<view class="flex-item has-left-border">
				<view class="lott-ball ball-green">10</view>
			</view>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item has-bottom-border" :class="{'has-left-border':index > 0}" v-for="(val, key, index) in statsMc" :index="key" :key="key">
				<view class="lott-val">{{ val }}</view>
			</view>
		</view>
		
		<view class="title" style="margin-top: 100rpx;">筛选路珠</view>
		<view class="uni-flex uni-row">
			<view class="flex-item" style="width: 35%;" v-bind:class="{ active:hmActive }" @click="changeL('hmActive')">
				<view class="info-title">号码</view>
			</view>
			<view class="flex-item has-left-border" style="width: 35%;" v-bind:class="{ active:dxActive }" @click="changeL('dxActive')">
				<view class="info-title">大小</view>
			</view>
			<view class="flex-item has-left-border" style="width: 35%;" v-bind:class="{ active:dsActive }" @click="changeL('dsActive')">
				<view class="info-title">单双</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:gyhActive }" @click="changeL('gyhActive')">
				<view class="info-title">冠亚和</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:gyhdxActive }" @click="changeL('gyhdxActive')">
				<view class="info-title">冠亚和大小</view>
			</view>
			<view class="flex-item has-left-border" v-bind:class="{ active:gyhdsActive }" @click="changeL('gyhdsActive')">
				<view class="info-title">冠亚和单双</view>
			</view>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item" :class="{'has-left-border':index > 0, 'color-1':index % 2 === 0, 'color-2':index % 2 == 1}" v-for="(item, key1, index) in statsLz[0]" :index="key1" :key="key1">
				<view class="lott-val" v-for="(val, key2) in item" :index="key2" :key="key2">{{ val }}</view>
			</view>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item has-bottom-border" :class="{'has-left-border':index > 0, 'color-1':index % 2 === 0, 'color-2':index % 2 == 1}" v-for="(item, key1, index) in statsLz[1]" :index="key1" :key="key1">
				<view class="lott-val" v-for="(val, key2) in item" :index="key2" :key="key2">{{ val }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getStat} from '../../common/api/index.js'
	export default {
		data() {
			return {
				oneActive: true,
				twoActive: false,
				thrActive: false,
				fouActive: false,
				fivActive: false,
				sixActive: false,
				sevActive: false,
				eigActive: false,
				ninActive: false,
				tenActive: false,
				hmActive: true,
				dxActive: false,
				dsActive: false,
				gyhActive: false,
				gyhdxActive: false,
				gyhdsActive: false,
				mc: 1,
				lz: 1,
				lott: getApp().globalData.currentLottery,
				statsMc:[],
				statsLz:[]
			}
		},
		mounted() {
		    this.loadStat()
		},
		methods: {
			changeM:function(type) {
				switch(type){
					case 'oneActive':
						this.oneActive = true
						this.twoActive = false
						this.thrActive = false
						this.fouActive = false
						this.fivActive = false
						this.sixActive = false
						this.sevActive = false
						this.eigActive = false
						this.ninActive = false
						this.tenActive = false
						this.mc = 0
						this.loadStat()
						break
					case 'twoActive':
						this.oneActive = false
						this.twoActive = true
						this.thrActive = false
						this.fouActive = false
						this.fivActive = false
						this.sixActive = false
						this.sevActive = false
						this.eigActive = false
						this.ninActive = false
						this.tenActive = false
						this.mc = 1
						this.loadStat()
						break
					case 'thrActive':
						this.oneActive = false
						this.twoActive = false
						this.thrActive = true
						this.fouActive = false
						this.fivActive = false
						this.sixActive = false
						this.sevActive = false
						this.eigActive = false
						this.ninActive = false
						this.tenActive = false
						this.mc = 2
						this.loadStat()
						break
					case 'fouActive':
						this.oneActive = false
						this.twoActive = false
						this.thrActive = false
						this.fouActive = true
						this.fivActive = false
						this.sixActive = false
						this.sevActive = false
						this.eigActive = false
						this.ninActive = false
						this.tenActive = false
						this.mc = 3
						this.loadStat()
						break
					case 'fivActive':
						this.oneActive = false
						this.twoActive = false
						this.thrActive = false
						this.fouActive = false
						this.fivActive = true
						this.sixActive = false
						this.sevActive = false
						this.eigActive = false
						this.ninActive = false
						this.tenActive = false
						this.mc = 4
						this.loadStat()
						break
					case 'sixActive':
						this.oneActive = false
						this.twoActive = false
						this.thrActive = false
						this.fouActive = false
						this.fivActive = false
						this.sixActive = true
						this.sevActive = false
						this.eigActive = false
						this.ninActive = false
						this.tenActive = false
						this.mc = 5
						this.loadStat()
						break
					case 'sevActive':
						this.oneActive = false
						this.twoActive = false
						this.thrActive = false
						this.fouActive = false
						this.fivActive = false
						this.sixActive = false
						this.sevActive = true
						this.eigActive = false
						this.ninActive = false
						this.tenActive = false
						this.mc = 6
						this.loadStat()
						break
					case 'eigActive':
						this.oneActive = false
						this.twoActive = false
						this.thrActive = false
						this.fouActive = false
						this.fivActive = false
						this.sixActive = false
						this.sevActive = false
						this.eigActive = true
						this.ninActive = false
						this.tenActive = false
						this.mc = 7
						this.loadStat()
						break
					case 'ninActive':
						this.oneActive = false
						this.twoActive = false
						this.thrActive = false
						this.fouActive = false
						this.fivActive = false
						this.sixActive = false
						this.sevActive = false
						this.eigActive = false
						this.ninActive = true
						this.tenActive = false
						this.mc = 8
						this.loadStat()
						break
					case 'tenActive':
						this.oneActive = false
						this.twoActive = false
						this.thrActive = false
						this.fouActive = false
						this.fivActive = false
						this.sixActive = false
						this.sevActive = false
						this.eigActive = false
						this.ninActive = false
						this.tenActive = true
						this.mc = 9
						this.loadStat()
						break
				}
			},
			changeL:function(type) {
				switch(type){
					case 'hmActive':
						this.hmActive = true
						this.dxActive = false
						this.dsActive = false
						this.gyhActive = false
						this.gyhdxActive = false
						this.gyhdsActive = false
						this.lz = 1
						this.loadStat()
						break
					case 'dxActive':
						this.hmActive = false
						this.dxActive = true
						this.dsActive = false
						this.gyhActive = false
						this.gyhdxActive = false
						this.gyhdsActive = false
						this.lz = 2
						this.loadStat()
						break
					case 'dsActive':
						this.hmActive = false
						this.dxActive = false
						this.dsActive = true
						this.gyhActive = false
						this.gyhdxActive = false
						this.gyhdsActive = false
						this.lz = 3
						this.loadStat()
						break
					case 'gyhActive':
						this.hmActive = false
						this.dxActive = false
						this.dsActive = false
						this.gyhActive = true
						this.gyhdxActive = false
						this.gyhdsActive = false
						this.lz = 4
						this.loadStat()
						break
					case 'gyhdxActive':
						this.hmActive = false
						this.dxActive = false
						this.dsActive = false
						this.gyhActive = false
						this.gyhdxActive = true
						this.gyhdsActive = false
						this.lz = 5
						this.loadStat()
						break
					case 'gyhdsActive':
						this.hmActive = false
						this.dxActive = false
						this.dsActive = false
						this.gyhActive = false
						this.gyhdxActive = false
						this.gyhdsActive = true
						this.lz = 6
						this.loadStat()
						break
				}
			},
			loadStat:function() {
				let token = this.checkLogin() // 判断是否登入
				getStat({'l':this.lott, 'mc': this.mc, 'lz': this.lz}, {'Authorization': token}).then(data => {
				   this.statsMc = data.mc;
				   this.statsLz = data.lz;
				})
			},
		},
	}
</script>

<style>
	.title {
		color: #737373;
		font-size: 42rpx;
		text-align: center;
	}
	.info-title{
		font-size: 12rpx;
		line-height: 80rpx;
	}
	.flex-item {
		width: 50%;
		min-height: 80rpx;
		text-align: center;
		background-color: #FFFFFF;
		border-top: 1rpx solid #ccc;
		color: #666666;
	}
	.has-left-border {
		border-left: 1rpx solid #ccc;
	}
	.has-bottom-border {
		border-bottom: 1rpx solid #ccc;
	}
	.lott-ball {
		margin-top: 18rpx;
	}
	.lott-val {
		font-weight: bold;
		margin-top: 18rpx;
	}
	.active {
		color: #FFF;
		background-color: #264567;
	}
	.color-1 {
		color: #100a5a;
	},
	.color-2 {
		color: #d09b00;
	}
</style>
