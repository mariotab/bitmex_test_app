import Vue from 'vue'
import Vuex from 'vuex'
import activeInstrument from './modules/activeInstrument/'
import historyTraders from './modules/historyTraders/'
import order from './modules/order/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    activeInstrument,
    historyTraders,
    order
  }
})
