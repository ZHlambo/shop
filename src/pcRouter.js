import Layout from './views/pc/Layout.vue'
import Home from './views/pc/Home.vue'
import About from './views/pc/About.vue'
// component: () => import(/* webpackChunkName: "about" */ './views/About.vue')

export default[
  {
    path: "/*",
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home
      }, {
        path: '/about',
        name: 'about',
        component: About
      }, {
        path: '/*',
        redirect: "/home"
      }
    ]
  }
]
