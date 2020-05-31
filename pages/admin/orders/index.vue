<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <div class="title is-3">Список замовлень</div>
          <div class="table-container">
            <table class="table orders">
              <thead>
                <tr>
                  <th></th>
                  <th>Дата</th>
                  <th>Ім'я</th>
                  <th>Номер телефону</th>
                  <th>Вид платежу</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="order._id" v-for="order in orders">
                  <td><nuxt-link :to="`/admin/orders/${order._id}`">Деталі</nuxt-link></td>
                  <td>{{ formatDate(order.createdAt) }}</td>
                  <td>{{ order.name }}</td>
                  <td>{{ order.phone }}</td>
                  <td>{{ payment(order.paymentType) }}</td>
                  <td>{{ status(order.status) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  layout: 'admin',
  middleware: 'verified',
  methods: {
    status(value) {
      const options = {
        'new': 'Нове замовлення',
        'fabrics': 'Замовити тканиину',
        'fillings': 'Замовити наповнювач',
        'postal': 'Відправалено'
      }
      return options[value]
    },
    payment(value) {
      const options = {
        'full': 'Повна передоплата',
        'pre': 'Наложний платіж',
      }

      return options[value]
    },
    formatDate(date) {
      const jsDate = new Date(date)
      const month = jsDate.getMonth() + 1
      const day = jsDate.getDate()
      const year = jsDate.getFullYear()

      return `${day}/${month}/${year}`
    }
  },
  async asyncData({ $axios }) {
    const { orders } = await $axios.$get('/api/orders')

    return {
      orders,
    }
  }
}
</script>

<style lang="scss" scoped>
.orders {
  width: 100%;
}
</style>