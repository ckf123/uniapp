module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			"port": 8080,
			disableHostCheck: true, // 可选
			proxy: {
				//配置代理
				"/CrLogin/": {
					target: "http://192.168.22.75:8082/CrLogin/", // 目标接口域名,启动不同环境切换不同域名
					changeOrigin: true, // 是否跨域
					ws: true, // websocket支持
					secure: false, // false为http访问，true为https访问
				},
				"/icsaleout/ct":{
					target: "http://192.168.21.75:8081/", // 目标接口域名,启动不同环境切换不同域名
					changeOrigin: true, // 是否跨域
					ws: true, // websocket支持
					secure: false, // false为http访问，true为https访问
					// pathRewrite:{
					// 	'/icsaleout/ct/':''
					// }
				},
				"/icsaleout/ve/":{
					target: "http://192.168.22.150:8081/icsaleout/ve/", // 目标接口域名,启动不同环境切换不同域名
					changeOrigin: true, // 是否跨域
					ws: true, // websocket支持
					secure: false, // false为http访问，true为https访问
					pathRewrite:{
						'/icsaleout/ve/':''
					}
				},
				"/ncinte/ncupload":{
					target: "http://192.168.21.75:8083/ncinte/ncupload", // 目标接口域名,启动不同环境切换不同域名
					changeOrigin: true, // 是否跨域
					ws: true, // websocket支持
					secure: false, // false为http访问，true为https访问
					pathRewrite:{
						'/ncinte/ncupload/':''
					}
				},
			},
		}
	}
}
