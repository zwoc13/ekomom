<template>
  <div class="preloader loader-container" v-if="loading">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.loader-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  &-content {
    height: 50px;
    width: 50px;
  }
}
</style>