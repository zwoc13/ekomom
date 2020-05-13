<template>
  <div class="product">
    <nuxt-link :to="`/shop/product/${product._id}`">
      <Picture class="product-image" :image ="product.photos[0]" />
    </nuxt-link>
    <div class="product-name">{{ product.name }}</div>
    <div class="product-price">{{ product.price }}</div>
    <div class="product-discount">{{ product.discount }}</div>
    <div class="product-qnt">{{ product.qnt }}</div>
    <div class="product-remove" @click="remove(product.id)">
      <img class="product-trash" src="~assets/images/trash.svg" />
    </div>
  </div>
</template>

<script>
import Picture from '@/components/Picture'

export default {
  name: 'OrderProduct',
  components: { Picture },
  props: [ 'product', 'remove' ],
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px; 
  &-image {
    width: 70px;
    flex: 0 0 70px;
  }
  &-name {
    flex: 0 0 100px;
  }
  &-price {
    flex: 0 0 80px;
  }
  &-discount {
    flex: 0  0 80px;
  }
  &-qnt {
    flex: 0 0 80px;
  }
  &-remove {
    cursor: pointer;
  }
  &-trash {
    height: 20px; 
  }
}
</style>