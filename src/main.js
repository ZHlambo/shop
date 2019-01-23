import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import utils from './lib/utils'

// Vue.config.productionTip = false
Vue.prototype.$utils = utils;

Vue.mixin({
  methods:{
    setData: function (obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          this[key] = obj[key];
        }
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
