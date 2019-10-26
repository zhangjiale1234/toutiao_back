import Vue from 'vue'
import App from './App.vue'
// 引入全局样式
import '@/style/index.less'
import '@/style/reset.less'
import '@/style/style.css'
// 引入elementul
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import router from '@/router/index.js'
import 'quill/dist/quill.snow.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
