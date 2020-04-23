import Vue from 'vue'
import Vuex from 'vuex'

import CityModule from './modules/cityModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    city: CityModule
  }
})
