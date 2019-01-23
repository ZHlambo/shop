<template>
  <div class="carView" :class="{show: showPop}" @click="showPop = false">
    <ul class="skuList" @click.stop="">
      <li v-for="(sku, index) in shoppingCar" :key="index">
        <span>{{sku.name}}</span>
        <Add :value="sku.attrData.num" @input="e => input(e, sku)"/>
      </li>
    </ul>
    <div class="bottom" v-if="shoppingCar.length > 0" @click.stop="showPop = !showPop">
      <span class="price">￥{{total}}</span>
      <span class="orderon" @click.stop="toOrder">去结算</span>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import Add from "./Add.vue"

export default {
  name: "ShoppingCar",
  components: {
    Add
  },
  data () {
    return {
      total: 0,
      showPop: false,
    };
  },
  computed: mapState({
    shoppingCar: state => {
      return state.shoppingCar;
    },
  }),
  watch: {
    shoppingCar (e) {
      this.initData(e);
    }
  },
  mounted () {
    this.initData(this.shoppingCar);
  },
  methods: {
    ...mapActions([
      "changeCar"
    ]),
    initData (shoppingCar) {
      let total = 0;
      shoppingCar.map(item => {
        total += item.attrData.price * item.attrData.num;
      });
      if (shoppingCar.length == 0) {
        this.setData({showPop: false});
      }
      this.setData({total: total.toFixed(2)})
    },
    input (num, data) {
      if (num > 3) {
        data.attrData.num = 3;
        this.$utils.toast("数量达到上限");
        return ;
      }
      data.attrData.num = num;
      this.changeCar(data);
    },
    toOrder () {
      this.$router.push("/m/orderon");
    }
  }
}
</script>

<style scoped lang="less">
@import "../../base.less";

.carView {
  position: fixed;
  width: 100%;
  // height: @btn-height;
  bottom: 0;
  left: 0;

  &.show {
    height: 100%;
    background: rgba(0,0,0,.5);
    >.skuList {
      transform: translateY(0);
    }
  }
}

.skuList {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  padding-bottom: @btn-height;
  background: white;
  transform: translateY(100%);
  overflow: hidden;
  transition: transform ease .3s;
  >li {
    margin: @space-10;
    padding: @space-10 0;
    border-bottom: @border;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:last-child {
      border-bottom: 0;
    }
  }
}

.bottom {
  position: absolute;
  bottom: 0;
  height: @btn-height;
  line-height: @btn-height;
  width: 100%;
  background: rgba(0, 0, 0, .5);

  .price {
    font-size: @fs-xl;
    color: white;
    font-weight: bold;
    margin-left: 20px;
  }

  .orderon {
    position: absolute;
    bottom: 0;
    right: 0;
    display: inline-block;
    background: @theme;
    height: 100%;
    padding: 0 30px;
  }
}
</style>
