import Vue from 'vue'
import Vuex from 'vuex'
import activeInstrument from './modules/activeInstrument/'
import historyTraders from './modules/historyTraders/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    activeInstrument,
    historyTraders
  }
})
