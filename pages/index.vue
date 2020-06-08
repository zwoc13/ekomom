<template>
  <div class="body">
    <Banner />
    <NewProducts :newProducts="newProducts" />
    <Categories :categories="categories" />
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import NewProducts from '@/components/NewProducts'
import Categories from '@/components/Categories/Categories'
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  components: {
    Banner,
    NewProducts,
    Categories,
  },
  async asyncData({ $axios }) {
    const { products: newProducts } = await $axios.$get('/api/products/new')
    const { categories } = await $axios.$get('/api/categories')
    
    return {
      newProducts,
      categories,
    }
  }
}
</script>