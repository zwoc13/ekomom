<template>
  <div class="product">
    <picture class="product-picture">
      <source :srcset="product.photos[0].webp" class="product-picture-webp" type="image/webp" />
      <img :src="product.photos[0].jpeg" class="product-picture-fallback" /> 
    </picture>
    <div class="product-name">{{ product.name }} (комплектація {{product.title}})</div>
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
  props: [ 'product', 'remove' ]
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px; 
  &-picture {
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