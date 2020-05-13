<template>
  <div>
    <Header />
    <div class="shop container">
      <Breadcrumps />
      <div class="columns">
        <ShopFilters class="column is-3 shop-filters" :categories="categories" />
        <div class="column is-9 shop-content">
          <ShopSorter />
          <nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'
import ShopFilters from '@/components/ShopFilters'
import ShopSorter from '@/components/ShopSorter'
import Breadcrumps from '@/components/Breadcrumps'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'ShopLayout',
  components: {
    Header, Footer, ShopFilters, ShopSorter, Breadcrumps,
  },
  computed: {
    ...mapState({
      categories: state => {
        const categories = state.shop.categories
        const formattedCategories = categories.map(category => {
          if (!category.parent) {
            return {
              ...category,
              subcategories: categories.filter(cat => cat.parent === category._id)
            }
          }
        }).filter(category => category)

        return formattedCategories
      },
    })
  },
}
</script>

<style lang="scss" scoped>
.shop {
  margin-top: 50px;
}
</style>