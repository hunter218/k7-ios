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
		</view>
		<rule-sgft v-if="lott=='SGFT'"></rule-sgft>
		<rule-xyft v-if="lott=='XYFT'"></rule-xyft>
		<rule-bjsc v-if="lott=='BJSC'"></rule-bjsc>
		<rule-xyssc v-if="lott=='XYSSC'"></rule-xyssc>
		<rule-cqhlsx v-if="lott=='CQHLSX'"></rule-cqhlsx>
		<rule-azxys v-if="lott=='AZXYS'"></rule-azxys>
		<rule-jsssc v-if="lott=='JSSSC'"></rule-jsssc>
		<rule-azxyw v-if="lott=='AZXYW'"></rule-azxyw>
		<rule-jsft v-if="lott=='JSFT'"></rule-jsft>
		<rule-jssc v-if="lott=='JSSC'"></rule-jssc>
		
		<my-drawer ref="mydraw"></my-drawer>
		<game-drawer ref="gamedraw"></game-drawer>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				array: [
					{lott:'SGFT', name:'SG飞艇'},{lott:'XYFT', name: '幸运飞艇'},
					{lott:'BJSC', name:'北京赛车（PK10）'}, {lott:'XYSSC', name:'幸运时时彩'},
					{lott:'CQHLSX', name:'重庆欢乐生肖'},{lott:'AZXYS', name: '澳洲幸运10'},
					{lott:'JSSSC', name:'极速时时彩'}, {lott:'AZXYW', name:'澳洲幸运5'},
					{lott:'JSFT', name:'极速飞艇'},{lott:'JSSC', name: '极速赛车'}
				],
				index: 0,
				lott: 'AZXYS',
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value
				this.lott = this.array[this.index].lott
			},
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.$refs.mydraw.show();
			} else if (e.index == 1) {
				this.$refs.gamedraw.show();
			}
		},
	}
</script>

<style>
	.uni-input{
		width: 100%;
	}
</style>
