import Vue from 'vue'
import App from './App'
import store from '@/store/index';

// 此处为引用自定义顶部
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);

Vue.config.productionTip = false
App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);


const app = new Vue({
	store,
    ...App
})

//http拦截器
import httpinterceptor  from '@/common/http.interceptor.js'
Vue.use(httpinterceptor,app)
//API集中管理引入
import httpapi  from '@/common/http.api.js'
Vue.use(httpapi,app)
//自定义工具类
import utils  from '@/common/utils.js'
Vue.use(utils,app)

app.$mount()
