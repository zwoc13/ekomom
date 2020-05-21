<template>
  <nuxt-link :to="`/shop/${category.url}`" class="category-thumb">
    <div class="category-thumb-overlay">
      <div class="category-thumb-container">
        <p class="category-thumb-name">{{ category.name }}</p>
        <picture class="category-thumb-image" v-on="$listeners">
          <source :srcset="category.webp" type="image/webp" />
          <img class="category-thumb-fallback" :src="category.jpeg" :alt="alt" /> 
        </picture>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Picture from '@/components/Picture'

export default {
  name: 'CategoryThumb',
  props: [ 'category' ],
  components: { Picture },
  computed: {
    alt() {
      return `${this.category.name}. ${this.category.description}`
    }
  }
}
</script>

<style lang="scss" scoped>
.category-thumb {
  display: flex;
  box-sizing: border-box;
  @include mobile {
    margin-bottom: 20px;
  }
  &-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 440px;
    padding: 40px;
    background-color: #d3cfc4;
    @include mobile {
      padding: 10px;
    }
  }
  &-container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.3);
  }
  &-name {
    background: white;
    width: 100%;
    display: flex;
    background: white;
    font-size: 22px;
    padding: 20px 0;
    font-weight: 500;
    justify-content: center;
    color: $text-dark-brown;
  }
  &-image {
    display: flex;
    max-height: 320px;
    @include mobile {
      overflow: hidden;
    }
  }
  &-fallback {
    object-fit: cover;
    @include mobile {
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>