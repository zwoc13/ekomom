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

export default {
  name: 'IndexPage',
  components: {
    Banner,
    NewProducts,
    Categories,
  },
  async asyncData(ctx) {
    const { products: newProducts } = await ctx.$axios.$get('/api/products/new')
    const { categories } = await ctx.$axios.$get('/api/categories')
    
    return {
      newProducts,
      categories
    }
  }
}
</script>