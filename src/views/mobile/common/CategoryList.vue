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
                <span v-if="item.length !== 1" class="skusBtn">
                  <span v-if="item.reduce((total, e) => total + e.attrData.num, 0)">{{item.reduce((total, e) => total + e.attrData.num, 0)}}</span>
                  <button class="btn" @click="skus = item;showPop = true;">选择规格</button>
                </span>
                <div v-else>
                  <Add :sku="item[0]" type="1"/>
                </div>
              </div>
            </div>
          </li>
        </li>
      </ul>
    </div>
    <SkusPopup v-model="showPop" :skus="skus" @input="showPop = false"/>
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
              sku.id = sku.name + sku.attrData.name;
              if (e.id === sku.id) {
                sku.attrData.num = e.attrData.num;
              }
            });
            sku.attrData.num = sku.attrData.num || 0;
          })
        })
      })
      return data;
    },
    shoppingCar (shoppingCar) {
      let has = false;
      this.data.forEach(item => {
        item.children.forEach(skus => {
          skus.forEach((sku, index) => {
            has = false;
            for (let i = 0; i < shoppingCar.length; i++) {
              if (shoppingCar[i].id === sku.id) {
                has = true;
                if (sku.attrData.num != shoppingCar[i].attrData.num) {
                  sku.attrData.num = shoppingCar[i].attrData.num;
                  skus[index] = Object.assign({}, sku);
                }
              }
            }
            if (!has) {
              sku.attrData.num = 0
              skus[index] = Object.assign({}, sku);
            }
          })
        })
      })
      this.setData({
        data: [].concat(this.data)
      })
      return shoppingCar;
    }
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
          .skusBtn {
            position: relative;
            >span {
              position: absolute;
              top: -4px;
              right: -4px;
              background: red;
              color: white;
              border-radius: 50%;
              width: 16px;
              height: 16px;
              font-size: @fs-s;
              text-align: center;
            }
          }
        }
      }
    }
  }
}

</style>
