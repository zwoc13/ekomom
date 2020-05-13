<template>
  <div class="dropdown is-hoverable">
    <div class="header-trigger dropdown-trigger">
      <nuxt-link class="header-trigger-link" :to="`/shop/${category.url}`">{{ category.name }}</nuxt-link>
    </div>
    <div class="header-menu dropdown-menu is-fullwidth" id="dropdown-menu" role="menu">
      <div class="header-menu-content dropdown-content">
        <nuxt-link
          class="header-menu-link"
          :key="subcategory._id"
          v-for="subcategory in category.subcategories"
          :to="`/shop/${category.url}/${subcategory.url}`"
        >
          {{subcategory.name}}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderNav',
  props: ['category']
}
</script>

<style lang="scss" scoped>
.header {
  &-trigger-link {
    display: flex;
    padding: 10px 15px;
    font-weight: bold;
    color: $text-dark-brown;
    // text-shadow: 0 0 2px $blue;
    text-transform: uppercase;
    cursor: pointer;
    transition: .2s; 
    &:hover {
      color: darken($text-dark-brown, 20%);
    }
  }
  &-menu {
    padding-top: 0;
    min-width: 60rem;
  }
  &-menu-content {
    border-radius: 0;
  }
  &-menu-link {
    
  }
}
</style>