<template>
  <div class="categories">
    <div class="container">
      <div class="block-title">Категорії</div>
      <div class="columns wrap">
        <CategoryThumb 
          :key="category._id" 
          v-for="category in parents"
          :category="category"
          :url="`/shop/${category.url}`"
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
  computed: {
    parents() {
      const categories = this.$props.categories
      const parents = categories.filter(c => !c.parent)
      return parents
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  flex-wrap: wrap;
}
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