<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <p class="title is-3">Створити товар</p>
          <form class="form columns" @submit.prevent="createProduct">
            <div class="field column is-4">
              <label class="label">Назва</label>
              <input type="text" class="input" v-model="product.name">
            </div>
            <div class="field column is-4">
              <label class="label">Опис</label>
              <input type="text" class="input" v-model="product.description">
            </div>
            <div class="field column is-4">
              <label class="label">Категорія</label>
              <div class="select is-fullwidth">
                <select v-model="product.category">
                  <optgroup :key="category._id" v-for="category in categories" :value="category._id" :label="category.name">
                    <option :value="category._id">{{ category.name }}</option>
                    <option :key="subcategory._id" v-for="subcategory in category.subcategories" :value="subcategory._id">{{ subcategory.name }}</option>
                  </optgroup>
                </select>
              </div>
            </div>
            <div class="field column is-4">
              <label class="label">Кількість</label>
              <input type="number" class="input" v-model="product.qnt" />
            </div>
            <div class="field column is-4">
              <label class="label">Ціна</label>
              <input type="number" class="input" v-model="product.price" />
            </div>
            <div class="field column is-4">
              <label class="label">Акційна ціна</label>
              <input type="number" class="input" v-model="product.discount" />
            </div>
            <div class="field column is-4">
              <label class="label">Комплектація</label>
              <div class="tags-container">
                <div class="tag" v-if="product.items.length == 0">Поки нічого</div>
                <div class="tag" :key="item.item + ' ' + item.size" v-for="item in product.items">
                  {{ item.qnt }} x {{ item.item }} - {{ item.size }}
                  <button class="delete is-small" @click="deleteItem(item.item)"></button>
                </div>
              </div>
              <input type="text" class="input mini-form-input" v-model="newItem.item" placeholder="Назва" />
              <input type="number" class="input mini-form-input" v-model="newItem.qnt" placeholder="Кількість" />
              <input type="text" class="input mini-form-input" v-model="newItem.size" placeholder="Розмір (напр. 20х20)" />
              <button class="button mini-form-button is-link" @click.prevent="addItem">Додати елемент</button>
            </div>
            <div class="field column is-4">
              <label class="label">Використані тканини</label>
              <div class="tags-container">
                <div class="tag" v-if="product.fabrics.length == 0">Поки нічого</div>
                <div class="tag" :key="fabric.for" v-for="fabric in product.fabrics">
                  {{ fabric.forItem }} - {{ fabric.what }}
                  <button class="delete is-small" @click.prevent="deleteFabric(fabric.forItem, fabric.what)"></button>
                </div>
              </div>
              <input type="text" class="input" v-model="newFabric.forItem" placeholder="Елемент" />
              <div class="select mini-form-input is-fullwidth">
                <select v-model="newFabric.what">
                  <option :key="fabric._id" v-for="fabric in fabrics">{{ fabric.name }}</option>
                </select>
              </div>
              <button class="button mini-form-button is-link" @click.prevent="addFabric">Додати тканину</button>
            </div>
            <div class="field column is-4">
              <label class="label">Використані наповнювачі</label>
              <div class="tags-container">
                <div class="tag" v-if="product.fillings.length == 0">Поки нічого</div>
                <div class="tag" :key="filling.for" v-for="filling in product.fillings">
                  {{ filling.forItem }} - {{ filling.what }}
                  <button class="delete is-small" @click.prevent="deleteFilling(filling.forItem, filling.what)"></button>
                </div>
              </div>
              <input type="text" class="input mini-form-input" v-model="newFilling.forItem" placeholder="Елемент" />
              <div class="select mini-form-input is-fullwidth">
                <select v-model="newFilling.what">
                  <option :key="filling._id" v-for="filling in fillings">{{ filling.name }}</option>
                </select>
              </div>
              <button class="button mini-form-button is-link" @click.prevent="addFilling">Додати наповнювач</button>
            </div>
            <div class="field column is-4">
              <div class="file">
                <label class="file-label">
                  <input class="file-input" type="file" multiple @change="convertPhotos($event)">
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                      Choose a file…
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div class="field column is-12">
              <div class="images-container">
                <div class="image-block" :key="image" v-for="image in product.photos">
                  <button class="delete is-small" @click.prevent="removePhoto(image)"></button>
                  <img :src="image" />
                </div>
              </div>
            </div>
            <div class="field column is-12">
              <button class="button is-success is-fullwidth is-medium" @click.prevent="createProduct">Створити</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductMixin from '@/mixins/product'
import { mapState } from 'vuex'

export default {
  name: 'AdminCreateProduct',
  layout: 'admin',
  middleware: 'verified',
  mixins: [ ProductMixin ],
  data() {
    return {
      product: {
        name: '',
        description: '',
        category: '',
        fillings: [],
        items: [],
        fabrics: [],
        qnt: 1,
        price: 0,
        discount: 0,
        photos: [],
      },
    }
  },
  computed: {
    ...mapState({
      categories: state => {
        const parents = state.shop.categories.filter(c => !c.parent)
        const formattedCategories = parents.map(parent => {
          const id = parent._id
          return {
            ...parent,
            subcategories: state.shop.categories.filter(c => c.parent === id)
          }
        })
        return formattedCategories
      },
    })
  },
  async asyncData(ctx) {
    const { fillings } = await ctx.$axios.$get('/api/fillings')
    const { fabrics } = await ctx.$axios.$get('/api/fabrics')

    return {
      fillings,
      fabrics,
      product: {
        name: '',
        description: '', 
        fillings: [],
        items: [],
        fabrics: [],
        qnt: 1,
        price: 0,
        discount: 0,
        photos: [],
      }
    }
  },
  methods: {
    removePhoto(path) {
      const filteredPhotos = this.product.photos.filter(photo => photo !== path)
      this.product.photos = filteredPhotos
    },
    convertPhotos(e) {
      const that = this
      const images = [...e.target.files]
      images.forEach(image => {
        const reader = new FileReader()
        reader.onload = function(e) {
          const dataUrl = e.target.result
          that.product.photos.push(dataUrl)
        }
        reader.readAsDataURL(image)
      })
    },
    async createProduct() {
      const {
        name,
        description,
        category,
        items,
        fillings,
        fabrics,
        qnt,
        price,
        discount,
        photos,
      } = this.product

      if (items.length > 0 && photos.length > 0) {
        const products = await this.$axios.$post('/api/products', { ...this.product })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.form {
  flex-wrap: wrap;
}
.tags-container {
  margin-bottom: 20px;
}
.mini-form {
  &-input,
  &-button {
    margin-top: 10px;
  }
}
.images-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.image-block {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  margin-right: 5px;
  border: 1px solid #ddd;
  .delete {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 1;
  }
}
</style>