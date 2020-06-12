<template>
  <div class="checkout">
    <div class="container">
      <div class="columns">
        <div class="checkout-left column is-6">
          <div class="checkout-info">
            <div class="checkout-title">Деталі для доставки</div>
            <div class="field">
              <label class="label">ПІБ</label>
              <input 
                type="text" 
                class="input" 
                :class="{ 'is-danger': errors.name.length > 0}"
                v-model="name"
              />
              <div v-if="errors.name.length > 0" class="help is-danger">{{ errors.name }}</div>
            </div>
            <div class="field">
              <label class="label">Телефон</label>
              <input 
                type="phone" 
                class="input" 
                :class="{ 'is-danger': errors.phone.length > 0 }"
                v-model="phone"
              />
              <div v-if="errors.phone.length > 0" class="help is-danger">{{ errors.phone }}</div>
            </div>
            <div class="field">
              <label class="label">Місто</label>
              <input @keyup="searchCity" type="text" class="input" v-model="city" :class="{ 'is-danger': errors.city.length > 0 }" />
              <div v-if="errors.city.length > 0" class="help is-danger">{{ errors.city }}</div>
              <div class="checkout-values" v-if="np.cities.length">
                <div 
                  @click="setCity(city)" 
                  class="checkout-value" 
                  v-for="city in np.cities" 
                  :key="city.Present"
                >
                  {{ city.Present }}
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Склад Нової Пошти</label>
              <input @focus="searchWarehouse" @keyup="findWarehouse" class="input" v-model="warehouse" :class="{ 'is-danger': errors.warehouse.length > 0 }" />
              <div v-if="errors.warehouse.length > 0" class="help is-danger">{{ errors.warehouse }}</div>
              <div class="checkout-values" v-if="np.warehouses.length">
                <div 
                  @click="setWarehouse(warehouse)"
                  class="checkout-value"
                  v-for="warehouse in np.warehouses"
                  :key="warehouse.SiteKey"
                >
                  {{ warehouse.Description }}
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Спосіб оплати</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" @click="setPaymentType('full')" name="paymentType" />
                  Повна передоплата
                </label>
                <label class="radio">
                  <input type="radio" @click="setPaymentType('pre')" name="paymentType" />
                  Наложний платіж
                </label>
                <div v-if="errors.paymentType.length > 0" class="help is-danger">{{ errors.paymentType }}</div>
              </div>
            </div>
            <div class="field">
              <label class="label">Коментар до замовлення</label>
              <textarea class="textarea" v-model="order.comment"></textarea>
            </div>
          </div>
        </div>
        <div class="checkout-right column is-6">
          <h1 class="checkout-title">Замовлені товари</h1>
          <div class="checkout-products">
            <client-only placeholder="Loading...">
              <CartThumb
                :key="product._id" 
                v-for="product in cartProducts" 
                class="checkout-product" 
                :product="product" 
              />
            </client-only>
            <div class="checkout-footer">
              <div class="checkout-total">{{ total }} ₴</div>
              <button class="button checkout-confirm is-medium" @click="placeOrder">Замовити</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CartThumb from '@/components/CartThumb'

export default {
  name: 'CheckoutPage',
  data() {
    return {
      order: {
        cityName: '',
        cityReference: '',
        paymentType: '',
        comment: '',
      },
      np: {
        cities: [],
        allWarehouses: [],
        warehouses: [],
      },
      errors: {
        name: '',
        phone: '',
        city: '',
        warehouse: '',
        paymentType: '',
      }
    }
  },
  components: {
    CartThumb,
  },
  computed: {
    ...mapState({
      cartProducts: state => state.cart.products,
      user: state => state.cart.user,
      total: state => state.cart.total,
    }),
    name: {
      get() {
        return this.user.name
      },
      set(value) {
        this.$store.commit('cart/setName', value)
      }
    },
    phone: {
      get() {
        return this.user.phone
      },
      set(value) {
        this.$store.commit('cart/setPhone', value)
      }
    },
    city: {
      get() {
        return this.user.city
      },
      set(value) {
        this.$store.commit('cart/setCity', value)
      }
    },
    cityName: {
      get() {
        return this.user.cityName
      },
      set(value) {
        this.$store.commit('cart/setCityName', value)
      }
    },
    cityReference: {
      get() {
        return this.user.cityReference
      },
      set(value) {
        this.$store.commit('cart/setCityReference', value)
      }
    },
    warehouse: {
      get() {
        return this.user.warehouse
      },
      set(value) {
        this.$store.commit('cart/setWarehouse', value)
      }
    },
  },
  async asyncData({ store }) {
    await store.dispatch('cart/getTotal')
  },
  methods: {
    ...mapActions({
      createOrder: 'cart/createOrder',
    }),
    dropErrors() {
      this.errors = {
        name: '',
        phone: '',
        city: '',
        warehouse: '',
        paymentType: '',
      }
    },
    async placeOrder() {
      const { name, phone, city, cityName, cityReference, warehouse, total } = this
      const { paymentType, comment } = this.order
      const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/ig
      
      await this.dropErrors()
      
      if (!name) this.errors.name = 'Заповніть поле з іменем'
      if (!name.includes(' ')) this.errors.name = 'Введіть прізище та ім\'я'
      if (!phoneRegex.test(phone)) this.errors.phone = 'Перевірте правильність вводу номеру телефона'
      if (!city) this.errors.city = 'Заповніть поле з містом' 
      if (!warehouse) this.errors.warehouse = 'Заповніть поле з поштовим відділенням'
      if (!paymentType) this.errors.paymentType = 'Ви не обрали спосіб оплати'

      const noErrors = Object.values(this.errors).every(field => field.length == 0)
      
      if (noErrors) {
        await this.createOrder({ name, phone, city, cityName, cityReference, warehouse, paymentType, comment, products: this.cartProducts, total })
        this.$router.replace('/confirmed')
      }
    },
    setPaymentType(type) {
      this.order.paymentType = type
    },
    searchCity() {
      const { city } = this
      this.$axios.$post(`/api/cities/search`, { city })
        .then(({ cities }) => {
          this.np.cities = cities
        })
        .catch(err => {
          this.errors.city = err
        })
    },
    findWarehouse() {
      const { warehouse } = this
      const pattern = new RegExp(warehouse, 'ig')
      const filteredWarehouses = this.np.allWarehouses.filter(w => {
        return w.Description.match(pattern)
      })
      this.np.warehouses = filteredWarehouses
    },
    searchWarehouse() {
      const { cityName } = this
      this.$axios.$post('/api/warehouses/search', { city: cityName })
        .then(({ warehouses }) => {
          this.np.allWarehouses = warehouses
          this.np.warehouses = warehouses
        })
        .catch(err => {
          this.errors.warehouse = err
        })
    },
    setCity(city) {
      this.city = city.Present
      this.cityName = city.MainDescription
      this.cityReference = city.Ref
      this.np.cities = []
    },
    setWarehouse(warehouse) {
      this.warehouse = warehouse.Description
      this.np.warehouses = []
    },
  }
}
</script>

<style lang="scss" scoped>
.checkout {
  padding: 4.5rem 0;
  &-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  &-total {
    font-size: 32px;
    padding-top: 20px;
    font-weight: 600;
  }
  &-confirm {
    background: $blue;
    margin-top: 20px;
    color: white;
  }
  &-info {
    display: flex;
    flex-direction: column;
  }
  &-right {
    background: #f9f9f9;
    border-radius: 3px;
    padding-left: 30px;
    padding-right: 30px;
  }
  &-title {
    font-size: 28px;
    font-weight: 500;
    padding-top: 15px;
    margin-bottom: 30px;
  }
  &-values {
    display: flex;
    border: 1px solid #b5b5b5;
    flex-direction: column;
    max-height: 320px;
    overflow-y: scroll;
    border-radius: 3px;
  }
  &-value {
    padding: 5px 7px;
    cursor: pointer;
    transition: .3s;
    &:hover {
      background: $pink;
    }
  }
}
</style>