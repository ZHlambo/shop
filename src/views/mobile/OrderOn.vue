<template>
  <div class="">
    <ul class="skus">
      <li v-for="(item, skuIndex) in shoppingCar" :key="skuIndex">
        <img :src="item.img" width="80px" height="80px" alt="">
        <div class="info">
          <div> {{item.name}} </div>
          <div class="sub"> {{item.desc || "很好吃的哦"}} </div>
          <!-- <div> {{`月售${10} 赞${0}`}} </div> -->
          <div class="bottom">
            <span>￥ <span class="price">{{item.attrData.price.toFixed(2)}}</span></span>
            <div>
              <Add :sku="item" type="1"/>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Add from "./common/Add.vue";

export default {
  name: 'OrderOn',
  components: {
    Add
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapState({
      shoppingCar (state) {
        return state.shoppingCar;
      }
    })
  },
  mounted () {
  }
}
</script>

<style lang="less" media="screen">
@import "../base.less";

.skus {
  padding: @space-10;
  background: white;
  margin: @space-20 0;
  >li {
    display: flex;
    padding: @space-10 0;
    border-bottom: @border;
    &:last-child {
      border-bottom: 0;
    }
    img {
      border: @border;
      margin-right: @space-10;
    }
    .info {
      flex: 1;
      .sub {
        margin-top: @space-5;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: @fs-s;
        color: @theme-sub;
        margin-top: @space-10;
        .price {
          font-size: @fs-l;
        }
      }
    }
  }
}
</style>
