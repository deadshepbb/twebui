import Vue from 'vue'
import Vuex from 'vuex'

import stateCoverAnalysis from "./state/stateCoverAnalysis"
import stateAnomaly from "./state/stateAnomaly"
import stateCoverage from "./state/stateCoverage"
import getters from './getters'
import mutations from './mutations'
import actions from './actions'


Vue.use(Vuex)

//5G网络，异常检测
const modulesAnomaly = {
  state:stateAnomaly,
}
// const modulesCoverage = {
//   state:stateCoverage,
// }

const store = new Vuex.Store({
  state: stateCoverAnalysis,
  getters,
  mutations,
  actions,
  modules:{
    anomaly:modulesAnomaly, //5G网络，异常检测
    coverage:stateCoverage, //4/5G覆盖对比
  },
})

export default store
