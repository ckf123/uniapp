<template>
	<view class="content">
		<cu-custom bgColor="bg-gradual-green" :isBack="false">
			<block slot="content">首页</block>
		</cu-custom>
		<u-swiper 
		:list="imgList" 
		indicator-pos="bottomRight" 
		:effect3d="true" 
		:circular="true" 
		height="300rpx"
		mode="rect"
		class="swiper">
		</u-swiper>
		<u-button type="default"  :custom-style="customStyle" @click="barcode()">扫一扫</u-button>
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="3" v-for="(nav_bar,index) in navBars" :key="index">
					<navigator class="good-items" :url="nav_bar.pageUrl">
						<view :class="nav_bar.icon"></view>
						<text>{{nav_bar.title}}</text>
					</navigator>
				</u-col>
			</u-row>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				flash: 'false',
				customStyle:{
				   margin: '20px',
				   backgroundColor: "#409EFF",
				   color:"white",
				},
				imgList: [{
						image: 'http://117.66.237.156:60000/g1/M00/00/1A/wKgTLl_AqSCAXZEWAAIrOB2Exv0217.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'http://117.66.237.156:60000/g1/M00/00/1A/wKgTLl_AqTOAYKKXAAoaB4sV5T0803.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'http://117.66.237.156:60000/g1/M00/00/1A/wKgTLl_AqQqAeSs0AAJuvlED1VA690.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				current: 0,
				navBars: [{
						icon: "iconfont icon-xiaoshoudingdan",
						title: "商品出库单",
						pageUrl: "/pages/orderGoods/orderGoods",
					},
				]
			}
		},
		onLoad() {},
		onUnload() {
		},
		methods: {
			toPages(url) {
				uni.navigateTo({
					url,
				})
			},
			//扫码成功回调
			 barcode() {
				this.$u.utils.Barcoded(async res=>{
					uni.showLoading({
					    title: '加载中',
						mask:true,
					});
					let Goodsmessages={};
					let url = 'http://192.168.21.75:8081/icsaleout/ve/';
					url = this.$u.utils.setQueryConfig(url,{res});
					let data;
					try{
						data = await this.$u.utils.fetch("get", url, {}, true);
					}catch(e){
						//TODO handle the exception
						    console.log(res);
							this.$u.toast("请求无数据"+res);
							uni.hideLoading()
					}
					Goodsmessages = data.data;
                    console.log(Goodsmessages);
					this.$u.route({
							type:"navigateTo",
							url:"pages/orderGoods/baseInfoGoods/baseInfoGoods",
							params:{
							    Goodsmessages:JSON.stringify(Goodsmessages),
								isShowupload:true,
							}
					})
					uni.hideLoading()
				},error=>{
					this.$u.toast("error未扫描到信息")
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
     .swiper{
		 margin: 16px 15px;
	 }
	.good-items {
		text-align: center;
		margin-top: 24rpx;

		.iconfont {
			font-size: 64rpx;
			margin-bottom: 16rpx;
		}
		.icon-xiaoshoudingdan {
			color: #409EFF;
		}

	}
</style>
