<template>
  <div class="shop-products">
    <div class="shop-products-list columns" v-if="products.length > 0">
      <ProductThumb 
        class="column is-3 is-6-mobile"
        :key="product._id"
        v-for="product in products"
        :thumb="product"
      />
    </div>
    <div class="shop-products-missing" v-else>
      На жаль, в цій категорії поки немає товарів :(
    </div>
    <div class="shop-category-description">
      {{ description }}
    </div>
  </div>
</template>

<script>
import ProductThumb from '@/components/ProductThumb'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ShopCategory',
  layout: 'shop',
  components: {
    ProductThumb,
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  computed: {
    ...mapState({
      products: state => state.shop.products,
      active: state => state.shop.active,
    }),
    description() {
      const { 
        active: { 
          category,
          subcategory
        } 
      } = this
      if (subcategory) return subcategory.description
      if (category) return category.description
    }
  },
  async asyncData({ store, params }) {
    await store.dispatch('shop/setFilters', params)
  },
  head() {
    let seoTitle = '', seoDescription = '', url = 'https://ekomom.com/shop/'
    const { active: { category, subcategory }} = this
    if (subcategory) {
      seoTitle = `Купити ${subcategory.name} в Україні`
      seoDescription = subcategory.name
      url += `${category.url}/${subcategory.url}/`
    }
    if (category) {
      seoTitle = `Купити ${category.name} в Україні`
      seoDescription = category.name
      url += category.url + '/'
    }

    const title = `EkoMom - інтернет-магазин дитячого тектилю. ${seoTitle}`
    const description = `Інтернет-магазин дитячого текстилю. Маємом багато ${seoDescription} в наявності та під замовлення.`
    return {
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:locale', content: "uk_UA" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
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
.shop {
  &-products {
    margin: 30px 0;
    &-list {
      border-bottom: 1px solid $grey;
      flex-wrap: wrap;
    }
  }
  &-category-description {
    font-size: 14px;
    color: $grey;
  }
  &-products-missing {
    font-size: 30px;
    font-weight: 500;
    font-family: $roboto;
    text-align: center;
    padding: 3rem 0;
  }
}
</style>