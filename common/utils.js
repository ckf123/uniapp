const install = (Vue, vm) => {
    //判断是否登录
	const isLogin = () => {
		const token = vm.vuex_token;
		const currentpage = getCurrentPages().pop();//获取上一个页面
		console.log("上一个页面", currentpage.route);
		//缓存页面
		uni.setStorageSync('back_url', currentpage.route);
		console.log("成功");

		if (!token) {
			vm.$u.toast("请登录");
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url: 'pages/auth/login'
				})
			}, 1500)
			return false
		}
		return true
	};
	const Barcoded = (successCallBack, errorCallBack)=>{
		 wx.scanCode({
			onlyFromCamera: true,
			scanType: ["qrCode", "barCode"],
		 	success:function(res) {
		 		 var result = res.result;
				 if(successCallBack){
					 successCallBack.call(this, result);
				 }else {
                    console.log(result);
                }
		 	},
			fail(err) {
				if (errorCallBack) {
				    errorCallBack.call(this, err);
				} else {
				    console.error(err);
				}
			}
		 })
	}
	const getTime = () => {
			var date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
				minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
				second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
			return timer;
		}
	const fetch = function fetch (method, url, data, loading){
      return new Promise((resolve, reject) => {
      //显示加载动画
      // if (loading) vm.$u.showLoading();
      
      //获取token
      // let token = wx.getStorageSync("token")
      
      // let obj = { token, }
      
      //添加token
      // Object.assign(data,obj);
  
      //发起请求
	  console.log("发起请求");
	  console.log(method,url,data);
      uni.request({
          url,
          method,
          data,
          header: {
              // 数据被编码为名称/值对
              //"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          },
          success: res => {
              let code = res.data.code;
              let message = res.data.message
              //统一处理返回值
              switch (code) {
                  case 200 :
				      console.log(res);
                      resolve(res.data)
                      break
                  case 403 :
                      utils.showToast('您的账号已离线，请重新登录')
                      utils.goLogin()
                      break;
                  case 423 :
                      utils.showToast('账号异地登录，请重新登录')
                      utils.goLogin()
                      break
			      case 401 :
			          console.log("未授权")
			          break
				  case 500 :
				  vm.$u.toast("无数据")
				      console.log("无数据");
				      break
                  default:
              }
          },
          fail: err => {
			 reject(err); 
          },
          complete: () => {
			  console.log("complete");
              //结束加载动画
              // if (loading) utils.hideLoading()
          }
      });
  })
}
        const setQueryConfig = function(str,queryConfig){
			var _str = str;
			for(var o in queryConfig){
				_str +=  queryConfig[o] + "/";
			}
			return _str;
		}
		vm.$u.utils = {
			isLogin,
			getTime,
			Barcoded,
			fetch,
			setQueryConfig,
		}
}

export default {
	install
}
