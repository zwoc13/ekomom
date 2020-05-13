export const state = () => ({
  products: [],
  user: {},
  total: 0,
  version: '0.0.1',
})

export const mutations = {
  addProduct(state, product) {
    if (!state.products.find(p => p._id === product._id)) {
      state.products = [ ...state.products, product ]
    }
  },
  removeProduct(state, id) {
    state.products = state.products.filter(product => product._id !== id)
  },
  setUser(state, user) {
    state.user = {
      ...state.user,
      name: user.name,
      phone: user.phone,
      city: user.city,
      cityName: user.cityName,
      cityReference: user.cityReference,
      warehouse: user.warehouse
    }
  },
  setName(state, name) {
    state.user.name = name
  },
  setPhone(state, phone) {
    state.user.phone = phone
  },
  setCity(state, city) {
    state.user.city = city
  },
  setWarehouse(state, warehouse) {
    state.user.warehouse = warehouse
  },
  setTotal(state) {
    let total = 0
    const products = state.products
    products.forEach(product => product.discount > 0 ? total += product.discount : total += product.price)
    state.total = total
  },
  clearStorage(state) {
    state.products = []
  },
}

export const actions = {
  async getTotal({ state, commit }) {
    await commit('setTotal')
  },
  async addProduct({ commit }, product) {
    await commit('addProduct', product)
  },
  async removeProduct({ commit }, id) {
    await commit('removeProduct', id)
  },
  async createOrder({ commit }, order) {
    await commit('setUser', { ...order })
    await commit('clearStorage')

    const dbOrder = {
      name: order.name,
      phone: order.phone,
      city: order.city,
      warehouse: order.warehouse,
      paymentType: order.paymentType,
      products: order.products.map(product => ({
        id: product._id,
        discount: product.discount,
        price: product.price,
        name: product.name,
      })),
      comment: order.comment,
    }

    await this.$axios.$post('/api/notify', { ...dbOrder })
    await this.$axios.$post('/api/orders', { ...dbOrder })
  }
}