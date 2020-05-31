<template>
  <picture class="picture" v-on="$listeners">
    <source :srcset="image.webp" type="image/webp" />
    <img class="picture-fallback" :src="image.jpeg" :alt="alt" /> 
  </picture>
</template>

<script>
export default {
  name: 'Picture',
  props: ['image', 'alt'],
}
</script>

<style lang="scss" scoped>
.picture {
  display: flex;
  &-fallback {
    height: auto;
    width: auto;
    @include mobile {
      object-fit: contain;
    }
  }
}
</style>