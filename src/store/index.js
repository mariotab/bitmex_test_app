import Vue from 'vue'
import Vuex from 'vuex'
import activeInstrument from './modules/activeInstrument/'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    activeInstrument
  }
})
