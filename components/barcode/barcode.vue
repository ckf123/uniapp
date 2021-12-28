<template>
	<view>
		<view class="barcode" v-if="isShow">
			<icon @click="openFlash" class="iconfont icon-shoudiantongkai"></icon>
			<icon @click="cancelScan" class="iconfont icon-guanbixiao"></icon>
			<icon @click="getPicture()" class="iconfont icon-xiangce" v-if="isPicture"></icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: "barcode",
		props: {
			BarcodeStyles: {
				type: Object,
				default:function() {
					return{
						frameColor: "#55aa00",
						scanbarColor: "#55aa00",
						top: '0px',
						left: '0px',
						width: '100%',
						height: '80%',
						position: 'static',
					}
				},
				required: false,
			},
			isPicture: {
				type: Boolean,
				default: false,
				required: false,
			},
		},
		data() {
			return {
				barcode1: null,
				isShow: false,
				isFlash: false,
				result:null,
				currentWebview:""
			};
		},
		beforeCreate() {
			
		},//实例初始化后调用
		beforeMount() {
			
		},//挂在开始之前
		mounted() {
			
		},//实例挂载后无法确定子组件挂载完成
		beforeUpdate() {
			
		},//数据DOM渲染之前
		updated() {
			
		},//数据DOM渲染完成
		beforeDestroy() {
			
		},//被销毁之前
		destroyed() {
			uni.$off('startScan')
		},//实例销毁
		created() {	
			uni.$on('startScan', this.startScan);
		},//实例创建完成
		methods: {
			//#ifdef APP-PLUS
			onmarked(type, result, file, charset) {
				console.log(type);
				var text = '未知: ';
				switch(type){
						case plus.barcode.QR:
						text = 'QR: ';
						break;
						case plus.barcode.EAN13:
						text = 'EAN13: ';
						break;
						case plus.barcode.EAN8:
						text = 'EAN8: ';
						break;
					};
				this.result = result.replace(/\n/g, "");
				uni.$emit("getBarcodeResult",this.result);
				// this.$u.toast(text + this.result);
				console.log(text + this.result)
				console.log("文件路径"+file);
				console.log("字符编码"+charset);
				this.cancelScan();//成功后关闭
			},
			//错误回调
			onerror(error) {
				var code = error.code; // 错误编码
				var message = error.message; //错误信息
				console.log('code' + code + 'message' + message);
			},
			//创建
			startRecognize() {
				if (!this.barcode1) {
					this.currentWebview = this.$mp.page.$getAppWebview();
					//创建扫码控件
					this.barcode1 = plus.barcode.create('barcode', [plus.barcode.QR,plus.barcode.EAN13], this.BarcodeStyles, true);
					this.barcode1.onmarked = this.onmarked;
					this.barcode1.onerror = this.onerror;
					this.currentWebview.append(this.barcode1);
				};
			},
			//开始扫描
			startScan() {
				this.startRecognize(); //创建控件
				setTimeout(() => {
					this.isShow = !this.isShow;
					var Option = {
						conserve: true,
						filename: this.$u.utils.getTime(),
						vibrate: true,
					};
					this.barcode1.start(Option); //启动
				}, 2000)
			},
			//关闭扫描  关闭条码识别控件
			cancelScan() {
				if(this.barcode1){
					console.log("关闭扫描");
					this.barcode1.cancel();
					// this.barcode1.close();
					// this.barcode1=null;
					this.isShow = !this.isShow;
				}else{
					console.log("无法关闭");
				}
			},
			//开启闪光灯
			openFlash() {
				console.log("控制闪光灯");
				if (!this.findBarcode("barcode")) return;
				this.isFlash = !this.isFlash;
				this.barcode1.setFlash(!this.isFlash);
			},
			//查询扫码的控件
			// 查找扫码控件
			findBarcode(name) {
				return plus.barcode.getBarcodeById(name);
			},
			//获取系统相册
			getPicture() {
				var lfs = null;
				plus.gallery.pick(e => {
					console.log("打开相册");
					for (var i in e.files) {
						lfs = e.files;
						plus.barcode.scan(e.files[i], this.onmarked, this.onerror, this.filter, true)
						console.log(e.files[i]);
					}
				}, (e) => {
					console.log("取消选择");
				}, {
					filter: "image", //设置可选格式
					multiple: true, //是否支持多选
					maximum: 3, //最大多选多少张
					system: false, //已废弃
					onmaxed: function() {
						plus.nativeUI.alert("最多只能选择" + this.maximum + "张图片");
					}, //超过最多选择图片数量事件
					selected: lfs
				})
			},
			// #endif
		},
		
	}
</script>

<style lang="scss">
	.barcode {
		width: 100%;
		height: 140rpx;
		position: absolute;
		display: flex;
		justify-content: space-around;
		bottom: 0;
		z-index: 10;
		iconfont {
			font-size: 68rpx;
		}

	}
</style>
