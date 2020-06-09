<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-nav has-text-centered">
        <nuxt-link class="footer-link" to="/">Головна</nuxt-link>
        <nuxt-link class="footer-link" to="/payment">Доставка, оплата та повернення</nuxt-link>
        <!-- <nuxt-link class="footer-link" to="/about">Про нас</nuxt-link>
        <nuxt-link class="footer-link" to="/contacts">Контакти</nuxt-link>
        <nuxt-link class="footer-link" to="/blog">Блог</nuxt-link> -->
      </div>
      <div class="footer-social has-text-centered">
        <a class="footer-social-link" href="https://www.instagram.com/eko_mom/">
          <img src="@/assets/images/insta.svg" />
        </a>
        <!-- <a class="footer-social-link" href="https://www.instagram.com/eko_mom/">
          <img src="@/assets/images/telegram.svg" />
        </a> -->
        <a class="footer-social-link" href="https://www.facebook.com/eko.mom.km/">
          <img src="@/assets/images/fb.svg" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
.footer {
  .container {
    flex-direction: column;
  }
  &-nav {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  &-social {
    display: flex;
    justify-content: center;
    margin-top: 45px;
  }
  &-link {
    color: $link-color;
    font-size: 24px;
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
    line-height: 42px;
    &:hover {
      color: lighten($link-color, 10%);
    }
  }
  &-social-link {
    width: 45px;
    height: 45px;
    &:not(:last-child) {
      margin-right: 20px
    }
  }
}
</style>