import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.scss'
import axios from 'axios'
import { VueJsonp } from 'vue-jsonp' // 网上很多博客引用不加{}，会报错

Vue.use(VueJsonp)
Vue.prototype.information = new Vue()
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')