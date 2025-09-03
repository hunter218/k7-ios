<template>
	<view>
		<uni-drawer ref="draw" :mask="mask" :width="drawWid" :mode='mode'>
			<view>
				<uni-list >
					<uni-list-item :clickable=false style="background-color: #264567;height: calc(44px + env(safe-area-inset-top));"/>
					<uni-list-item :clickable=true @click='listSelected(1)' title="主页" class="iconfont icon-zhuye2" />
					<uni-list-item :clickable=true @click='listSelected(2)' title="个人资讯" class="iconfont icon-user"/>
					<uni-list-item :clickable=true @click='listSelected(3)' title="修改密码" class="iconfont icon-password"/>
					<uni-list-item :clickable=true @click='listSelected(4)' title="未结明细" class="iconfont icon-zhangdanchaxunlanse" />
					<uni-list-item :clickable=true @click='listSelected(5)' title="今天已结" class="iconfont icon-dingdanmingxi" />
					<uni-list-item :clickable=true @click='listSelected(6)' title="两周报表" class="iconfont icon-baobiao" />
					<uni-list-item :clickable=true @click='listSelected(10)' title="返水报表" class="iconfont icon-baobiao" />
					<uni-list-item :clickable=true @click='listSelected(11)' title="代理报表" class="iconfont icon-baobiao" />
					<uni-list-item :clickable=true @click='listSelected(12)' title="添加代理" class="iconfont icon-dailiren"/>
					<uni-list-item :clickable=true @click='listSelected(7)' title="开奖结果" class="iconfont icon-kaijiang2" />
					<uni-list-item :clickable=true @click='listSelected(13)' title="添加银行卡" class="iconfont icon-yinhangka"/>
					<uni-list-item :clickable=true @click='listSelected(8)' title="全国开奖网" class="iconfont icon-kaijiang-xuanzhong" />
					<uni-list-item :clickable=true @click='listSelected(9)' title="规则" class="iconfont icon-guizeyinqing" />
					<uni-list-item :clickable=true @click='doLogout' title="退出" class="iconfont icon-tuichu1" />
				</uni-list>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import {logout} from '../../common/api/index.js'
	export default {
		data() {
			return {
				mask: true,
				drawWid:280,//最好把uni-drawer组件里的参数width的type改为String，不然想用百分比报错烦
				maskClick:true,
				mode:'left'
			}
		},
		onLoad() {
		
		},
		methods: {
			//显示抽屉
			show(){
				this.$refs.draw.open()
			},
			hide(){
				this.$refs.draw.close()
			},
			doLogout(){
				let token = this.checkLogin() // 判断是否登入
				logout({'Authorization': 'Bearer ' + token}).then(result => {
					if (result.status == 'SUCCESS') {
						uni.removeStorageSync('token');
						uni.reLaunch({
							url:'/pages/user/login'
						})
					}
				})
			},
			listSelected :(i) =>{
				switch (i){
					case 1:
						uni.reLaunch({
							url:'/pages/index/index'
						})
						break
					case 2:
						uni.navigateTo({
							url:'/pages/user/info'
						})
						break
					case 3:
						uni.navigateTo({
							url:'/pages/user/password'
						})
						break
					case 4:
						uni.reLaunch({
							url:'/pages/bill/index'
						})
						break
					case 5:
						uni.navigateTo({
							url:'/pages/bill/settled'
						})
						break
					case 6:
						uni.navigateTo({
							url:'/pages/bill/history'
						})
						break
					case 7:
						uni.reLaunch({
							url:'/pages/dresult/index'
						})
						break
					case 8:
						location.href = 'http://168kai.com'
						break
					case 9:
						uni.reLaunch({
							url:'/pages/rule/index'
						})
						break
					case 10:
						uni.navigateTo({
							url:'/pages/water/index'
						})
						break
					case 11:
						uni.navigateTo({
							url:'/pages/agent/index'
						})
						break
					case 12:
						uni.navigateTo({
							url:'/pages/agent/form'
						})
						break
					case 13:
						uni.navigateTo({
							url:'/pages/bank/form'
						})
						break
					default:break
				}
			}
		},
	}
</script>

<style>
	.uni-list-item__container {
		padding-left: 22rpx;
	}
	.icon-zhuye2:before,.icon-user:before,.icon-zhangdanchaxunlanse:before,.icon-password:before,.icon-dingdanmingxi:before,.icon-baobiao:before,.icon-kaijiang-xuanzhong:before,.icon-kaijiang2:before,.icon-guizeyinqing:before,.icon-tuichu1:before,.icon-dailiren:before,.icon-yinhangka:before {
		font-size: 48rpx;
		margin-top: 4rpx;
		margin-left: 18rpx;
	}
	.icon-zhuye2 {
		color: #FF8A10;
	}
	.icon-user {
		color: #32418C;
	}
	.icon-password {
		color: #0077AA;
	}
	.icon-zhangdanchaxunlanse {
		color: #007AFF;
	}
	.icon-dingdanmingxi {
		color: #1F59A2;
	}
	.icon-baobiao {
		color: #5B63BD;
	}
	.icon-kaijiang-xuanzhong {
		color: #E83C4C;
	}
	.icon-kaijiang2 {
		color: #3F67AF;
	}
	.icon-guizeyinqing {
		color: #3F67AF;
	}
	.icon-tuichu1 {
		color: #3F67AF;
	}
	.icon-dailiren {
		color: #3F67AF;
	}
	.icon-yinhangka {
		color: #3F67AF;
	}
</style>
