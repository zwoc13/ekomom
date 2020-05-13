<template>
  <div class="admin">
    <aside class="admin-aside admin-aside-mini column is-2 menu">
      <p class="menu-label">Загальне</p>
      <ul class="menu-list">
        <li><nuxt-link to="/" class="admin-link">На головну</nuxt-link></li>
        <li><nuxt-link to="/admin/dashboard" class="admin-link">Статистика</nuxt-link></li>
        <li><nuxt-link to="/admin/orders" class="admin-link">Замовлення</nuxt-link></li>
      </ul>
      <p class="menu-label">Форми</p>
      <ul class="menu-list">
        <li><nuxt-link to="/admin/products" class="admin-link">Товари</nuxt-link></li>
        <li><nuxt-link to="/admin/options" class="admin-link">Категорії Наповнювачі Тканини</nuxt-link></li>
        <li><nuxt-link to="/admin/tasks" class="admin-link">Поточні задачі</nuxt-link></li>
      </ul>
    </aside>
    <main class="admin-content column is-10">
      <header class="admin-header">
        <!-- Notifications go here -->
      </header>
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
}
</script>

<style lang="scss" scoped>
.admin {
  display: flex;
  @include mobile {
    flex-direction: column;
  }
  &-aside {
    width: 20%;
    min-height: 100vh;
    padding: 15px 40px;
    background: $pink;
    @include mobile {
      width: 100%;
      min-height: auto;
    }
  }
  &-content {
    min-height: 100vh;
    width: 80%;
    @include mobile {
      width: 100%;
    }
  }
}
</style>