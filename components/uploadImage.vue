<template>
	<view class="upload_image">
		<view class="Good_body_upload u-m-t-20 new-border">
			<view class="Good_body_upload_left">
				上传图片
			</view>
			<view class="Good_body_upload_right">
				<u-upload ref="uUpload" 
				:action="action" 
				:auto-upload="false" 
				:show-tips="false" 
				:max-count="maxCount"
				:show-upload-list="false" 
				:custom-btn="true" 
				:file-list="fileList" 
				:form-data="formData" 
				:header="header"
				:show-progress="true" 
				:source-type="sourceType"
				:name="file" 
				:before-upload="beforeUpload" 
				@before-remove="beforeRemove" 
				@on-list-change="onListChange" 
				@on-success="onSuccess" 
				@on-error="uploadError"
				v-if="deletable"
				>
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
				</view>
				</u-upload>
			</view>
		</view>
		<view class="Good_body_preview">
			<view v-if="isShowTest" style="text-align: center;">暂无数据</view>
			<view class="imageuploaderList">
				<view class="imageuploader-emptytip u-m-l-30" v-for="(item, index) in lists" :key="index">
					<image class="pre-item-image" :src="item.url" mode="aspectFill" @click="previewImage(index)">
					</image>
					<view class="ErrorTest" v-show="item.error" @tap.stop="reUpload">上传失败，请重试</view>
					<view class="u-delete-icon" @tap.stop="deleteItem(index)" v-if="deletable">
						<u-icon name="close" size="20" color="#ffffff"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	let _this = {};
	export default {
		name: "uploadImage",
		props: {
			//是否预览
			previewFullImage: {
				type: Boolean,
				default: true
			},
			// 数量
			maxCount: {
				type: Number,
				default: 4,
			},
			//图片的大小
			maxSize: {
				type: Number,
				default: 128
			},
			//表单主键，
			cgeneralhid: {
				type: String,
			},
			//供应商名称
			ctrancustname:{
				type:String
			},
			//
			deletable:{
				type:Boolean,
				default:true,
			},
			//单号
			vbillcode: {
				type: String,
			},
			sourceType: {
				type: Array,
				default () {
					return ['album', 'camera'];
				}
			}
		},
		data() {
			return {
				fileList: [],
				lists: [],
				showUpload: false,
				action:'http://192.168.21.75:8083/ncinte/ncupload/',
				formData: {
					cgeneralhid: this.cgeneralhid,
					vbillcode: this.vbillcode,
				},
				file:'file',
			};
		},
		created() {
			_this = this;
		},
		mounted() {
			uni.$on("upload", this.upload)
		},
		destroyed(){
			uni.off("upload");
		},
		computed: {
			isShowTest() {
				return this.lists.length == 0 ? true : false;
			}
		},
		methods: {
			/**
			 * @param {Object} index
			 * @param {Object} list 
			 * 上传之前配置文件名
			 */
			async beforeUpload(index, list) {
				const {
					file
				} = list[index];
				//#ifdef H5
				const fileName = file.name;
				//#endif
				//#ifndef H5
				const fileName = file.path;
				//#endif
				// //唯一文件名
				const suffix = fileName.slice(fileName.lastIndexOf('.'));
				const upFileName = _this.$u.guid(20) + suffix;

				console.log(this.file);
				return true;
			},
			//成功执行的函数
			onSuccess(data, index, lists, name){
				uni.emit("detail",false)
				this.$u.toast("上传成功");
			},
			//失败执行函数
			uploadError(res,index,lists,currentIndex){
				this.$u.toast("上传失败");
			    console.log(res);
			},
			//选择图片
			onListChange(lists) {
				this.lists = lists;
				console.log(this.lists);
			},
			//移除图片
			deleteItem(index) {
				uni.showModal({
					title: '提示',
					content: '您确定要删除此项吗？',
					success: async (res) => {
						if(res.confirm){
							this.$refs.uUpload.remove(index);
						}
					}
				})
				
			},
			//预览图片
			previewImage(index) {
				if (!this.previewFullImage) return;
				const images = this.lists.map(item => item.url || item.path);
				uni.previewImage({
					urls: images,
					current: index,
					success: () => {
						console.log('选中了第' + (index) + '张图片');
					},
					fail: () => {
						uni.showToast({
							title: '预览图片失败',
							icon: 'none'
						});
					}
				});
			},
			reUpload(){
				this.$refs.uUpload.reUpload();
			},
			//提交上传图片
		    async upload() {
				console.log("点击上传");
				this.$refs.uUpload.upload();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Good_body_upload {
		height: 86rpx;
		display: flex;
		justify-content: space-around;
		background-color: white;
		position: relative;

		.Good_body_upload_left {
			line-height: 86rpx;
			margin-left: 10rpx;
		}

		.Good_body_upload_right {
			flex: 1;
			font-size: 16rpx;

			.slot-btn {
				position: absolute;
				top: ((82rpx-48rpx)/2);
				right: 10rpx;
			}
		}
	}

	.Good_body_preview {
		padding: 20rpx;

		.imageuploaderList {
			display: flex;
			flex-wrap: wrap;

			.pre-item-image {
				width: 100%;
				height: 140rpx;
			}

			.imageuploader-emptytip {
				width: 200rpx;
				position: relative;
                .ErrorTest{
				 position: absolute;
				 bottom: 0;
				 width:100%;
				 font-size: 24rpx;
				 text-align: center;
				 background-color: red;
				 color: white;
				}
				.u-delete-icon {
					position: absolute;
					top: 10rpx;
					right: 10rpx;
					z-index: 10;
					background-color: $u-type-error;
					border-radius: 100rpx;
					width: 44rpx;
					height: 44rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}

		}

	}
</style>
