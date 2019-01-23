import Layout from './views/mobile/Layout.vue'
import Home from './views/mobile/Home.vue'
import About from './views/mobile/About.vue'
import Login from './views/mobile/Login.vue'
import OrderOn from './views/mobile/OrderOn.vue'
// component: () => import(/* webpackChunkName: "about" */ './views/About.vue')

export default[
  {
    path: '/m/login',
    name: 'login',
    component: Login
  }, {
    path: "/m/*",
    component: Layout,
    children: [
      {
        path: '/m/home',
        name: '首页',
        component: Home
      }, {
        path: '/m/about',
        name: '关于',
        component: About
      }, {
        path: '/m/orderon',
        name: '确认订单',
        component: OrderOn
      }, {
        path: '/m/*',
        redirect: "/m/home"
      }
    ]
  }
]
