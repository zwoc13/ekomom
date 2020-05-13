<template>
  <div class="filters" :class="{ 'filters-active': show }">
    <div class="filters-ticket" @click="showFilters">
      <img class="filters-ticket-button" src="~assets/images/filter.svg" />
    </div>
    <div class="filters-field field">
      <label class="label">Категорії товарів</label>
      <div 
        :key="category._id"
        v-for="category in categories"
        class="category-parent">
        <nuxt-link :to="`/shop/${category.url}`" class="category-link big">{{ category.name }}</nuxt-link>
        <div class="category-children">
          <nuxt-link 
            :key="subcategory._id"
            v-for="subcategory in category.subcategories"
            :to="subcategoryUrl(category.url, subcategory.url)" 
            class="category-link">{{ subcategory.name }}</nuxt-link>
        </div>
      </div>
      <button class="button filters-close" @click="showFilters">Закрити фільтри</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopFilters',
  props: ['categories'],
  data: () => ({ show: false }),
  methods: {
    subcategoryUrl(parentUrl, childUrl) {
      return `/shop/${parentUrl}/${childUrl}`
    },
    showFilters() {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  transition: .3s;
  @include mobile {
    display: flex;
    position: fixed;
    padding: 10px;
    right: 100%;
    width: 100%;
    top: 0;
    height: 100%;
    overflow-y: scroll;
    background: white;
    z-index: 10;
  }
  &-active {
    @include mobile {
      right: 0;
      .filters-ticket {
        display: none;
      }
    }
  }
  &-close {
    width: 100%;
    background: $darker-pink;
    margin-top: 5rem;
    display: none;
    @include mobile {
      display: flex;
    }
  }
  &-ticket {
    position: fixed;
    left: -3px;
    top: 20%;
    height: 50px;
    width: 50px;
    padding: 10px;
    border: 3px solid $blue;
    background: white;
    border-radius: 3px;
    display: none;
    @include mobile {
      display: flex;
    }
    &-button {
      width: 100%;
    }
  }
  .label {
    font-size: 12px;
    font-weight: normal;
    color: darken(#d3cfc4, 10%);
    text-transform: uppercase;
    margin-bottom: 10px;
  }
}
.category-parent {
  padding: 10px 0;
  border-top: 1px solid #f5f6f7;
}
.category-link {
  display: flex;
  font-size: 14px;
  color: #333;
  font-weight: 400;
  cursor: pointer;
  transition: .2s;
  padding: 8px;
  border-radius: 3px;
  margin-bottom: 1px;
  &:hover {
    background: $pink;
  }
  &.nuxt-link-exact-active {
    background: $pink;
  }
  &.big {
    font-size: 16px;
    font-weight: 500;
  }
}
</style>