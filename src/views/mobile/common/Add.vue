<template>
  <div class="">
     <div v-if="sku.attrData.num" class="addNum">
       <span class="reduce circle" @click="changeCar({sku, num: sku.attrData.num - 1})">－</span>
       <span class="circle">{{sku.attrData.num}}</span>
       <span class="btn circle" @click="changeCar({sku, num: sku.attrData.num + 1})">＋</span>
     </div>
     <div v-else-if="type == 0" class="btn addCar" @click="changeCar({sku, num: sku.attrData.num + 1})">
       ＋ 加入购物车
     </div>
     <div v-else-if="type == 1" class="btn circle" @click="changeCar({sku, num: sku.attrData.num + 1})">
       <span>＋</span>
     </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: "0"
    },
    sku: {
      type: Object,
    }
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      "changeCar"
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../base.less";

.addNum {
  color: #333;
}

.circle {
  font-size: @fs-n;
  display: inline-block;
  text-align: center;
  width: 20px;
  height: 20px;
  line-height: 20px;
  padding: 0;
  font-weight: 900;
  border: @border;
  border-radius: 50%;
  &.reduce {
    background: white;
  }
  &:nth-child(2) {
    border: 0;
    min-width: 30px;
  }
  &.btn {
    border-color: @theme;
  }
}

.addCar {
  border-radius: 22px;
  line-height: 22px;
  height: 22px;
  padding: 0 10px;
  font-size: @fs-s;
  font-weight: 900;
  color: #333;
}
.addCar1 {
  font-size: @fs-n;
  >span {
    color: #333;
    display: inline-block;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-weight: 900;
    border: @border;
    border-radius: 50%;
    background: @theme;
    border-color: @theme;
  }
}
</style>
