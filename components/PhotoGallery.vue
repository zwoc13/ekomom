<template>
  <div class="gallery">
    <div class="gallery-big">
      <picture class="gallery-big-picture">
        <source :srcset="activeImage.webp" class="gallery-big-picture-webp" type="image/webp" />
        <img :src="activeImage.jpeg" class="gallery-big-picture-fallback" /> 
      </picture>
    </div>
    <div class="gallery-small">
      <div 
        :key="photo.jpeg"
        v-for="photo in photos"
        class="gallery-small-container"
        :class="{ 'gallery-small-container-active': isActiveImage(photo) }"
        @click="setActiveImage(photo)"
      >
        <picture class="gallery-small-picture">
          <source :srcset="photo.webp" class="gallery-small-picture-webp" type="image/webp" />
          <img :src="photo.jpeg" class="gallery-small-picture-fallback" /> 
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoGallery',
  data() {
    return {
      activeImage: this.photos[0],
    }
  },
  methods: {
    isActiveImage(photo) {
      const { activeImage } = this
      return activeImage.jpeg === photo.jpeg && activeImage.webp === photo.webp
    },
    setActiveImage(activate) {
      const { photos } = this
      const photosIndex = photos.findIndex(photo => photo.jpeg === activate.jpeg)
      this.activeImage = photos[photosIndex]
    },
  },
  props: ['photos'],
}
</script>

<style lang="scss" scoped>
.gallery {
  &-big {
    width: 100%;
    &-image {
      width: 100%;
      border-radius: 3px;
    }
    &-picture {
      display: flex;
      &-fallback {
        &[lazy=loading] {
          width: 100px;
          height: 100px;
          margin: 100px auto;
        }
        width: 100%;
      }
    }
  }
  &-small {
    margin-top: 5px;
    display: flex;
    max-width: 100%;
    overflow-x: scroll;
    cursor: pointer;
    &-picture {
      display: flex;
    }
    &-container {
      width: 120px;
      height: 100%;
      margin-right: 5px;
      &-active {
        border: 1px solid $blue;
      }
    }
    &-image {
      display: flex;
      width: 100%;
      border-radius: 3px;
    }
  }
}
</style>