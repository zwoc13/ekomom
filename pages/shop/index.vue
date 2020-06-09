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
      categoriesList: state => state.shop.categories,
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
  },
  head() {
    const title = 'EkoMom - інтернет-магазин дитячого тектилю'
    const categoriesList = this.categoriesList.map(category => category.name).join(', ')
    const description = `Інтернет-магазин дитячого текстилю. Обирайте категорію товару на Ваш смак: ${categoriesList}`
    return {
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:locale', content: "uk_UA" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: "https://ekomom.com/shop/" },
        { property: "og:site_name", content: "EkoMom" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.categories {
  padding: 3rem 0;
  background: $pink;
  &-container {
    flex-wrap: wrap;
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
    margin: 2.5rem 1rem;
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