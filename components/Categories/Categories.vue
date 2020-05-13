<template>
  <div class="categories">
    <div class="container">
      <div class="block-title">Категорії</div>
      <div class="columns">
        <CategoryThumb 
          :key="category._id" 
          v-for="category in categories"
          :category="category" 
          class="column is-4 is-3-widescreen is-10-mobile is-offset-1-mobile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryThumb from '@/components/Categories/CategoryThumb'

export default {
  name: 'Categories',
  props: ['categories'],
  components: { CategoryThumb },
}
</script>

<style lang="scss" scoped>
.categories {
  padding: 80px 0;
  background: $pink;
  position: relative;
  @include mobile {
    &:before,
    &:after {
      display: none;
    }
  }
  &:before,
  &:after {
    position: absolute;
    height: auto;
    content: ' ';
    height: 400px;
    width: 400px;
    z-index: 0;
    background: url('/Elements.svg') no-repeat center center;
  }
  &:before {
    left: -200px;
    top: -50px;
  }
  &:after {
    right: 50px;
    top: 100px;
  }
}
</style>