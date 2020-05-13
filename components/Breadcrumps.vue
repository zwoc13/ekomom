<template>
  <div class="breadcrumps">
    <div class="columns">
      <div class="column is-12 breadcrumps-list">
        <img class="breadcrumps-home" src="~assets/images/home.svg" />
        <nuxt-link 
          :key="breadcrump.title"
          v-for="(breadcrump, index) in breadcrumps"
          :to="breadcrump.url"
          class="breadcrumps-link"
        >
          <span class="breadcrumps-title">{{ breadcrump.title }}</span>
          <span class="breadcrumps-divider" v-if="index !== breadcrumps.length -1">|</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Breadcrumps',
  methods: {
    ...mapActions({
      setBreadcrumps: 'shop/setBreadcrumps',
      setFilters: 'shop/setFilters',
    })
  },
  computed: {
    ...mapState({
      breadcrumps: state => state.shop.breadcrumps,
    })
  },
  mounted() {
    this.setBreadcrumps(this.$route)
  },
  watch: {
    async $route(to) {
      await this.setBreadcrumps(to)
      await this.setFilters(to.params)
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumps {
  margin: 3rem 0;
  &-list {
    display: flex;
    align-items: center;
  }
  &-divider {
    color: $grey;
  }
  &-home {
    width: 14px;
    margin-right: 10px;
  }
  &-title {
    margin-right: 5px;
  }
  &-link {
    display: flex;
    color: #777;
    margin-right: 5px;
    font-size: 16px;
    font-weight: normal;
    transition: .2s;
    letter-spacing: .5px;
    &:hover {
      color: black;
    }
    @include mobile {
      font-size: 12px;
      line-height: 14px;
    }
  }
}
</style>