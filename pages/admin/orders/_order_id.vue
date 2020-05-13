<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <div class="title is-4">Деталі замовлення {{ order._id }}</div>
          <div class="order">
            <div class="order-user">
              <div class="order-block">
                <div class="order-block-title">Покупець</div>
                <div class="order-block-value">{{ order.name }}</div>
              </div>
              <div class="order-block">
                <div class="order-block-title">Номер телефону</div>
                <div class="order-block-value">{{ order.phone }}</div>
              </div>
              <div class="order-block">
                <div class="order-block-title">Вид оплати</div>
                <div class="order-block-value">{{ payment(order.paymentType) }}</div>
              </div>
              <div class="order-block">
                <div class="order-block-title">Місто</div>
                <div class="order-block-value">{{ order.city }}</div>
              </div>
              <div class="order-block">
                <div class="order-block-title">Відділення НП</div>
                <div class="order-block-value">{{ order.warehouse }}</div>
              </div>
              <div class="order-block">
                <div class="order-block-title">Коментар до замовлення</div>
                <div class="order-block-value">{{ order.comment }}</div>
              </div>
            </div>
            <div class="title is-6">Вибрані товари</div>
            <div class="order-products">
              <div class="order-products-head">
                <div class="order-products-td photo">Фото</div>
                <div class="order-products-td name">Назва</div>
                <div class="order-products-td price">Ціна</div>
                <div class="order-products-td discount">Акційна ціна</div>
                <div class="order-products-td qnt">Кількість на складі</div>
                <div class="order-products-td remove">Видалити</div>
              </div>
              <OrderProduct :key="product._id" v-for="product in products" :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderProduct from '@/components/OrderProduct'

export default {
  name: 'OrderDetails',
  layout: 'admin',
  middleware: 'verified',
  components: {
    OrderProduct,
  },
  methods: {
    payment(value) {
      const options = {
        'full': 'Повна передоплата',
        'pre': 'Наложний платіж'
      }
      return options[value]
    },
    removeFromOrder(id) {
      const modifiedProductsList = products.filter(product => product._id !== id)
      // Send modification request
    },
  },
  async asyncData({ params, $axios }) {
    const { order } = await $axios.$get('/api/orders/' + params.order_id)
    const productsPromises = order.products.map(async orderProduct => {
      const id = orderProduct.id
      const { product } = await $axios.$get(`/api/products/${id}`)
      return product
    })
    const products = await Promise.all(productsPromises)

    return {
      order,
      products,
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  margin-top: 50px;
  &-delete {
    display: flex;
    align-items: center;
    border: 1px solid #333;
    border-radius: 3px;
    width: 200px;
    padding: 10px;
    cursor: pointer;
    &-image {
      height: 30px;
      margin-left: 10px;
    }
  }
  &-user {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &-block {
    display: flex;
    width: 30%;
    flex-direction: column;
    margin-block: 30px;
    &-title {
      font-weight: 600;
    }
  }
  &-products {
    &-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      border-bottom: 1px solid #333;
    }
    &-td {
      &.photo { flex: 0 0 70px; }
      &.name { flex: 0 0 100px; }
      &.price { flex: 0 0 80px; }
      &.discount { flex: 0 0 80px; }
      &.qnt { flex: 0 0 80px; }
    }
  }
}
</style>