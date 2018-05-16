/**
 * Created by Administrator on 2017/10/14 0014.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import mutations from './mutations'
import actions from './actions'

// console.log(mutations)
export default new Vuex.Store({
  modules:{
    mutations
  },
  actions,
})
