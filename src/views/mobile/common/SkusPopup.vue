<template>
  <Popup :value="value" @input="$emit('input')" type="dialog" :title="skus.name">
    <div class="body" v-if="skus.length">
      <div class="header"> {{skus[0].name}} </div>
      <div class="tip"> 规格： </div>
      <ul class="attrs">
        <li v-for="(sku, index) in skus" :key="index" :class="{active: selected.attrData.name === sku.attrData.name}" @click="selected = sku">{{sku.attrData.name}}</li>
      </ul>
      <div class="bottom">
        <span>
          <span class="price">
            ￥<span>{{Number(selected.attrData.price).toFixed(2)}} </span>
          </span>
          <span class="attrName">({{selected.attrData.name}})</span>
        </span>
        <Add :sku="selected" />
      </div>
    </div>
  </Popup>
</template>

<script>
import {mapState} from "vuex";
import Popup from "../components/Popup.vue";
import Add from "./Add.vue";

export default {
  name: 'SkusPopup',
  components: {
    Popup,
    Add
  },
  props: [ 'value', 'skus', 'card', 'placeholder', 'maxlength' ],
  data () {
    return {
      selected: {},
      dataSource: [],
    }
  },
  computed: mapState({
    shoppingCar: state => {
      return state.shoppingCar;
    },
  }),
  watch: {
    value (value) {
      if (value) {
        this.setData({selected: this.skus[0]})
      }
      return value;
    },
    shoppingCar (shoppingCar) {
      this.setData({selected: Object.assign({}, this.selected)});
      return shoppingCar;
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../base.less";
.body {
  padding-top: 10px;
}
.header {
  text-align: center;
  font-size: @fs-l;
  font-weight: bold;
}

.tip {
  margin-top: 20px;
  padding: 0 20px;
}
.attrs {
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  >li {
    text-align: center;
    margin-top: 10px;
    margin-right: 10px;
    border: @border;
    min-width: 80px;
    padding: 5px 0;
    font-size: @fs-s;
    &.active {
      border-color: @theme-sub;
      background: @theme-bg;
      color: @theme-sub;
    }
  }
}
.bottom {
  margin-top: 40px;
  border-top: @border;
  background: #f5f5f5;
  padding: 10px 20px;
  border-radius: 0 0 @radius @radius;
  display: flex;
  justify-content: space-between;
  .price {
    color: @color-red;
    font-size: @fs-xs;
    >span {
      font-size: @fs-xl;
    }
  }
  .attrName {
    font-size: @fs-xs;
  }
}
</style>
