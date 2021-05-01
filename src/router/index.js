import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "fbSearch"
    },
    {
      path: '/fbSearch',
      name: 'fbSearch',
      component: () => import('@/view/fbSearch/fbSearch'),
      meta: {
        title: "斐波那契数列查询"
      }
    }

  ]
})
