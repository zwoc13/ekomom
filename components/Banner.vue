<template>
  <div class="banner">
    <div class="container">
      <div class="columns banner-columns">
        <div class="column is-4 is-full-mobile">
          <div class="banner-title">новий Асортимент літніх пледів</div>
          <div class="banner-description">Ми раді повідомити Вам, що ми працюємо над розширенням літнього асортименту та раді представити Вашій увазі муслинові пледи</div>
          <nuxt-link to="/shop/pledi/muslin" class="button is-medium banner-cta">Перейти</nuxt-link>
        </div>
        <div class="column is-8 banner-relative">
          <img :src="activeSource" class="banner-active-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      activeSource: '/banner-1.jpg',
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  display: flex;
  position: relative;
  min-height: 670px;
  align-items: center;
  background: $pink;
  &-relative {
    position: relative;
    @include mobile {
      display: none;
    }
  }
  &-columns {
    align-items: center;
  }
  &-title {
    font-size: 30px;
    font-weight: 600;
    font-family: $comfortaa;
    text-transform: uppercase;
    color: $brown;
    line-height: 1.2;
    margin-bottom: 30px;
  }
  &-description {
    font-size: 18px;
    color: #0a0a0a;
    font-family: $roboto;
    line-height: 1.2;
    font-weight: 400;
    margin-bottom: 30px;
  }
  &-cta {
    background: $blue;
    color: white;
  }
  .container {
    min-height: 670px;
    display: flex;
    position: relative;
    align-items: flex-end;
    @include mobile {
      &:before,
      &:after {
        display: none;
        align-items: center;
      }
      align-items: center;
    }
    &:before,
    &:after {
      position: absolute;
      height: auto;
      background: url('/Elements.svg') no-repeat center center;
      height: 400px;
      width: 400px;
      content: ' ';
      z-index: 1;
    }
    &:before {
      bottom: -200px;
      left: -400px;
    }
    &:after {
      bottom: 20%;
      right: -320px; 
    }
  }
  &-active-image-container {
    position: absolute;
    bottom: 45px;
    right: -50px;
    width: 100%;
  }
  &-active-image {
    max-height: 700px;
    max-width: 120%;
    margin-bottom: -50px;
  }
}
</style>