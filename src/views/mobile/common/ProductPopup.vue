<template>
  <Popup :value="value" @input="$emit('input')" type="dialog" :title="product.name">
    <div class="body">
      <div class="header"> {{product.name}} </div>
      <div class="tip"> 规格： </div>
      <ul class="attrs">
        <li v-for="(attr, index) in product.attr" :key="index" :class="{active: selected.name === attr.name}" @click="selected = attr">{{attr.name}}</li>
      </ul>
      <div class="bottom">
        <span>
          <span class="price">
            ￥<span>{{Number(selected.price).toFixed(2)}} </span>
          </span>
          <span class="attrName">({{selected.name}})</span>
        </span>
        <Add :value="selected.num" @input="input"/>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from "../components/Popup.vue";
import Add from "./Add.vue";

export default {
  name: 'ProductPopup',
  components: {
    Popup,
    Add
  },
  props: [ 'value', 'product', 'card', 'placeholder', 'maxlength' ],
  data () {
    return {
      selected: {},
      dataSource: [],
    }
  },
  watch: {
    value (value) {
      if (value) {
        this.setData({selected: this.product.attr[0]})
      }
      return value;
    },
  },
  methods: {
    input (num) {
      let {selected, product} = this;
      selected.num = num;
      this.setData({selected: Object.assign({}, selected)});
      product.attr.forEach(item => {
        if (item.name === selected.name) {
          item.num = num
        }
      });
      this.$emit("update:product", product);
    },
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
