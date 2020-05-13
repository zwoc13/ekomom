<template>
  <div class="container">
    <div class="confirmed">
      <div class="title is-3">Ваше замовлення прийнято в роботу</div> 
      <p class="confirmed-para">Ми незабаром Вам передзвонимо для уточенння всіх деталей</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmedPage',
}
</script>

<style lang="scss" scoped>
.confirmed {
  margin-top: 10rem;
  margin-bottom: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;;
  &-para {
    font-size: 20px;
    font-weight: 400;
  }
}
</style>