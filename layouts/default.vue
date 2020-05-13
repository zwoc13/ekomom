<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer'

export default {
  name: 'Layout',
  components: {
    Header,
    Footer,
  }
}
</script>