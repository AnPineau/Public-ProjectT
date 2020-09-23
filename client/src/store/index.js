import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: null,
    username: '',
    isMenuOpened: true,
  },
  mutations: {
    isLogged(state, bool) {
      state.isLogged = bool;
    },
    setUsername(state, username) {
      state.username = username;
    },
    toggleMenu(state) {
      state.isMenuOpened = !state.isMenuOpened;
    }
  },
  actions: {
  },
  modules: {
  }
})
