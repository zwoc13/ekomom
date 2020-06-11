<template>
  <picture class="picture" v-on="$listeners">
    <source :srcset="image.webp" class="picture-webp" type="image/webp" />
    <img :src="image.jpeg" class="picture-fallback" :alt="alt" /> 
  </picture>
</template>

<script>
export default {
  name: 'Picture',
  props: ['image', 'alt'],
}
</script>

<style lang="scss" scoped>
.picture-webp[lazy=loading] {
  display: none;
}
.picture-fallback[lazy=loading] {
  height: 100px;
  width: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.picture {
  position: relative;
  &-fallback {
    height: auto;
    width: auto;
    @include mobile {
      object-fit: contain;
    }
  }
}
</style>