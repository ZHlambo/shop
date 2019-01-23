<template>
  <div class="categoryList">
    <ul class="left">
      <li v-for="(data, index) in data" :key="index" :class="{active: current === index}" @click="clickItem(index)">{{data.name}}</li>
    </ul>
    <div class="right" ref="right">
      <ul v-for="(data, index) in data" :key="index">
        <li :ref="`right${index}`">
          <h3>
            {{data.name}}
          </h3>
          <li v-for="(item, skuIndex) in data.children" :key="skuIndex" class="sku">
            <img :src="item.img" width="80px" height="80px" alt="">
            <div class="info">
              <div> {{item[0].name}} </div>
              <div class="sub"> {{item[0].desc || "很好吃的哦"}} </div>
              <!-- <div> {{`月售${10} 赞${0}`}} </div> -->
              <div class="bottom">
                <span>￥ <span class="price">{{item[0].price.toFixed(2)}}</span> 起</span>
                <button v-if="item.length !== 1" class="btn" @click="skus = item;showPop = true;">选择规格</button>
                <div v-else>
                  <Add :value="item[0].attrData.num" @input="e => input(e, item[0])" type="1"/>
                </div>
              </div>
            </div>
          </li>
        </li>
      </ul>
    </div>
    <SkusPopup v-model="showPop" :skus="skus" @change="e => input(e.attrData.num, e)" @input="showPop = false" :shoppingCar.sync="shoppingCar"/>
    <ShoppingCar/>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import SkusPopup from "./SkusPopup.vue";
import ShoppingCar from "./ShoppingCar.vue";
import Add from "./Add.vue";

export default {
  name: 'CategoryList',
  components: {
    SkusPopup,
    Add,
    ShoppingCar
  },
  props: ["dataSource"],
  data () {
    return {
      current: 0,
      showPop: false,
      skus: [],
      data: [],
    }
  },
  computed: mapState({
    shoppingCar: state => {
      return state.shoppingCar;
    },
  }),
  watch: {
    dataSource (dataSource) {
      this.setData({data: dataSource});
      return dataSource;
    },
    data (data) {
      data.forEach(item => {
        item.children.forEach(skus => {
          skus.forEach(sku => {
            this.shoppingCar.forEach(e => {
              if (e.id === sku.name + sku.attrData.name) {
                sku.attrData.num = e.attrData.num;
              }
            });
            sku.attrData.num = sku.attrData.num || 0;
          })
        })
      })
      return data;
    },
  },
  mounted () {
    this.setData({data: this.dataSource});
  },
  methods: {
    ...mapActions([
      "changeCar"
    ]),
    clickItem (index) {
      this.current = index;
      this.$refs.right.scrollTo(0, this.$refs[`right${index}`][0].offsetTop);
    },
    input (num, data) {
      if (num > 3) {
        data.attrData.num = 3;
        this.$utils.toast("数量达到上限");
        return ;
      }
      data.attrData.num = num;
      this.changeCar(data);
      this.data = [].concat(this.data)
    },
  },
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
    padding-bottom: 50px;
    overflow: auto;
    background: #eee;
    >li {
      padding: @space-10;
    }
    .active {
      background: white;
      color: @theme-sub;
    }
  }
  >.right {
    flex: 1;
    padding: 0 @space-10;
    padding-bottom: 50px;
    height: 100%;
    overflow: auto;
    position: relative;
    h3 {
      margin: @space-10 0;
      padding: @space-10 0;
      border-bottom: @border;
      border-bottom-style: dashed;
    }
    .sku {
      display: flex;
      margin-bottom: @space-10;
      img {
        border: @border;
        margin-right: @space-10;
      }
      .info {
        flex: 1;
        .sub {
          margin-top: @space-5;
          color: @color-99;
          font-size: @fs-s;
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
          .btn {
            float: right;
          }
        }
      }
    }
  }
}

</style>
