<template>  
  <div class="header-search">
    <div class="header-search-block">
      <input 
        type="text"
        class="input header-search-input"
        placeholder="Пошук"
        v-on:keyup="throttleSearch($event.target.value)"
        v-on:blur="clearProducts"
      />
      <img class="header-search-icon" src="~/assets/images/search.svg" />
    </div>
    <div class="header-search-container">
      <div class="header-search-loader" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="header-search-products" v-if="products.length > 0">
        <nuxt-link :to="`/shop/product/${product._id}`" class="header-search-product" :key="product._id" v-for="product in products">
          <picture class="header-search-product-image">
            <source :srcset="product.photos[0].webp" type="image/webp" />
            <source :srcset="product.photos[0].jpeg" type="image/jpeg" />
            <img :src="product.photos[0].jpeg" />
          </picture>
          <div class="header-search-product-text">
            <div class="header-search-product-title">{{ product.name }}</div>
            <div class="header-search-product-description">{{ formatDescription(product.description) }}</div>
          </div>
          <div class="header-search-product-price">
            <div class="header-search-product-value" :class="{ 'header-search-product-value-crossed': product.discount > 0 }">{{ product.price }} ₴</div>
            <div class="header-search-product-discount" v-if="product.discount > 0">{{ product.discount }} ₴</div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'

export default {
  name: 'Search',
  computed: {
    ...mapState({
      loading: state => state.search.loading,
      products: state => state.search.products,
    }),
  },
  methods: {
    ...mapActions({
      makeSearch: 'search/makeSearch',
      clearProducts: 'search/clearProducts',
      setLoading: 'search/setLoading',
    }),
    throttleSearch: throttle(function(value) {
      this.makeSearch(value)
    }, 500),
    formatDescription(string) {
      return string.slice(0, 27) + '...'
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  position: relative;
  display: flex;
  &-input {
    @include mobile {
      font-size: 14px;
    }
  }
  &-icon {
    display: flex;
    position: absolute;
    right: 15px;
    top: 10px;
    width: 20px;
    height: 20px;
  }
  &-container {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background: white;
  }
  &-products {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    min-width: 400px;
    background: white;
    box-shadow: 0 2px 15px #bbb;
    border-radius: 3px;
  }
  &-product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    transition: .4s;
    &:hover {
      background: $light-pink;
      cursor: pointer;
    }
    &-image {
      display: flex;
      max-width: 50px;
    }
    &-text {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
    &-title {
      font-size: 14px;
      font-weight: 500;
    }
    &-description {
      font-size: 12px;
    }
    &-price {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
    &-value {
      font-size: 16px;
      font-weight: 600;
      &-crossed {
        font-size: 12px;
        font-weight: normal;
        text-decoration: line-through;
      }
    }
    &-discount {
      font-size: 20px;
      font-weight: 500;
      color: $text-red;
    }
  }
}
</style> 