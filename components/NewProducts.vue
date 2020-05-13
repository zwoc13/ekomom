<template>
  <div class="news">
    <div class="container">
      <div class="block-title">Новинки</div>
      <div class="columns">
        <div class="column is-3 is-12-mobile" :key="newProduct._id" v-for="newProduct in newProducts">
          <ProductThumb :thumb="newProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductThumb from '@/components/ProductThumb'

export default {
  name: 'NewProducts',
  props: ['newProducts'],
  components: { ProductThumb },
}
</script>

<style lang="scss" scoped>
.news {
  padding: 200px 0 80px;
  @include mobile {
    padding-top: 80px;
  }
}
</style>