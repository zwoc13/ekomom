<template>
  <header class="header">
    <div class="container">
      <client-only>
        <Modal :show="cart.show" :close="closeCartModal">
          <div class="header-cart-full" v-if="cartProducts.length > 0">
            <div class="header-cart-container" :key="product._id" v-for="product in cartProducts">
              <CartThumb :product="product" />
            </div>
            <div class="header-cart-footer">
              <div class="header-cart-total">{{ total }} ₴</div>
              <button @click="proceedToCheckout" class="button header-cart-checkout">Оформити замовлення</button>
            </div>
          </div>
          <div class="header-cart-empty" v-else>
            <h3>Корзина пуста! :(</h3>
            <p>Щоб додати товар, нажміть кнопку "Додати в корзину" на сторінці любого товару, який Вам до смаку</p>
          </div>
        </Modal>
      </client-only>
      <div class="header-left">
        <HeaderSearch />
      </div>
      <div class="header-center has-text-centered">
        <nuxt-link to="/" class="header-logo">
          <img src="@/assets/images/logo.svg" class="header-logo-image" />
        </nuxt-link>
      </div>
      <div class="header-right">
        <div class="header-cart" @click="openCartModal">
          <img class="header-cart-image" src="@/assets/images/cart.svg" />
          <div class="header-cart-products">
            <span class="header-cart-products-qnt">{{ cartProducts.length }}</span>
          </div>
        </div>
        <div class="header-nav dropdown is-right" :class="{ 'is-active': showDropdown }" @click="openDropdown">
          <div class="dropdown-trigger">
            <button class="header-lang-button button" aria-haspopup="true" aria-controls="dropdown-menu">
              <img class="header-nav-button-image" src="@/assets/images/menu.svg" />
            </button>
          </div>
          <div class="header-menu dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <nuxt-link class="header-menu-link dropdown-item" to="/">Головна</nuxt-link>
              <nuxt-link class="header-menu-link dropdown-item" to="/shop">Магазин</nuxt-link>
              <!-- <nuxt-link class="header-menu-link dropdown-item" to="/cooperation">Співпраця</nuxt-link> -->
              <nuxt-link class="header-menu-link dropdown-item" to="/payment">Доставка, оплата та повернення</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import CartThumb from '@/components/CartThumb'
import HeaderSearch from '@/components/Header/Search'
import Modal from '@/components/Modal'

export default {
  name: 'Header',
  data() {
    return {
      showDropdown: false,
      cart: {
        show: false,
      }
    }
  },
  computed: {
    ...mapState({
      cartProducts: state => state.cart.products,
      total: state => state.cart.total,
    }),
  },
  components: {
    HeaderSearch,
    CartThumb,
    Modal,
  },
  methods: {
    openDropdown() {
      this.showDropdown = !this.showDropdown
    },
    openCartModal() {
      this.cart.show = true
    },
    closeCartModal() {
      this.cart.show = false
    },
    proceedToCheckout() {
      this.cart.show = false
      this.$router.replace('/checkout')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 135px;
  @include mobile {
    height: auto;
    padding-bottom: 30px;
  }
  .container {
    display: flex;
    height: 135px;
    @include mobile {
      height: auto;
      flex-wrap: wrap;
    }
  }
  &-cart {
    display: flex;
    flex-direction: column;
    text-align: center;
    &-empty {
      h3 {
        font-size: 30px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 30px;
      }
      p {
        font-size: 18px;
        text-align: center;
      }
    }
  }
  &-cart-footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #999;
  }
  &-cart-checkout {
    background: $pink;
  }
  &-cart-total {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  &-cart-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  &-lower {
    margin-top: 50px;
    background: $darker-pink;
    border-radius: 3px;
  }
  &-left,
  &-center,
  &-right {
    flex: 0 0 33%;
  }
  &-left,
  &-right {
    display: flex;
    align-items: center;
    @include mobile {
      flex: 0 0 50%;
    }
  }
  &-center {
    @include mobile {
      flex: 0 0 100%;
      order: -1;
      margin-bottom: 1rem;
    }
  }
  &-right {
    justify-content: flex-end;
  }
  &-logo-image {
    margin-top: 20px;
    height: 85px;
  }
  &-lang {
    &-content {
      padding: 0;
    }
    &-image {
      height: 20px      
    }
    &-button {
      border: none;
      &-flag {
        height: 15px;
      }
      &-arrow {
        height: 7px;
        margin-left: 5px;
      }
    }
  }
  &-dropdown-content {
    padding-top: 0;
    padding-bottom: 0;
  }
  &-dropdown-item {
    display: flex;
    align-items: center;
    .header-lang-image {
      margin-right: 10px;
    }
  }
  &-cart {
    display: flex;
    align-items: center;
    position: relative;
    padding: calc(.5em - 1px) 1em calc(.5em - 1px);
    margin-right: 10px;
    cursor: pointer;
    &-image {
      height: 18px;
    }
    &-products {
      position: absolute;
      height: 16px;
      width: 16px;
      right: 5px;
      bottom: 0;
      border-radius: 50%;
      background: black;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      &-qnt {
        font-size: 14px;
      }
    }
  }
  &-nav {
    &-button {
      &-image {
        height: 15px;
      }
    }
  }
  &-menu {
    width: 320px;
    &-link {
      font-size: 18px;
    }
  }
}
</style>