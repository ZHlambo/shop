<template>
  <div class="categoryList">
    <ul class="left">
      <li v-for="(data, index) in dataSource" :key="index" :class="{active: current === index}" @click="clickItem(index)">{{data.name}}</li>
    </ul>
    <div class="right" ref="right">
      <ul v-for="(data, index) in dataSource" :key="index">
        <li :ref="`right${index}`">
          <h3>
            {{data.name}}
          </h3>
          <li v-for="(item, index) in data.children" :key="index" class="product">
            <img :src="item.img" width="80px" height="80px" alt="">
            <div class="info">
              <div>
                {{item.name}}
              </div>
              <div class="bottom">
                ￥ <span class="price">{{item.price.toFixed(2)}}</span> 起
                <span class="btn">选择规格</span>
              </div>
            </div>
          </li>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CategoryList',
  props: ["dataSource"],
  data () {
    return {
      current: 0,
    }
  },
  watch: {
    dataSource (dataSource) {
      return dataSource;
    }
  },
  methods: {
    clickItem (index) {
      this.current = index;
      console.log(this.$refs[`right${index}`]);

    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
@import "../../base.less";

.categoryList {
  display: flex;
  height: 100%;
  .left {
    height: 100%;
    min-width: 100px;
    overflow: auto;
    background: @color-dd;
    >li {
      padding: @space-10;
    }
    .active {
      background: white;
      color: @theme;
    }
  }
  >.right {
    flex: 1;
    padding: 0 @space-10;
    height: 100%;
    overflow: auto;
    h3 {
      margin: @space-10 0;
      padding: @space-10 0;
      border-bottom: @border;
      border-bottom-style: dashed;
    }
    .product {
      display: flex;
      margin-bottom: @space-10;
      img {
        border: @border;
        margin-right: @space-10;
      }
      .info {
        flex: 1;
        .bottom {
          font-size: @fs-s;
          color: @theme;
          margin-top: @space-10;
          .price {
            font-size: @fs-l;
          }
          .btn {
            float: right;
          }
        }
      }
    }
  }
}

</style>
