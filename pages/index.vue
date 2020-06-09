<template>
  <div class="body">
    <Banner />
    <NewProducts :newProducts="newProducts" />
    <Categories :categories="categories" />
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import NewProducts from '@/components/NewProducts'
import Categories from '@/components/Categories/Categories'
import { mapState } from 'vuex'

export default {
  name: 'IndexPage',
  components: {
    Banner,
    NewProducts,
    Categories,
  },
  async asyncData({ $axios }) {
    const { products: newProducts } = await $axios.$get('/api/products/new')
    const { categories } = await $axios.$get('/api/categories')
    
    return {
      newProducts,
      categories,
    }
  },
  head() {
    const title = 'EkoMom - інтернет-магазин дитячого тектилю'
    const description = 'Інтернет-магазин дитячого текстилю. Маємо в продажі ортопедичні подушки, кокони, простинки у ліжечко та візок, бортики-подушки, бортики-коси, стебані бортики та багато іншого.'
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