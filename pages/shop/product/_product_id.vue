<template>
  <div class="container">
    <Modal :show="showModal" :close="closeModal">
      <div class="form">
        <div class="form-inner" v-if="phone.done">
          <p class="form-title">Готово!</p>
          <p class="form-para">Менеджер передзвонить вам найближчим часом</p>
        </div>
        <div class="form-inner" v-if="!phone.done">
          <div class="field">
            <label class="label">Введіть ваш номер телефону</label>
            <input 
              class="input" 
              :class="{ 'is-danger': phone.error.length > 0 }"
              @click="phone.error = ''"
              type="text"
              v-model="phone.value"
              placeholder="Номер телефону" 
              autocomplete="new-password"
            />
            <div v-if="phone.error.length > 0" class="help is-danger">{{ phone.error }}</div>
          </div>
          <button class="button product-request" @click="sendRequest">Передзвоніть мені</button>
        </div>
      </div>
    </Modal>
    <Breadcrumps />
    <div class="columns product">
      <div class="column is-6">
        <PhotoGallery :photos="product.photos" />
      </div>
      <div class="column is-6">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-items-group">
          <div class="product-items-group-title">Оберіть комплектацію</div>
          <div class="select">
            <select v-model="currentOption">
              <option :key="option.title" :value="i" v-for="(option, i) in product.options">{{ option.title }}</option>
            </select>
          </div>
        </div> 
        <div class="product-items-group">
          <div class="product-items-group-title">В наявності</div>
          <div class='product-tag tag is-light is-medium'>{{ inStore(product.qnt) }}</div>
        </div>
        <div class="product-items-group">
          <p class="product-items-group-title">Що входить в комплект</p>
          <div class="product-items-tags-container">
            <div 
              :key="el.size + ' ' + el.qnt + ' ' + el.item"
              v-for="el in product.options[currentOption].items" 
              class="tag is-light is-medium">
              {{ el.item }} ({{ el.qnt }} шт.) — {{ el.size }} см
            </div>
          </div>
        </div>
        <div class="product-items-group">
          <p class="product-items-group-title">Тканини</p>
          <div class="product-items-tags-container">
            <div
              :key="fabric"
              v-for="fabric in uniqueFabrics(currentOption)"
              class="product-tag tag is-light is-medium"
            >
              {{ fabric }}
            </div>
          </div>
        </div>
        <div class="product-items-group">
          <p class="product-items-group-title">Наповнення</p>
          <div class="product-items-tags-container">
            <div
              :key="filling"
              v-for="filling in uniqueFillings(currentOption)"
              class="product-tag tag is-light is-medium"
            >
              {{ filling }}
            </div>
          </div>
        </div>
        <div class="product-price" v-if="product.qnt > 0">
          <div class="product-price-value">{{ product.options[currentOption].discount || product.options[currentOption].price }} ₴</div>
        </div>
        <div class="product-price" v-if="product.qnt == 0">
          <div class="product-price-missing">Немає в наявності</div>
        </div>
        <div class="product-buttons" v-if="product.qnt > 0">
          <nuxt-link to="/checkout" class="button is-medium" v-if="isAdded">Перейти до покупки</nuxt-link>
          <button class="button product-cart is-medium" v-if="!isAdded" @click="addToCart(product, currentOption)">Додати в корзину</button>
          <button class="button product-buy is-medium" v-if="!isAdded" @click="fastBuy(product, currentOption)">Купити в один клік</button>
        </div>
        <div class="product-buttons product-buttons-wide" v-if="product.qnt == 0">
          <button class="button product-check is-medium" @click="openModal">Уточнити можливість повторного пошиву</button>
        </div>
      </div>
    </div> 
    <RelativeProducts :products="relativeProducts" v-if="relativeProducts.length > 0" />
  </div>
</template>

<script>
import Breadcrumps from '@/components/Breadcrumps'
import PhotoGallery from '@/components/PhotoGallery'
import ProductThumb from '@/components/ProductThumb' 
import RelativeProducts from '@/components/RelativeProducts'
import Modal from '@/components/Modal'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProductPage',
  components: {
    Breadcrumps,
    PhotoGallery,
    ProductThumb,
    RelativeProducts,
    Modal,
  },
  data() {
    return {
      showModal: false,
      currentOption: 0,
      phone: {
        error: '',
        value: '',
        done: false,
      },
    }
  },
  computed: {
    ...mapState({
      cartProducts: state => state.cart.products,
    }),
    isAdded() {
      return this.cartProducts.find(p => p._id === this.product._id)
    },
  },
  methods: {
    ...mapActions({
      addProduct: 'cart/addProduct',
      removeFromCart: 'cart/removeProduct',
    }),
    async addToCart(product, optionIndex) {
      product['optionIndex'] = optionIndex
      await this.addProduct(product)
    },
    async fastBuy(product, optionIndex) {
      product['optionIndex'] = optionIndex
      await this.addToCart(product)
      this.$router.replace('/checkout')
    },
    async sendRequest() {
      const { phone } = this
      const { error, value } = phone

      const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/ig
      const matches = phoneRegex.test(value)

      if (!value.length) this.phone.error = 'Поле не має бути пустим'
      if (!matches) this.phone.error = 'Перевірте правильність вводу номеру'

      if (!this.phone.error) {
        const link = `https://ekomom.com${this.$route.fullPath}`
        const { done } = await this.$axios.$post('/api/availability', {
          phone: phone.value,
          link,
        })

        this.phone.done = true
      }
    },
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    inStore(qnt) {
      const settings = {
        true: 'Так',
        false: 'Ні'
      }
      return settings[qnt > 0]
    },
    uniqueFillings(index) {
      const options = this.product.options[index]
      const uniqueFillings = []
      options.fillings.forEach(filling => {
        const alreadyInList = uniqueFillings.some(unique => unique.includes(filling.forItem))
        if (!alreadyInList) {
          const fillingsList = options.fillings.filter(f => f.forItem === filling.forItem).map(f => f.what)
          uniqueFillings.push(filling.forItem + ' - ' + fillingsList.join(', '))
        }
      })

      return uniqueFillings
    },
    uniqueFabrics(index) {
      const options = this.product.options[index]
      const uniqueFabrics = []
      options.fabrics.forEach(fabric => {
        const alreadyInList = uniqueFabrics.some(unique => unique.includes(fabric.forItem))
        if (!alreadyInList) {
          const fabricsList = options.fabrics.filter(f => f.forItem === fabric.forItem).map(f => f.what)
          uniqueFabrics.push(fabric.forItem + ' - ' + fabricsList.join(', '))
        }
      })

      return uniqueFabrics
    }
  },
  async asyncData({ $axios, params }) {
    const { product_id: id } = params
    const { product } = await $axios.$get(`/api/products/${id}`)
    const { products: relativeProducts } = await $axios.$get(`/api/products/relative/${id}`)

    return {
      product,
      relativeProducts,
    }
  },
  head() {
    const product = this.product
    const status = product.qnt === 0 ? 'Під замовлення' : 'В наявності'
    const title = `${product.name}`
    const description = `${product.name}. ${product.description} ${status}`
    return {
      title,
      meta: [
        { name: 'description', content: description },
        { property: 'og:locale', content: "uk_UA" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: "https://ekomom.com//" },
        { property: "og:site_name", content: "EkoMom" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.form {
  &-title {
    font-size: 30px;
    text-align: center;
    padding-bottom: 15px;
  }
  &-para {
    font-size: 20px;
    text-align: center;
  }
}
.product { 
  margin-top: 3rem;
  margin-bottom: 6rem;
  &-buttons {
    margin-top: 30px;
    width: 50%;
    display: flex;
    flex-direction: column;
    &-wide {
      width: 100%;
    }
    @include mobile {
      width: 100%;
    }
  }
  &-cart {
    background: $brown;
    color: white;
  }
  &-check {
    background: $blue;
    color: white;
    width: 100%;
  }
  &-buy {
    background: $blue;
    margin-top: 10px;
    color: white;
  }
  &-request {
    background: $brown;
    font-weight: 600;
    text-transform: uppercase;
    color: white;
    width: 100%;
  }
  &-tag {
    margin-right: .5rem;
  }
  &-name {
    font-size: 22px;
    font-weight: bolder;
    margin-bottom: 20px;
    font-family: $roboto;
  }
  &-description {
    font-size: 18px;
    color: #999;
    font-weight: normal;
    margin-bottom: 20px;
  }
  &-items {
    &-tags-container {
      display: flex;
      flex-direction: column;
      flex: 0 0 100%;
      align-items: flex-start;
      .tag {
        justify-content: flex-start;
        margin-bottom: .4rem;
      }
    }
  }
  &-items-group {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    &-title {
      font-size: 16px;
      font-weight: 500;
      width: 100%;
      margin-bottom: 10px;
    }
  }
  &-price {
    margin-top: 30px;
    &-missing {
      font-size: 24px;
      font-weight: bold;
    }
    &-title {
      font-weight: bold;
    }
    &-value {
      font-size: 40px;
      font-weight: bolder;
      &-small {
        font-size: 20px;
        font-weight: normal;
        text-decoration: line-through;
      }
    }
    &-discount {
      font-size: 40px;
      line-height: 1;
      font-weight: bolder;
      color: $text-red;
    }
  }
}
</style>