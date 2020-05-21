<template>
  <div class="categories">
    <div class="container">
      <h3 class="block-title">Магазин</h3>
      <div class="columns categories-block" :key="category.id" v-for="category in categories">
        <div class="column is-12">
          <nuxt-link class="categories-parent" :to="`/shop/${category.url}`">{{ category.name }}</nuxt-link>
        </div>
        <div class="categories-container columns">
          <div class="column is-2" :key="subcategory._id" v-for="subcategory in category.subcategories">
            <CategoryThumbSmall class="categories-child" :category="subcategory" :url="`/shop/${category.url}/${subcategory.url}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryThumbSmall from '@/components/Categories/CategoryThumbSmall'
import { mapState } from 'vuex'

export default {
  name: 'ShopCategoiesList',
  components: {
    CategoryThumbSmall
  },
  computed: {
    ...mapState({
      categories: state => {
        const list = state.shop.categories
        const parents = list.filter(category => !category.parent)
        const categories = parents.map(category => {
          return {
            ...category,
            subcategories: list.filter(subcategory => subcategory.parent === category._id)
          }
        })

        return categories
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.categories {
  padding: 3rem 0;
  background: $pink;
  &-container {
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }
  &-block {
    flex-direction: column;
  }
  &-parent {
    display: flex;
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
    color: $text-brown;
    align-items: center;
    &:after {
      display: flex;
      content: ' ';
      flex: 1 0 50%;
      height: 1px;
      background: $text-brown;
      margin-left: 50px;
    }
  }
}
</style>