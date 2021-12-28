// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
const install = (Vue, vm) => {
	//首页
	let index = (params = {}) => vm.$u.get(indexUrl,params);//首页
	//认证
	let authlogin = (params={}) => vm.$u.get("/CrLogin/"+ params.tel);//溜溜果园登录
	// let authlogin = (params = {}) => vm.$u.post('/api/auth/login', params);//融城app登录
	let authRegister = (params = {}) => vm.$u.post('/api/auth/register',params);//融城app注册
	//用户
	let userInfo = () => vm.$u.get('/api/user');//用户信息

	//承运商编码获取出库单 
	let icsaLeoutCt = (code) => vm.$u.get('/icsaleout/ct/'+code);
	let icsaLeoutVe = (params) => vm.$u.get('/icsaleout/ve/'+params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {index,authlogin,authRegister,userInfo,icsaLeoutCt,icsaLeoutVe };
}

export default {
	install
}