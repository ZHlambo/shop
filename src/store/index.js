import Vue from "vue";
import Vuex from "vuex";

const SHOPPING_CAR = "SHOPPING_CAR";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shoppingCar: (function(){
      let data = localStorage.getItem(SHOPPING_CAR);
      try {
        data = JSON.parse(data || "[]");
      } catch (e) {}
      return data || [];
    })(),
    selectedProduct: {},
  },
  getters: {
    getShoppingCar (state) {
      return state.shoppingCar;
    }
  },
  actions: {
    changeCar (context, data) {
      context.commit(SHOPPING_CAR, data);
    }
  },
  mutations: {
    [SHOPPING_CAR] (state, {sku, num}) {
      let obj = JSON.parse(JSON.stringify(sku));
      if (num > 3) {
        obj.attrData.num = 3;
        // this.$utils.toast("数量达到上限");
        return ;
      }
      obj.attrData.num = num;
      let {shoppingCar} = state;
      if (shoppingCar.length == 0) {
        shoppingCar.push(obj)
      } else {
        for (let i = 0; i < shoppingCar.length; i++) {
          if (shoppingCar[i].id === obj.id) {
            if (obj.attrData.num == 0) {
              shoppingCar.splice(i, 1);
            } else {
              shoppingCar[i] = obj;
            }
            break;
          } else if (i === shoppingCar.length - 1) {
            shoppingCar.push(obj);
          }
        }
      }
      localStorage.setItem(SHOPPING_CAR, JSON.stringify(shoppingCar));
      state.shoppingCar = [].concat(shoppingCar);
    }
  },
})
