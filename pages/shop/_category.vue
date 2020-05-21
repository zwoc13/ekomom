<template>
  <div class="shop-products">
    <div class="shop-products-list columns" v-if="products.length > 0">
      <ProductThumb 
        class="column is-4"
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
  }
}
</script>

<style lang="scss" scoped>
.shop {
  &-products {
    margin: 30px 0;
    &-list {
      border-bottom: 1px solid $grey;
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