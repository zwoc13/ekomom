export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    this.$axios.$post('/api/login', { email, password })
      .then(user => {
        console.log(user)
        commit('setUser', user)
      })
      .catch(err => {
        console.error(err)
      })
  }
}