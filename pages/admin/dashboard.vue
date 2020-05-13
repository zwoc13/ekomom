<template>
  <div class="container">
    <div class="columns">
      <div class="column">Left</div>
      <div class="column">Right</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  layout: 'admin',
  middleware: 'verified',
}
</script>