<template>
  <nuxt-link class="category-thumb" :to="url || `/shop/${category.url}`">
    <picture class="category-thumb-image" v-on="$listeners">
      <source :srcset="category.webp" type="image/webp" />
      <img class="category-thumb-fallback" :src="category.jpeg" :alt="category.name" /> 
    </picture>
    <div class="category-thumb-container">
      {{ category.name }}
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CategoryThumbSmall',
  props: ['category', 'url'],
}
</script>

<style lang="scss" scoped>
.category-thumb {
  height: 15rem;
  padding: 0 3rem;
  background: $darker-pink;
  box-shadow: 0 0 10px 4px $darker-pink;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    .category-thumb-image {
      opacity: .75;
    }
    .category-thumb-container {
      color: darken($blue, 10%);
      box-shadow: 0 0 15px #ccc;
    }
  }
  &-container {
    background: white;
    padding: 1rem;
    border-radius: 3px;
    z-index: 1;
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: .5px;
    color: $blue;
    transition: .2s;
  }
  &-image {
    position: absolute;
    object-fit: contain;
    opacity: .5;
    left: 0;
    right: 0;
    z-index: 0;
    transition: .2s;
    min-width: 100%;
  }
  &-fallback {
    min-width: 100%;
  }
}
</style>