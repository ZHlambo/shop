<template>
  <div class="home">
    <FilterView class="filters" :dataSource="filters"/>
    <CategoryList class="container" :dataSource="dataSource"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Popup from './components/Popup.vue'
import Tabs from './components/Tabs.vue'
import FilterView from './components/FilterView.vue'
import CategoryList from './common/CategoryList.vue'
import dataSource from "../../example/product.js"

export default {
  name: 'home',
  components: {
    Popup,
    Tabs,
    CategoryList,
    FilterView
  },
  data () {
    return {
      show: false,
      dataSource,
      filters: [
        {name:"点菜"},
        {name:"评论"},
        {name:"商家"},
      ]
    };
  },
  mounted () {
  }
}
</script>

<style lang="less" media="screen">
@import "../base.less";

.home {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.filters {
  border-bottom: @border;
}
.container {
  flex: 1;
}
</style>
