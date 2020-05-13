export const state = () => ({
  keyword: '',
  loading: false,
  products: [],
})

export const mutations = {
  setLoading(state, condition) {
    state.loading = condition
  },
  setKeyword(state, keyword) {
    state.keyword = keyword
  },
  setVisibleProducts(state, products) {
    state.products = products
  },
  clearProducts(state) {
    state.products = []
  }
}

export const actions = {
  async makeSearch({ commit, state }, keyword) {
    if (keyword) {
      commit('setLoading', true)
      commit('setKeyword', keyword)

      const { products } = await this.$axios.$get(`/api/search?s=${keyword}`)
      commit('setVisibleProducts', products)

      commit('setLoading', false)
    } else {
      commit('clearProducts')
    }
  },
  setLoading({ commit }, value) {
    commit('setLoading', value)
  },
  clearProducts({ commit }) {
    setTimeout(() => {
      commit('clearProducts')
    }, 200)
  }
}