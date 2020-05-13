<template>
  <div class="gallery">
    <div class="gallery-big">
      <Picture :image="activeImage" class="gallery-big-image" />
    </div>
    <div class="gallery-small">
      <div 
        :key="photo.jpeg"
        v-for="photo in photos"
        class="gallery-small-container"
        :class="{ 'gallery-small-container-active': isActiveImage(photo) }"
        @click="setActiveImage(photo)"
      >
        <Picture
          :image="photo" 
          class="gallery-small-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Picture from '@/components/Picture'

export default {
  name: 'PhotoGallery',
  components: {
    Picture,
  },
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
  }
  &-small {
    margin-top: 5px;
    display: flex;
    max-width: 100%;
    overflow-x: scroll;
    cursor: pointer;
    &-container {
      max-width: 70px;
      margin-right: 5px;
      &-active {
        border: 1px solid $blue;
      }
    }
    &-image {
      width: 100%;
      border-radius: 3px;
    }
  }
}
</style>