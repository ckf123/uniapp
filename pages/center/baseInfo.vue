<template>
	<view>
		<u-cell-group>
				<u-cell-item icon="account-fill" title="头像" :arrow="false">
					   <u-avatar slot="right-icon" class="img" :src="vuex_user.avatar_url"></u-avatar>
				</u-cell-item>
				
				<u-cell-item icon="man-add" title="供应商编码" :value="vuex_user.code" :arrow="false"></u-cell-item>
				<u-cell-item icon="man-add" title="供应商名称" :value="vuex_user.name" :arrow="false"></u-cell-item>
				<!-- <u-cell-item icon="man-add" title="供应商分类" :value="vuex_user.data.fl" :arrow="false"></u-cell-item> -->
				<u-cell-item icon="phone" title="手机号" :value="vuex_user.tel" :arrow="false"></u-cell-item>
				<!-- <u-cell-item icon="phone" title="" value="安徽战区" :arrow="false"></u-cell-item> -->
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList:[{
					url:'https://oss.shop.eduwork.cn/uhglnKXcjuxtxTn4nkwY.jpg'
				}]
			}
		},
		created() {
			this.$u.utils.isLogin();
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
</style>
