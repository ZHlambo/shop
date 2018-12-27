<template>
  <div class="home">
    <CategoryList :dataSource="dataSource"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Popup from './components/Popup.vue'
import Tabs from './components/Tabs.vue'
import CategoryList from './common/CategoryList.vue'
import dataSource from "@/example/product.js"

export default {
  name: 'home',
  components: {
    Popup,
    Tabs,
    CategoryList
  },
  data () {
    return {
      show: false,
      dataSource,
    };
  },
  mounted () {
  }
}
</script>

<style media="screen">
  .home {
    height: 100%;
  }
</style>
