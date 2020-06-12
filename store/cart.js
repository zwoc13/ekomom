export const state = () => ({
  products: [],
  user: {
    name: '',
    phone: '',
    city: '',
    cityName: '',
    cityReference: '',
    warehouse: '',
  },
  total: 0,
  version: '1',
})

export const mutations = {
  addProduct(state, product, optionIndex) {
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
  setCityName(state, cityName) {
    state.user.cityName = cityName
  },
  setCityReference(state, cityReference) {
    state.user.cityReference = cityReference
  },
  setWarehouse(state, warehouse) {
    state.user.warehouse = warehouse
  },
  setTotal(state) {
    let total = 0
    const products = state.products
    products.forEach(product => {
      const option = product.options[product.optionIndex]
      const price = option.price
      const discount = price.discount
      if (discount) {
        total += discount
      } else {
        total += price
      }
    })
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
    await commit('setTotal')
  },
  async removeProduct({ commit }, id) {
    await commit('removeProduct', id)
  },
  async createOrder({ commit }, order) {
    const dbOrder = {
      name: order.name,
      phone: order.phone,
      city: order.city,
      warehouse: order.warehouse,
      paymentType: order.paymentType,
      products: order.products.map(product => {
        const options = product.options[product.optionIndex]
        return {
          id: product._id,
          price: options.price,
          discount: options.price,
          title: options.title,
          name: product.name,
        }
      }),
      comment: order.comment,
      total: order.total,
    }

    await this.$axios.$post('/api/notify', { ...dbOrder })
    await this.$axios.$post('/api/orders', { ...dbOrder })

    await commit('clearStorage')
  }
}