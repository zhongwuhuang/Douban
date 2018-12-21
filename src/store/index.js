import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    goodsList: localStorage['goodsList'] ? JSON.parse(localStorage['goodsList']):[]
  },
  // 获取数据，就像计算属性一样
  getters:{
    sumPrice(state){
      let total = 0
      state.goodsList.forEach(item => {
        if(item.select){
          total+=item.price*item.number
        }
      });
      return total
    },
    goodsNumber(state){
      return state.goodsList.length
    }
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  mutations: {
    addGoods(state, data) {
      state.goodsList.push(data);
      localStorage.setItem('goodsList',JSON.stringify(state.goodsList))
    },
    deleteGoods:(state, index)=> {
      state.goodsList.splice(index,1);
      localStorage.setItem('goodsList',JSON.stringify(state.goodsList))
    },
    // 更新vuex中的数据
    updateGoods(state,data){
      const {index,key,val} = data
      state.goodsList[index][key] = val
      localStorage.setItem('goodsList',JSON.stringify(state.goodsList))
    }
  }
});