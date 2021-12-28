<template>
	<view class="regist">
		<view class="regist_content">
			<view class="title">欢迎注册</view>
			<!--昵称-->
			<input class="u-border-bottom" v-model="name" placeholder="请输入昵称" />
			<!--邮箱-->
			<input class="u-border-bottom" type="email" v-model="email" placeholder="请输入邮箱" />
			<!--密码-->
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<!--确认密码-->
			<input class="u-border-bottom" type="password" v-model="password_confirmation" placeholder="请输入确认密码" />
			<!--注册按钮-->
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				email:'',
				password:'',
				password_confirmation:'',
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.$u.test.email(this.email) && (this.password ? this.password==this.password_confirmation: false)) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			/*
			  执行注册
			*/
			async submit(){
		      //表单验证
			  
			  // 配置参数
			  const params = {
				  name:this.name,
				  email:this.email,
				  password:this.password,
				  password_confirmation:this.password_confirmation
			  };
			  //发送请求
			  await this.$u.api.authRegister(params);
			  
			  //重定向到登录界面
			  this.$u.route({
				  type:'redirect',
				  url:'pages/auth/login'
			  })
			}
		}
	}
</script>

<style lang="scss">
  .regist{
	  font-size: 28rpx;

	  .regist_content{
		  width: 600rpx;
		  margin: 80rpx auto 0;
		  .title{
		  		  margin:20rpx 0 ;
		  		  text-align: center;
		  		  font-size: 48rpx;
		  }
		  input{
		  	text-align: left;
		  	margin-bottom: 10rpx;
		  	padding-bottom: 6rpx;
		  }
		  .getCaptcha{
			  background-color: rgb(253, 243, 208);
			  color: $u-tips-color;
			  border: none;
			  font-size: 30rpx;
			  padding: 12rpx 0;
		  }
	  }
	  
  }
</style>
