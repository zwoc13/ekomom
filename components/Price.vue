<template>
  <div class="price" :class="{ 'price-columned': discount > 0 }">
    <p class="price-value" :class="{ 'price-lowered': discount > 0 }">{{ price }} UAH</p>
    <p class="price-discount" v-if="discount > 0">{{ discount }} UAH</p>
  </div>
</template>

<script>
export default {
  name: 'PriceBlock',
  props: ['price', 'discount']
}
</script>

<style lang="scss" scoped>
.price {
  display: flex;
  align-items: center;
  color: $text-black;
  &-columned {
    flex-direction: column;
  }
  &-value {
    font-size: 20px;
    font-weight: 600;
  }
  &-lowered {
    font-size: 12px;
    padding-right: 5px;
    text-decoration: line-through;
  }
  &-discount {
    font-size: 22px;
    font-weight: bold;
    color: $text-red;
  }
}
</style>