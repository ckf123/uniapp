<template>
	<view>
		<index v-if="PageCur=='index'"></index>
		<message v-if="PageCur=='message'"></message>
		<center v-if="PageCur=='center'"></center>
		
		<view class="box">
			<view class="cu-bar tabbar bg-white shadow foot">
				<view class="action" @click="NavChange" data-cur="index">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='index'" src="../../static/tabBar/homeA.png"></image>
						<image v-if="PageCur != 'index'" src="../../static/tabBar/home.png"></image>
					</view>
					<view :class="PageCur=='index'?'color_main':'text-gray'">首页</view>
				</view>
			
				<view class="action" @click="NavChange" data-cur="message">
					<view class='cuIcon-cu-image'>
						<image v-if="PageCur=='message'" src="../../static/tabBar/messageA.png"></image>
						<image v-if="PageCur != 'message'" src="../../static/tabBar/message.png"></image>
					</view>
					<view :class="PageCur=='message'?'color_main':'text-gray'">消息</view>
				</view>
				
				<view class="action" @click="NavChange" data-cur="center">
					<view class='cuIcon-cu-image'>
						<view class="cu-tag badge"><!-- 红点 --></view>
						<image v-if="PageCur=='center'" src="../../static/tabBar/center-selected.png"></image>
						<image v-if="PageCur != 'center'" src="../../static/tabBar/center.png"></image>
					</view>
					<view :class="PageCur=='center'?'color_main':'text-gray'">个人中心</view>
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	import center from "./center.vue" //个人信息页
	import index from "./index.vue" //主页
	import message from "./message.vue" //消息页
	export default {
		components:{
			center,index,message
		},
		data() {
			return {
				PageCur:'index',
			}
		},
		methods: {
			NavChange(e){
				this.PageCur = e.currentTarget.dataset.cur;
			}
		}
	}
</script>

<style lang="scss">
	.box {
		margin: 20upx 0;
	}
	.box view.cu-bar {
		margin-top: 20upx;
	}
	
	.logo_btn{
		width: 38*2rpx;
		height: 38*2rpx;
		position: absolute;
		z-index: 2;
		border-radius: 50%;
		top: -40rpx;
		left: 0rpx;
		right: 0;
		margin: auto;
		padding: 0;
	}
	.cu-bar.tabbar .action.add-action {
	    padding-top: 56rpx !important;
	}
</style>
