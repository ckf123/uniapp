<template>
	<view class="wrap">
		<view class="content">
			<view class="title">欢迎登录</view>
<!-- 			<u-subsection :list="loginlist" 
			:current="current" 
			:animation="true" 
			 mode="subsection"
			:active-color="activeColor"
			@change="sectionChange"></u-subsection> -->
			<view  v-show="isShow">
				<input class="u-border-bottom" type="number" v-model="code" placeholder="承运商编码" :focus="firstFocus" />
				<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" :focus="secondFocus"/>
			</view>
<!-- 			<view v-show="!isShow">
				<input class="u-border-bottom" type="number" v-model="code" placeholder="承运商编码" />
				<input class="u-border-bottom" type="tel" v-model="tel" placeholder="司机手机号" />
				<input class="u-border-bottom" type="number" v-model="saleSeats" placeholder="销售出单号" />
			</view> -->
			<!-- <input class="u-border-bottom" v-model="tel" placeholder="请输入邮箱" /> -->
			
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">修改密码</view>
				<view class="issue" @click="barcode">扫码获取出库单号</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password: '',
				code: '',
				tel:'',
				saleSeats:'',
				isShow:true,
			    activeColor: this.$u.color['warning'],
				loginlist:[
					{
						name: '承运商'
					}, 
					{
						name: '司机'
					}
				],
				current:0,
				firstFocus:false,
				secondFocus:false,
				
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.code && this.password) {
					style.color = "#fff";
					style.backgroundColor = "#409EFF";
					style.opacity = 1;
				}
				return style;
			},
		},
		methods: {
       
		async submit() {
				if (!this.code) {
					this.$u.toast("账号未填写");
					this.initialization();
					setTimeout(() => {
						this.firstFocus = true;
					},0)
					return;
				}
				if(!this.password){
					this.$u.toast("密码未填写");
					this.initialization();
					setTimeout(() => {
						this.secondFocus = true;
					},0)
					return;
				}
				//处理参数: "params" is read-only const 修改为let
				let params={};
				if(this.current == 0){
				 	params = {
						code:this.$u.trim(this.code),
				 		password: this.password,	
				 	};
					let url = 'http://192.168.21.75:8082/CrLogin/'
					//请求API,执行登录
					url = this.$u.utils.setQueryConfig(url,params);
					console.log("请求路径"+url);
				    var {data} = await this.$u.utils.fetch("get", url, {}, true);
					console.log(data);
				}
				if(data.status==1){
					console.log("进入");
					this.$u.toast(data.message);
					this.$u.vuex("vuex_token", params.code);//溜溜果园存储token
					// this.$u.vuex("vuex_token", loginRes.access_token);//融城APPToken
					// const userInfo = await this.$u.api.userInfo();//融城app请求用户信息
					// this.$u.vuex("vuex_user", userInfo);//融城app缓存用户信息
					this.$u.vuex("vuex_user",{code:params.code});//溜溜果园缓存用户信息
					//登录之后,跳转到来源页
					const backUrl = uni.getStorageSync('back_url') || 'pages/index/index';
					this.$u.route({
						type: 'reLaunch',
						url: backUrl
					})
				}else if(data.status==-2){
					this.$u.toast(data.message);
					this.initialization();
					setTimeout(() => {
						this.secondFocus = true;
					},0)
				}else if(data.status==0){
					this.$u.toast(data.message)
					this.initialization();
					setTimeout(() => {
						this.firstFocus = true;
					},0)		
				}
				
			},
			
			//登录切换
			sectionChange(index) {
				console.log(index);
			    this.current = index;
                this.isShow = !this.isShow;
				this.saleSeats = '';
			},
			initialization() {
				this.firstFocus = false;
				this.secondFocus = false;
			},
		},
	    
	};
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		margin-top: 40rpx;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				// background-color: rgb(253, 243, 208);
				background-color: #409EFF;
				opacity: 0.5;
				color: white;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
