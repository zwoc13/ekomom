<template>
  <div class="shop-sorter">
    <div class="shop-sorting-field">
      <label class="shop-label">Сортуваня товарів: </label>
      <div class="select shop-select-container">
        <select class="shop-select" @change="setSorting($event.target.value)">
          <option value="">Не сортувати</option>
          <option value="new:asc">Спочатку нові</option>
          <option value="price:asc">Від дешевих до дорогих</option>
          <option value="price:desc">Від дорогих до дешевих</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ShopSorter',
  methods: {
    ...mapActions({
      setSorting: 'shop/setSorting'
    })
  }
}
</script>

<style lang="scss" scoped>
.shop-sorter {
  display: flex;
  justify-content: flex-end;
}
.shop-label {
  font-size: 14px;
  color: $sand;
  margin-right: 10px;
}
.shop-select-container {
  height: 2rem; 
}
.shop-select {
  height: 2rem;
  padding: 0 5px;
  font-size: 14px;
  border: 0;
  border-bottom: 1px dashed $sand;
  border-radius: 0;
  &:focus {
    outline: none;
    box-shadow: none;
  }
}
.shop-sorting-field {
  display: flex;
  align-items: center;
}
</style>