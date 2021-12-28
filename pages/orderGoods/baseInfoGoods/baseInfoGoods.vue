<template>
	<view class="base_info">
		<view class="Good_top_wrap">
			<view class="Good_top_body">
				<text decode="true">客户名称 | {{Goodsmessages.customername}}</text>
				<text decode="true">出库状态&nbsp&nbsp&nbsp&nbsp| {{Goodsmessages.saleoutItemList[0].bwastageflag}}</text>
				<text decode="true">出库编号&nbsp&nbsp&nbsp&nbsp| {{Goodsmessages.vbillcode}}</text>
			</view>
		</view>
		<view class="Good_nav_wrap u-m-b-40">
			  <u-tabs 
			  height="80" 
			  :list="navlist" 
			  :is-scroll="false" 
			   bar-height="6" 
			   bar-width="80" 
			  :current="current" 
			  :bold="false" 
			  @change="change"></u-tabs>
		</view>
		<view class="Good_body_wrap">
			<view class="Good_body_item new-border" v-for="(saleoutItemList,index) in saleoutItemLists" :key="index">
				<view class="Good_body_item_left">
					<view class="good good_name">
						<text class="u-line-1" >{{saleoutItemList.mtName}}</text>
					</view>
					<!-- <text class="good good_mtCode">{{saleoutItemList.mtCode}}</text> -->
					<view class="good good_materialspec">
						<text class=" u-line-1">{{saleoutItemList.materialspec ? saleoutItemList.materialspec : "无"}}</text>
						<view class="good_tip">{{saleoutItemList.materialspec ? saleoutItemList.materialspec : "无"}}</view>
					</view>
					<view class="good num">
						<text class="">{{saleoutItemList.nassistnum}}{{saleoutItemList.mdName}}</text>
					</view>
				</view>
				<!-- <view class="Good_body_item_right">
					
				</view> -->
			</view>
			<u-divider height="80" half-width="250" v-show="saleoutItemLists.length>10">没有更多了</u-divider>
		</view>
		<uploadImage v-if="isShowupload" :maxCount="100" :maxSize="5*1024*1024"  :deletable="isShowupload" :cgeneralhid='Goodsmessages.cgeneralhid' :vbillcode="Goodsmessages.vbillcode" :ctrancustname='Goodsmessages.ctrancustname'></uploadImage>
	    <view  class="Good_body_sign" v-if="isShowupload">
			<text class="Good_body_sign_text" @click="submit" >签收</text>
		</view>
	</view>
</template>

<script>
	import uploadImage from "../../../components/uploadImage.vue"
	export default {
        components:{
			uploadImage
		},
		data() {
			return {
				navlist: [{
					name: '商品信息'
				}],
				current: 0,
				Goodsmessages:"",
				saleoutItemLists:"",
				isShowupload:"",
			}
		},
		onInit() {
			uni.on("detail");
		},
		onLoad(params) {
			console.log(params);
			this.Goodsmessages = JSON.parse(params.Goodsmessages);
			this.saleoutItemLists = this.Goodsmessages.saleoutItemList;
			this.isShowupload =  params.isShowupload || false;//是否显示签收
			console.log(this.isShowupload);
		},
		onUnload(){
			uni.$off("detail");	
		},
		computed:{
		  isShowUpload(){
			  
		  }
		},
		methods: {
			change(index) {
				this.current = index;
			},
			detail(isShowUpload){
				this.isShowUpload= isShowUpload;
			},
			submit(){
				if(this.isShowUpload){
					uni.$emit("upload");
				}
				
			}
		}
	}
</script>

<style lang="scss">

	.base_info{
		background-color: #f5f5f5;
		height: 100%;
		width: 100%;
	}
	.Good_top_wrap{
		width:100%;
		height:220rpx;
		background-color: #409EFF;
		color:white;
		font-size:28rpx;
		.Good_top_body{
			padding-top:20rpx;
			padding-left:40rpx;
			text{
				display:block;
				margin:15rpx 0 0 ;
				padding:0 0 14rpx;
			}
		}
	}
	.Good_body_wrap{
		.Good_body_item{
			background-color: #fff;
			.good{
				margin:15rpx 15rpx  15rpx 0;
			}
		.Good_body_item_left,.Good_body_item_right{
			display:grid;
			 grid-template-columns: 50% 30% 20%;
			.good_materialspec{		
				position: relative;
				.good_tip{
					display: none;
					position: absolute;
					top: 0;
					box-shadow: 0px 0px 1px #409EFF;
				}
				.good_tip:before{
					content:"";
					position: absolute;
					top: 100%;
					left: 50%;
					transform: translateX(-15rpx);
					width:0;
					height: 0;
					border: 15rpx solid transparent;
					border-top-color: #409EFF ;
				}
				.good_tip::after{
					content:"";
					position: absolute;
					top: 100%;
					left: 50%;
					transform: translateX(-15rpx);
					width:0;
					height: 0;
					border: 15rpx solid transparent;
					border-top-color: white ;
				}
				
			}
		}
		
		}
	}
	
	.Good_body_sign{
		width:100%;
		height:100rpx;
		line-height:100rpx;
		position: fixed;
		bottom:0;
		background-color: white;
		text-align:center;
		margin-top:10rpx;
		border-top: 10rpx solid #f5f5f5;
		z-index: 15;
	}
	
	


</style>
