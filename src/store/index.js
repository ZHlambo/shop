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
    changeCar (context, sku) {
      context.commit(SHOPPING_CAR, sku);
    }
  },
  mutations: {
    [SHOPPING_CAR] (state, payload) {
      const getId = (data) => {
        return data.name + data.attrData.name;
      };
      let {shoppingCar} = state;
      payload.id = getId(payload);
      if (shoppingCar.length == 0) {
        shoppingCar.push(payload)
      } else {
        for (let i = 0; i < shoppingCar.length; i++) {
          if (shoppingCar[i].id === getId(payload)) {
            if (payload.attrData.num == 0) {
              shoppingCar.splice(i, 1);
            } else {
              shoppingCar[i] = payload
            }
            break;
          } else if (i === shoppingCar.length - 1) {
            shoppingCar.push(payload)
          }
        }
      }
      localStorage.setItem(SHOPPING_CAR, JSON.stringify(shoppingCar));
      state.shoppingCar = [].concat(shoppingCar);
    }
  },
})
