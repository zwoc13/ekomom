<template>
  <div class="relative">
    <h3 class="relative-title">Схожі товари</h3>
    <div class="columns relative-wrap">
      <ProductThumb :key="product._id" v-for="product in products" :thumb="product" class="column is-2 is-10-mobile is-offset-1-mobile" />
    </div>
  </div>
</template>

<script>
import ProductThumb from '@/components/ProductThumb'

export default {
  name: 'RelativeProducts',
  props: ['products'],
  components: {
    ProductThumb,
  }
}
</script>

<style lang="scss" scoped>
.relative {
  padding-top: 50px;
  flex-direction: column;
  &-title {
    font-size: 24px;
    font-weight: bolder;
    font-family: $comfortaa;
    margin-bottom: 2rem;
  }
  &-wrap {
    flex-wrap: wrap;
  }
}
</style>