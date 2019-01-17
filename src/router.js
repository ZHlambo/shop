import Vue from 'vue'
import Router from 'vue-router'
import MobileRouter from "./mobileRouter"
import PCRouter from "./pcRouter"

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...MobileRouter,
    ...PCRouter
  ]
})
