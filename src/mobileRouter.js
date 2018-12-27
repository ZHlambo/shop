import Layout from './views/mobile/Layout.vue'
import Home from './views/mobile/Home.vue'
import About from './views/mobile/About.vue'
// component: () => import(/* webpackChunkName: "about" */ './views/About.vue')

export default[
  {
    path: "/m/*",
    component: Layout,
    children: [
      {
        path: '/m/home',
        name: 'home',
        component: Home
      }, {
        path: '/m/about',
        name: 'about',
        component: About
      }, {
        path: '/m/*',
        redirect: "/m/home"
      }
    ]
  }
]
