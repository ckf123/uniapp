<template>
	<view>
        <cu-custom bgColor="bg-gradual-green" :isBack="false">
         	<block slot="content">消息</block>
        </cu-custom>
		<view class="search_wrap">
			<u-search 
			placeholder="搜索" 
			shape="square" 
			:show-action="false" 
			:clearabled="true" 
			class="search" 
			input-align="left" 
			bg-color="#fff" 
			border-color="#8b8b8b"
			margin="0 15rpx"			
			v-model="result"></u-search>
		</view>
		<view class="cell_wrap">
			<u-cell-group>
				<u-cell-item icon="chat" title="公告" ></u-cell-item>
				<u-cell-item icon="integral-fill" title="预警" value="新版本"></u-cell-item>
				<u-cell-item icon="integral-fill" title="消息" value="新版本"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					'background-image': 'white'
				},
				barcode1: null,
				isFlash: false,
				isShow: false,
				result: '',
				keyword: '',

			}
		},
		onLoad() {
		},
		mounted() {
			
		},

		methods: {
			

		}
	}
</script>

<style lang="scss">
	.status_bar {
		height: 50px;
		width: 100%;
	}

	.navbar-right {
		margin-right: 24rpx;
		icon {
			font-size: 36rpx;
		}
	}

	.search_wrap {
		background-color: #ededed;
		padding:15rpx 0;
	}
	.search {
		
	}
</style>
