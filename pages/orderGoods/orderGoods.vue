<template>
	<view class="Goods-wrap ">
		<view class="tba">
			<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="change" bar-height="6"
				bar-width="100">
			</u-tabs>
		</view>
		<view class="order-top">
			<!-- 文字分开在微信小程序显示异常 -->
			<view class="client-color">
				共有<text class="color-test-blue">{{total}}</text>张销售出库单
			</view>
		</view>
		<view class="u-body-wrap u-skeleton">
			<view v-if="isNotification" class="notification">
				<icon class="iconfont icon-ziyuan" style="font-size: 80px; color: #409EFF;"></icon>
				<text>暂无数据</text>
			</view>
			<u-card v-else="isNotification" :show-head="false" :border="false" :full="false" padding="0" margin="0">
				<view class="u-body" slot="body">
					<view class="u-body-item u-flex  u-p-t-0" v-for="(Goodsmessage,index) in Goodsmessages" :key="index"
						:data-goods="Goodsmessage.vbillcode" @click="toGoodsMessage(Goodsmessage.vbillcode,index)"
						ref="item">
						<image class="u-skeleton-fillet"
							src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
							mode="aspectFill">
						</image>
						<view class="u-p-t-20 u-p-b-20 u-body-title-wrap new-border">
							<view class="u-body-item-title u-line-2 u-skeleton-rect">{{Goodsmessage.customername}}
							</view>
							<view class="u-body-item-title f-s-28 u-skeleton-rect">{{Goodsmessage.vbillcode}}</view>
							<!-- <view class="u-body-item-title u-skeleton-rect">
								<view class="address  u-line-1 u-skeleton-rect">
									<u-icon name="map"></u-icon>
									{{Goodsmessage.vaddressinfo}}
								</view>
							</view> -->
							<view class="u-body-item-title f-s-28">
							      发货时间:{{Goodsmessage.taudittime | capitalize}}
								  到货时间:{{Goodsmessage.taudittime | capitalize}}
							</view>
						</view>
					</view>
				</view>
			</u-card>
	    </view>
        <view class=""></view>
		<!-- 骨架屏 -->
		<u-skeleton :loading="isloading" :animation="true" bgColor="#FFF"></u-skeleton>
		
		<u-divider height="80" half-width="250" v-show="pageNum>totalPage">没有更多了</u-divider>
	</view>
</template>

<script>
	const url = "http://192.168.21.75:8081/icsaleout/ct/";
	export default {
		data() {
			return {
				tabList: [{
					name: '在途',
					count: 1,
				}, {
					name: '已签收',
					count: 1,
				}, {
					name: '未发货',
					count: 1
				}], //
				current: 0,
				src: "http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg",
				isloading: false, // 是否显示骨架屏组件
				Goodsmessages: [], //列表数据
				pageNum: 1, //当前页数
				pageSize: 20, //显示数量
				total: 0, //总数量
				totalPage: 2, //总页数
				isNotification:false,
			}
		},
	    onLoad() {
			this.getGoodsmessages({code: this.vuex_user.code?this.vuex_user.code:"040000002"});
			//日志打印
			console.log(this.Goodsmessages);
			this.$u.vuex("cccc",{
				name:"1",
				age:{
					name:"1"
				},
			})
			console.log(this.$store);
		},
		onPullDownRefresh() {
			//重置数据
			this.Goodsmessages = [];
			this.getGoodsmessages({code: this.vuex_user.code?this.vuex_user.code:"040000002"});
			console.log(this.Goodsmessages);
		},
		//上拉加载
		onReachBottom() {
			if(this.pageNum>this.totalPage)
			{
			  this.$u.toast("已经最后一页")
			  return;
			};
			this.pageNum=this.pageNum+1;
			this.getGoodsmessages({code: this.vuex_user.code?this.vuex_user.code:"040000002"});
			console.log(this.Goodsmessages);
		},
		computed: {
            
		},
		filters:{
			capitalize: function (value) {
			    if (!value) return ''
			    value = value.toString()
				var index  = value.indexOf(" ")
			    return  value.slice(0,index)
			  }
		},
		methods: {
			//切换显示
		    change(index) {	
				//重置数据
				this.current = index;
				this.pageNum = 1;
				this.Goodsmessages = [];
				//请求数据
		        this.getGoodsmessages({code: this.vuex_user.code});
				console.log(this.Goodsmessages);
				
				
			},
			//请求数据
			async getGoodsmessages(queryParams){
				this.isloading  = true;
				let queryUrl = this.$u.utils.setQueryConfig(url, queryParams);
				var params = {
					fbillflag: this.current,
					pageNum: this.pageNum,
					pageSize:this.pageSize,
				};
				try{
					let {data} = await this.$u.utils.fetch("get", queryUrl, params, true);
					console.log(data);
				    if(data.list==[]){
				    	this.total = data.total;
				    	this.totalPage = data.totalPage;
				    	this.Goodsmessages =[];
				    	return;
				    }
				    this.$u.toast("获取数据成功");
				    console.log(data);
				    this.total = data.total;
				    this.totalPage = data.totalPage;
				    this.Goodsmessages  = [...this.Goodsmessages, ...data.list];//添加数据
				}catch(e){
					//TODO handle the exception
					// console.log(data);
					console.log(e);
					this.isNotification =true;
					return;
				}finally{
					this.isloading = false;
				}
					
			},
			//跳转详情页面
			async toGoodsMessage(code, index) {
				console.log("跳转");
				//参数获取
				let queryurl =  this.$u.utils.setQueryConfig("http://192.168.21.75:8081/icsaleout/ve/", {code});
				var params = {};
				//发送请求，请求数据
				let {data} = await this.$u.utils.fetch("get", queryurl, params, true);
				console.log(data);
				this.$u.route({
					type: "navigateTo",
					url: "pages/orderGoods/baseInfoGoods/baseInfoGoods",
					params: {
						Goodsmessages: JSON.stringify(data),
						isShowupload:true,
					}
				});

			}
		}
	}
</script>

<style lang="scss">
	.f-s-28{
		font-size: 28rpx;
		color: #999;
	}
	//页面样式
	.Goods-wrap {
		background-color: #F5F5F5;
	}

	.loading {}
    .notification{
		position: absolute;
		top:50%;
		left: 50%;
		transform: translateX(-40px) translateY(-40px);
		text{
			display: block;
			text-align: center;
			margin-top:20rpx ;
			color: #999;
		}
	}
	
	.tba {
		position: sticky;
		top: 0rpx;
		z-index: 1000;
	}
	.order-top {
		position: sticky;
		top: 80rpx;
		z-index: 1000;
	}
	.order-top {
		background-color: #F5F5F5;
		width: 100%;
		height: 68rpx;
		line-height: 68rpx;
		.client-color {
			width: 40%;
			text-align: left;
			margin-left: 10rpx;
			.color-test-blue {
				color: blue;
				font-style: normal;
			}
		}
	}
	.u-body-item {
		width: 100%;
		min-width: 40%;
		font-size: 32rpx;
		color: #333;
		.u-body-title-wrap {
			min-height: 182;
			flex: 1;
			overflow:hidden;
			.u-body-item-title {
				margin-top: 6rpx;
			}
		}
	}
	


	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin: 0 24rpx;
	}
</style>
