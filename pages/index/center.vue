<template>
	<view>
		<u-mask :show="isShow" :mask-click-able="false" :duration="400"></u-mask>
		<!-- <cu-custom bgColor="bg-gradual-green" :isBack="false">
			 <block slot="content">个人中心</block> 
			
		</cu-custom> -->
		<view class="u-flex user-box  bg-gradual-white">
			<view class="u-m-r-10">
				<u-avatar :src="vuex_user.avatar_url" size="120" ></u-avatar>
			</view>
			<view class="u-flex u-p-l-30">
				<view class="u-font-18 u-p-b-20">{{vuex_user.code? vuex_user.code:"未登录"}}</view>
				<!-- <view class="u-font-14 u-tips-color u-p-t-20">手机号:{{vuex_user.tel}}</view> -->
			</view>
		</view>
		

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="个人信息" @click="toBaseInfo"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="所有订单" :value="orderCount" @click="to"></u-cell-item>
				<!-- <u-cell-item icon="photo" title="收藏"></u-cell-item> -->
				<u-cell-item icon="heart" title="修改密码"></u-cell-item>
				<u-cell-item icon="coupon" title="关于" :value="'v'+ res.version"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-modal v-model="islogOut" :content="content" :async-close="true" :show-cancel-button="true" @confirm="logout">
			</u-modal>
			<u-cell-group>
				<u-cell-item icon="reload" title="退出登录" @click="showModel" :arrow="false"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: 'https://uviewui.com/common/logo.png',
				islogOut: false,
				isShow:false,
				res: "",
				orderCount: '',
				content: "",
			}
		},
		created() {
			this.res = this.getSystem();
			console.log(this.res);
			//拦截路由 判断是否登录
			this.isShow=!this.$u.utils.isLogin
		},
		onReady() {

		},
		methods: {
			toBaseInfo() {
				this.$u.route({
					url: 'pages/center/baseInfo'
				})
			},
			getSystem() {
				var result = 0;
				uni.getSystemInfo({
					success(res) {
						result = res;
					},
					fail(err) {
						console.error(err);
					}
				})
				return result;
			},
			showModel() {
				
				//清除token
				this.content = "退出登录"
				this.islogOut = true;
			},
			logout() {
				//请求api退出登录
				setTimeout(() => {
					this.$u.vuex("vuex_token", null);
					if(this.vuex_token==null){
						this.$u.toast("退出成功")
					}
					this.$u.vuex("vuex_user", {});
					this.$u.route({
						type: 'reLaunch',
						url: 'pages/auth/login'
					})
				}, 1500)
				
			}
		}
	}
</script>

<style lang="scss">
	.camera {
		width: 50px;
		height: 50px;

		&:active {
			background-color: #ededed;
		}
	}
	.user-box {
		height:300rpx;
		padding-top: 100rpx;
		padding-left:60rpx;
		background-color: #fff;
	}
</style>
