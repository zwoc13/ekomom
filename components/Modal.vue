<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="close"></div>
    <div class="modal-content">
      <slot />
    </div>
    <div class="modal-close is-large" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: 'ModalContainer',
  props: [ 'show', 'close' ]
}
</script>

<style lang="scss" scoped>
.modal {
  &-content {
    background: white;
    padding: 2rem;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    flex-direction: column;;
  }
}
</style>