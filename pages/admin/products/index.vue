<template>
  <div class="container">
    <Loader :show="isLoading" />
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Категорія</th>
                  <th>Ціна</th>
                  <th>Акційна ціна</th>
                  <th>Редагувати</th>
                  <th>Видалити</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="product._id" v-for="product in products">
                  <td>{{ product.name }}</td>
                  <td>{{ category(product.category) }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.discount }}</td>
                  <td><nuxt-link :to="`/admin/products/edit/${product._id}`" >Редагувати</nuxt-link></td>
                  <td><a class="delete is-small" @click="deleteProduct(product._id)" /></td>
                </tr>
                <tr>
                  <td><nuxt-link class="button is-info" to="/admin/products/new">Створити новий товар</nuxt-link></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductMixin from '@/mixins/product'
import Loader from '@/components/Loader'
import { mapState } from 'vuex'

export default {
  name: 'ProductsIndex',
  layout: 'admin',
  mixins: [ ProductMixin ],
  middleware: 'verified',
  components: { Loader },
  data() {
    return {
      isLoading: false,
      products: [],
    }
  },
  computed: {
    ...mapState({
      categories: state => state.shop.categories
    })
  },
  async asyncData(ctx) {
    const { products } = await ctx.$axios.$get('/api/products')

    return {
      products,
    }
  },
  methods: {
    async deleteProduct(id) {
      this.isLoading = true

      const { products } = await this.$axios.$delete(`/api/products/${id}`)
      this.products = products

      this.isLoading = false
    },
    category(id) {
      const { categories } = this
      const category = categories.find(c => c._id === id)
      return category.name || 'Missing'
    },
  }
}
</script>

<style lang="scss" scoped>

</style>