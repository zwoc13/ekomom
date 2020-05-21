export const state = () => ({
  products: [],
  categories: [],
  breadcrumps: [],
  sortBy: '',
  active: {
    category: undefined,
    subcategory: undefined,
  },
  filters: {
    category: undefined,
    subcategory: undefined,
  }
})

export const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setSorting(state, sorting) {
    state.sortBy = sorting
    const products = state.products
    const sortFunctions = {
      'new:asc': (a, b) => a.createdAt - b.createdAt,
      'price:asc': (a, b) => a.price - b.price,
      'price:desc': (a, b) => b.price - a.price,
    }

    const sortedProducts = products.sort(sortFunctions[sorting])
    state.products = sortedProducts
  },
  setFilters(state, filters) {
    state.filters = { ...filters }
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setBreadcrumps(state, crumps) {
    state.breadcrumps = crumps
  },
  setActiveCategory(state, category) {
    state.active.category = category
  },
  setActiveSubcategory(state, subcategory) {
    state.active.subcategory = subcategory
  }
}

export const actions = {
  async initStore({ dispatch, commit }, options = false) {
    if (options) {
      commit('setFilters', options)
    }
    
    const { categories } = await this.$axios.$get('/api/categories')
    await commit('setCategories', categories)
    await dispatch('getProducts')
  },
  async setFilters({ dispatch, commit }, filters) {
    await commit('setFilters', filters)
    await dispatch('getProducts')
  },
  async setSorting({ dispatch, commit }, sortingOption) {
    await commit('setSorting', sortingOption)
    await dispatch('getProducts')
  },
  async setBreadcrumps({ commit, state }, route) {
    const { category, subcategory } = route.params

    const crumps = [{
      title: 'Головна',
      url: '/'
    }]

    if (route.name === 'shop') {
      crumps.push({ 
        title: 'Магазин',
        url: '/shop',
      })
    }

    if (category) {
      const parentCategory = state.categories.find(c => c.url === category)
      const categoryCrumps = [{
        title: 'Магазин',
        url: '/shop',
      }, {
        title: parentCategory.name,
        url: `/shop/${category}`
      }]

      await commit('setActiveCategory', parentCategory)
      categoryCrumps.forEach(c => crumps.push(c))
    }

    if (subcategory) {
      const parentCategory = state.categories.find(c => c.url === category)
      const childCategory = state.categories.find(c => c.url === subcategory)
      await commit('setActiveSubcategory', childCategory)
      crumps.push({
        title: childCategory.name,
        url: `/shop/${parentCategory.url}/${childCategory.url}`
      })
    }

    if (route.name === 'shop-product-product_id') {
      const { product_id } = route.params
      const { product } = await this.$axios.$get(`/api/products/${product_id}`)
      const name = product.name
      const categoryId = product.category
      const parentCategory = state.categories.find(c => {
        const { subcategories } = c
        const rightSubcategory = subcategories.find(s => s._id === categoryId)
        return rightSubcategory
      })
      const childCategory = parentCategory.subcategories.find(s => s._id === categoryId)

      const productCrumps = [{
        title: 'Магазин',
        url: '/shop',
      }, {
        title: parentCategory.name,
        url: `/shop/${parentCategory.url}`,
      }, {
        title: childCategory.name,
        url: `/shop/${parentCategory.url}/${childCategory.url}`
      }, {
        title: name,
        url: `/shop/product/${product_id}`
      }]

      productCrumps.forEach(c => crumps.push(c))
    }

    await commit('setBreadcrumps', crumps)
  },
  async getProducts({ commit, state }) {
    let queryString = ''
    const { category, subcategory } = state.filters
    const { sortBy } = state

    if (category) queryString += `&category=${category}`
    if (subcategory) queryString += `&subcategory=${subcategory}`
    if (sortBy) queryString += `&sort=${sortBy}`

    const { products } = await this.$axios.$get(`/api/products?${queryString}`)
    await commit('setProducts', products)
  }
}