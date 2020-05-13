import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req, route }) {
    if (req.user) {
      commit('auth/setUser', req.user)    
    }

    await dispatch('shop/initStore', route.params)
    if (route.path.includes('shop')) {
      await dispatch('shop/setBreadcrumps', route)
    }
  }
}