<template>
	<view>
		<view style="display: inline-flex;width: 100%;">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						类型
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
							<view class="uni-input">{{array[index].name}}</view>
						</picker>
					</view>
				</view>
			</view>
		
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						日期
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="rough-lines"></view>
		<!-- 期数 时间 号码 大小 单双 总和/形态 重庆欢乐生肖-->
		<!-- 期数 时间 号码 大小 单双 冠亚龙虎 SGFT-->
		<view class="dresult-title">
			<view class="dresult-title-l">
				<view>期数</view>
				<view>时间</view>
			</view>
			<view class="dresult-title-r">
				<view class="title-btn" v-bind:class="{ active:hmActive }" @click="change('hmActive')">号码</view>
				<view class="title-btn" v-bind:class="{ active:dxActive }" @click="change('dxActive')">大小</view>
				<view class="title-btn" v-bind:class="{ active:dsActive }" @click="change('dsActive')">单双</view>
				<view v-if="lott=='SGFT' || lott=='XYFT' || lott=='BJSC' || lott=='AZXYS' || lott=='JSFT' || lott=='JSSC'" class="title-btn" v-bind:class="{ active:glActive }" @click="change('glActive')">冠亚/龙虎</view>
				<view v-if="lott=='XYSSC' || lott=='JSSSC' || lott=='AZXYW' || lott=='CQHLSX'" class="title-btn" v-bind:class="{ active:zxActive }" @click="change('zxActive')">总和/形态</view>
			</view>
		</view>
		<dresult-hm v-if="hmActive==true" :list=dresults :lott=lott></dresult-hm>
		<dresult-dx v-if="dxActive==true" :list=dresults :lott=lott></dresult-dx>
		<dresult-ds v-if="dsActive==true" :list=dresults :lott=lott></dresult-ds>
		<dresult-gl v-if="glActive==true" :list=dresults :lott=lott></dresult-gl>
		<dresult-zx v-if="zxActive==true" :list=dresults :lott=lott></dresult-zx>
	</view>
	
</template>

<script>
	var getDate = require('@/common/util.js').getDate
	import {getDresult} from '../../common/api/index.js'
	export default {
		data() {
			return {
				array: [
					{lott:'AZXYS', name: '澳洲幸运10'},
					{lott:'JSFT', name:'极速飞艇'},{lott:'JSSC', name: '极速赛车'}
				],
				index: 0,
				lott: 'AZXYS',
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				hmActive:true,
				dxActive:false,
				dsActive:false,
				glActive:false,
				zxActive:false,
				dresults:[]
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.lott = this.array[this.index].lott
				
				this.hmActive = true
				this.dxActive = false
				this.dsActive = false
				this.glActive = false
				this.zxActive = false
				
				this.loadDresult()
			},
			bindDateChange: function(e) {
				// console.log('picker发送选择改变，携带值为：' + e.detail.value)
				this.date = e.detail.value
				this.loadDresult()
			},
			change:function(type) {
				switch(type){
					case 'hmActive':
						this.hmActive = true
						this.dxActive = false
						this.dsActive = false
						this.glActive = false
						this.zxActive = false
						break
					case 'dxActive':
						this.hmActive = false
						this.dxActive = true
						this.dsActive = false
						this.glActive = false
						this.zxActive = false
						break
					case 'dsActive':
						this.hmActive = false
						this.dxActive =false
						this.dsActive = true
						this.glActive = false
						this.zxActive = false
						break
					case 'glActive':
						this.hmActive = false
						this.dxActive =false
						this.dsActive = false
						this.glActive = true
						this.zxActive = false
						break
					case 'zxActive':
						this.hmActive = false
						this.dxActive =false
						this.dsActive = false
						this.glActive = false
						this.zxActive = true
						break
				}
			},
			loadDresult: function() {
				let token = this.checkLogin() // 判断是否登入
				getDresult({'l':this.lott, 'd': this.date}, {'Authorization': 'Bearer ' + token}).then(data => {
				   this.dresults = data.dresults;
				})
			}
		},
		onLoad() {
			this.loadDresult()
		}
	}
</script>

<style>
	.dresult-title {
		display: flex;
		justify-content: space-around;
		-webkit-box-align: center;
		align-items: center;
		height: 45px;
		border-bottom: 1px solid #cccccc;
		box-shadow: #cccccc 0px 0px 5px;
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
	.active {
	    color: #ffffff !important;
	    background-color: #0066cc !important;
	}
	.title-btn {
	    display: flex;
	    -webkit-box-align: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    justify-content: center;
	    font-size: 30rpx;
	    border-radius: 12rpx;
	    padding: 0rpx 20rpx;
	    height: 56rpx;
	    user-select: none;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    border: 1rpx solid #cccccc !important;
	    color: #666666;
	    background-color: transparent;
	}
	.rough-lines {
	    width: 100%;
	    height: 10px;
	    background-color: #ebebeb;
	    box-shadow: #bbbbbb 0px 1px 1px inset;
	}
	.uni-input{
		width: 100%;
	}
</style>
