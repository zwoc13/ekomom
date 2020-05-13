<template>
  <div class="cart-item">
    <picture class="cart-item-image">
      <source :srcset="product.photos[0].webp" type="image/webp" />
      <source :srcset="product.photos[0].jpeg" type="image/jpeg" />
      <img :src="product.photos[0].jpeg" />
    </picture>
    <div class="cart-item-text">
      <div class="cart-item-title">{{ product.name }}</div>
      <div class="cart-item-description">{{ formatDescription(product.description) }}</div>
    </div>
    <div class="cart-item-price">
      <div class="cart-item-value" :class="{ 'cart-item-value-crossed': product.discount > 0}">{{ product.price }} ₴</div>
      <div class="cart-item-discount" v-if="product.discount > 0">{{ product.discount }} ₴</div>
    </div>
    <div class="cart-item-remove" @click="removeProduct(product._id)">&times;</div>
  </div>
</template>

<script>
import Picture from '@/components/Picture'
import { mapActions } from 'vuex'

export default {
  name: 'CartThumb',
  props: ['product', 'remove'],
  components: {
    Picture,
  },
  methods: {
    ...mapActions({
      removeProduct: 'cart/removeProduct'
    }),
    formatDescription(string) {
      return string.slice(0, 27) + ',,,'
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  &-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #999;
    padding: 10px 0;
    &:last-child {
      border-bottom: 0;
    }
    &-image {
      width: 100px;
    }
    &-text {
      display: flex;
      flex-direction: column;
    }
    &-title {
      font-size: 18px;
      font-weight: 500;
    }
    &-description {
      font-size: 14px;
      font-weight: normal;
      color: #999;
    }
    &-price {
      display: flex;
      flex-direction: column;
    }
    &-value {
      font-size: 18px;
      font-weight: 500;
      &-crossed {
        font-size: 14px;
        font-weight: normal;
        text-decoration: line-through;
      }
    }
    &-discount {
      font-weight: 500;
      font-size: 20px;
      color: $text-red;
    }
    &-remove {
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>