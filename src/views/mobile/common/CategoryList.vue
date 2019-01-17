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
          <li v-for="(item, productIndex) in data.children" :key="productIndex" class="product">
            <img :src="item.img" width="80px" height="80px" alt="">
            <div class="info">
              <div> {{item.name}} </div>
              <div class="sub"> {{item.desc || "很好吃的哦"}} </div>
              <!-- <div> {{`月售${10} 赞${0}`}} </div> -->
              <div class="bottom">
                <span>￥ <span class="price">{{item.price.toFixed(2)}}</span> 起</span>
                <button v-if="item.attr.length !== 1" class="btn" @click="showPop = true;product = item">选择规格</button>
                <div v-else>
                  <Add :value="item.attr[0].num" @input="e => input(e, item)" type="1"/>
                </div>
              </div>
            </div>
          </li>
        </li>
      </ul>
    </div>
    <ProductPopup v-model="showPop" :product.sync="product" @input="close" :card.sync="card"/>
  </div>
</template>

<script>
import ProductPopup from "./ProductPopup.vue";
import Add from "./Add.vue";

export default {
  name: 'CategoryList',
  components: {
    ProductPopup,
    Add
  },
  props: ["dataSource"],
  data () {
    return {
      current: 0,
      showPop: false,
      product: {},
      data: [],
      card: [],
    }
  },
  watch: {
    data (data) {
      data.forEach(item => {
        item.children.forEach(e => {
          e.attr.forEach(attr => {
            attr.num = attr.num || 0;
          })
        })
      })
      return data;
    },
    dataSource (dataSource) {
      this.setData({data: dataSource});
      return dataSource;
    }
  },
  mounted () {
    this.setData({data: this.dataSource});
  },
  methods: {
    clickItem (index) {
      console.log(this.card);
      this.current = index;
      this.$refs.right.scrollTo(0, this.$refs[`right${index}`][0].offsetTop);
    },
    changeId (data) {
      return data.name + data.attr[0].name;
    },
    input (num, data) {
      if (num > 3) {
        data.attr[0].num = 3;
        this.$utils.toast("数量达到上限");
        return ;
      }
      data.attr[0].num = num;
      let {card} = this;
      for (let i = 0; i < card.length; i++) {
        if (card[i].id === this.changeId(data)) {
          card[i] = {...data, id: this.changeId(data)}
          break;
        } else if (i === card.length - 1) {
          card.push({...data, id: this.changeId(data)})
        }
      }
      this.setData({card});
      //强制刷新
      this.data = [].concat(this.data)
    },
    close () {
      let {card, product} = this;
      console.log(product);
      product.attr.forEach(attr => {
        if (card.length == 0 && attr.num) {
          card.push({...product, attr, id: this.changeId(product)});
          return ;
        }
        for (let i = 0; i < card.length; i++) {
          if (card[i].id === this.changeId(product)) {
            card[i] = {...product, attr, id: this.changeId(product)}
            break;
          } else if (i === card.length - 1) {
            card.push({...product, attr, id: this.changeId(product)})
          }
        }
      })
      this.setData({card});
    }
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
    height: 100%;
    overflow: auto;
    position: relative;
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
