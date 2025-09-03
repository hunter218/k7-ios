<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<!-- 文本框 -->
				<textarea auto-height="true" class="chat-send btn" :class="{displaynone:isrecord}" @input="inputs"
					@focus="focus" v-model="msg"></textarea>
				
				<view class="bt-img" @tap="more">
					<image src="../../static/icon/news.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isrecord: false,
				isemoji: false,
				ismore: false,
				voicebg: false,
				pageY: 0,
				msg: "",
				// 直接引用地址可能出不来，需要用require
				toc: '../../static/icon/allorder.png',
				timer: '', //计时器
				vlength: 0
			};
		},
		methods: {
			//获取高度方法
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights', data.height);
				}).exec();
			},
			//切换音频
			records() {
				//切换的时候关闭其他界面
				this.ismore = false
				this.isemoji = false
				//切换高度
				setTimeout(() => {
					this.getElementHeight();
				}, 10)
				if (this.isrecord) {
					this.isrecord = false;
					this.toc = "../../static/icon/allorder.png";
				} else {
					this.isrecord = true;
					this.toc = "../../static/icon/wechat.png";
				}
			},
			//文字发送
			inputs(e) {
				var chatm = e.detail.value;
				var pos = chatm.indexOf('\n');
				// 检索字符串没有数据，返回-1
				// if (pos != -1 && chatm.length > 1) {
				// this.$emit('inputs', this.msg);
				// setTimeout(() => {
				// 	this.msg = '';
				// }, 0)
				// }

				if (pos != -1 && chatm.length > 1) {
					// 0为表情和文字
					this.send(this.msg, 0)
				}

			},
			// 输入框聚焦
			focus() {
				//关闭其他项
				this.isemoji = false;
				this.ismore = false;
				setTimeout(() => {
					this.getElementHeight()
				}, 10)
			},
			//发送
			send(msg, type) {
				let date = {
					message: msg,
					type: type
				}
				this.$emit('inputs', date);
				setTimeout(() => {
					this.msg = '';
				}, 0)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.submit {
		background: rgba(244, 244, 244, 0.96);
		border-top: 1px solid rgba(39, 40, 50, 0.1);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		// padding-bottom: var(--status-bar-height);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.displaynone {
		display: none;
	}

	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}

		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}

		.chat-send {
			line-height: 44rpx;
		}

		.record {
			line-height: 44rpx;
			text-align: center;
			font-size: 20rpx;
			color: rgba(39, 40, 50, 0.6);
		}
	}
</style>

