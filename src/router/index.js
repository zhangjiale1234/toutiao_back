import Vue from 'vue'

// 引入路由
import VueRouter from 'vue-router'
// 引入组件
import Login from '@/pages/login.vue'
import Index from '@/pages/index.vue'
import Welcome from '@/components/welcome.vue'
import postList from '@/pages/postList.vue'
import editPost from '@/pages/editPosts.vue'
// 使用
Vue.use(VueRouter)

// 配置
const router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Index',
      path: '/',
      component: Index,
      redirect: '/welcome',
      children: [
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'postList',
          path: 'postList',
          component: postList
        },
        {
          name: 'editPost',
          path: 'editPost',
          component: editPost
        }
      ]
    }
  ]
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  console.log(to)
  //   // to and from are Route Object,next() must be called to resolve the hook}
  let token = localStorage.getItem('successLogin_back')
  if (token || to.path === '/login') {
    console.log(1)
    // 判断是否有token和是否去登录页面，如果是去登录页面，就可以去
    next()
  } else {
  //   //   // 否则就直接重定向到登录页面
    next('/login')
  }
})
// 暴露
export default router
