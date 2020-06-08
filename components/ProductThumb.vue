<template>
  <nuxt-link :to="`/shop/product/${thumb._id}`" class="product-thumb">
    <div class="product-thumb-ribbon" v-if="thumb.qnt == 0">Немає в наявності</div>
    <div class="product-thumb-image-container">
      <Picture class="product-thumb-image" :image="pickFirstImage(thumb.photos)" :alt="thumb.name + '. ' + thumb.description" />
      <div class="product-thumb-overlay">
        переглянути
      </div>
    </div>
    <div class="product-thumb-text-container">
      <Price :price="thumb.price" :discount="thumb.discount" v-if="thumb.qnt > 0" />
      <h5 class="product-thumb-title">{{ thumb.name }}</h5>
    </div>
  </nuxt-link>
</template>

<script>
import Picture from '@/components/Picture'
import Price from '@/components/Price'
import { mapState } from 'vuex'

export default {
  name: 'ProductThumb',
  props: [ 'thumb' ],
  computed: {
    ...mapState({
      categories: state => state.shop.categories,
    })
  },
  components: { Picture, Price },
  methods: {
    pickFirstImage(array) {
      const [ first ] = array
      return first
    }
  }
}
</script>

<style lang="scss" scoped>
.product-thumb {
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  &:hover {
    .product-thumb-overlay {
      transform: translateY(-100px);
    }
  }
  &-ribbon {
    position: absolute;
    top: 15px;
    right: -3px;
    background: $blue;
    font-size: 10px;
    color: white;
    padding: 3px;
    text-transform: uppercase;
    z-index: 1;
  }  
  &-image {
    min-height: 100%;
    @include mobile {
      max-height: 300px;
      object-fit: contain;
    }
    img {
      color: #fff;
    }
  }
  &-image-container {
    position: relative;
    max-height: 100%;
    overflow: hidden;
    height: 300px;
    display: flex;
    align-items: center;
    @include mobile {
      padding: 30px;
      max-height: 320px;
      object-fit: contain;
      box-sizing: border-box;
    }
  }
  &-overlay {
    position: absolute;
    bottom: -100px;
    width: 100%;
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
    letter-spacing: .5px;
    color: $text-black;
    transition: .2s;
    color: white;
    text-transform: uppercase;
    @include mobile { display: none; }
    @include background-opacity($brown, 0.7);
  }
  &-text-container {
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-title {
    text-align: center;
    font-size: 18px;
    color: $text-black;
  }
}
</style>