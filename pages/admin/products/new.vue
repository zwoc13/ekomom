<template>
  <div class="container">
    <Loader :show="isLoading" />
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
            <div class="options-container" :key="i" v-for="(option, i) in product.options">
              <div class="field column is-4">
                <label class="label">Назва комплектації</label>
                <input type="text" class="input" v-model="product.options[i].title" />
              </div>
              <div class="field column is-4">
                <label class="label">Ціна</label>
                <input type="number" class="input" v-model="product.options[i].price" />
              </div>
              <div class="field column is-4">
                <label class="label">Акційна ціна</label>
                <input type="number" class="input" v-model="product.options[i].discount" />
              </div>
              <div class="field column is-4">
                <label class="label">Комплектація</label>
                <div class="tags-container">
                  <div class="tag" v-if="product.options[i].items.length == 0">Поки нічого</div>
                  <div class="tag" :key="item.item + ' ' + item.size" v-for="item in product.options[i].items">
                    {{ item.qnt }} x {{ item.item }} - {{ item.size }}
                    <button class="delete is-small" @click="deleteItem(item.item, i)"></button>
                  </div>
                </div>
                <div class="tags-fast">
                  <div class="tags-fast-line" :key="tag.item + ' ' + tag.size + ' ' + tag.qnt" v-for="tag in fastItems" @click="addItemFast(tag, i)">{{ tag.item }} ({{tag.qnt}} шт.) - {{tag.size}} см</div>
                </div>
                <input type="text" class="input mini-form-input" v-model="newItem.item" placeholder="Назва" />
                <input type="number" class="input mini-form-input" v-model="newItem.qnt" placeholder="Кількість" />
                <input type="text" class="input mini-form-input" v-model="newItem.size" placeholder="Розмір (напр. 20х20)" />
                <button class="button mini-form-button is-link" @click.prevent="addItem(i)">Додати елемент</button>
              </div>
              <div class="field column is-4">
                <label class="label">Використані тканини</label>
                <div class="tags-container">
                  <div class="tag" v-if="product.options[i].fabrics.length == 0">Поки нічого</div>
                  <div class="tag" :key="fabric.for" v-for="fabric in product.options[i].fabrics">
                    {{ fabric.forItem }} - {{ fabric.what }}
                    <button class="delete is-small" @click.prevent="deleteFabric(fabric.forItem, fabric.what, index)"></button>
                  </div>
                </div>
                <div class="select mini-form-input is-fullwidth">
                  <select v-model="newFabric.forItem">
                    <option :key="item.item" v-for="item in product.options[i].items">{{ item.item }}</option>
                  </select>
                </div>
                <div class="select mini-form-input is-fullwidth">
                  <select v-model="newFabric.what">
                    <option :key="fabric._id" v-for="fabric in fabrics">{{ fabric.name }}</option>
                  </select>
                </div>
                <button class="button mini-form-button is-link" @click.prevent="addFabric(i)">Додати тканину</button>
              </div>
              <div class="field column is-4">
                <label class="label">Використані наповнювачі</label>
                <div class="tags-container">
                  <div class="tag" v-if="product.options[i].fillings.length == 0">Поки нічого</div>
                  <div class="tag" :key="filling.for" v-for="filling in product.options[i].fillings">
                    {{ filling.forItem }} - {{ filling.what }}
                    <button class="delete is-small" @click.prevent="deleteFilling(filling.forItem, filling.what, i)"></button>
                  </div>
                </div>
                <div class="select mini-form-input is-fullwidth">
                  <select v-model="newFilling.forItem">
                    <option :key="item.item" v-for="item in product.options[i].items">{{ item.item }}</option>
                  </select>
                </div>
                <div class="select mini-form-input is-fullwidth">
                  <select v-model="newFilling.what">
                    <option :key="filling._id" v-for="filling in fillings">{{ filling.name }}</option>
                  </select>
                </div>
                <button class="button mini-form-button is-link" @click.prevent="addFilling(i)">Додати наповнювач</button>
              </div>
            </div>
            <div class="add-option" @click="addOption">
              <span class="add-option-plus">+</span>
              <span class="add-option-text">Додати опцію</span>
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
import Loader from '@/components/Loader'
import { mapState } from 'vuex'

export default {
  name: 'AdminCreateProduct',
  layout: 'admin',
  middleware: 'verified',
  mixins: [ ProductMixin ],
  components: { Loader },
  data() {
    return {
      isLoading: false,
      product: {
        name: '',
        description: '',
        category: '',
        qnt: 1,
        photos: [],
        options: [{
          fillings: [],
          items: [],
          fabrics: [],
          price: 0,
          discount: 0,
        }]
      },
      fastItems: [
        { qnt: 1, item: 'Плед', size: '100x80' },
        { qnt: 1, item: 'Вкладиш', size: '100x80' },
        { qnt: 8, item: 'Бортики-подушки', size: '30x30' },
        { qnt: 12, item: 'Бортики-подушки', size: '30x30' },
        { qnt: 1, item: 'Кокон', size: '100x75' },
        { qnt: 1, item: 'Бортик-коса', size: '120x20' },
        { qnt: 1, item: 'Простинка', size: '120x60x10' },
      ]
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
    }),
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
        options: [{
          fillings: [],
          items: [],
          fabrics: [],
          price: 0,
          discount: 0,
        }],
        qnt: 1,
        photos: [],
      }
    }
  },
  methods: {
    items() {
      const product = this.product
      const items = product.items
      const itemsList = items.map(item => item.item)
      return itemsList
    },
    addItemFast(tag, index) {
      const { item, qnt, size } = tag
      this.product.options[index].items.push({
        item,
        qnt,
        size,
      })
    },
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
        options,
        qnt,
        photos,
      } = this.product

      if (options.length > 0 && photos.length > 0) {
        this.isLoading = true

        const products = await this.$axios.$post('/api/products', { ...this.product })

        this.isLoading = false
        this.$router.replace('/admin/products')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.add-option {
  margin: 1rem 0;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex: 0 0 100%;
  justify-content: center;
  cursor: pointer;
  border: 1px solid $sand;
  transition: .4s;
  &:hover {
    background: $sand;
  }
  &-plus {
    font-size: 30px;
    color: green;
    margin-right: 10px;
  }
  &-text {
    font-size: 18px;
    font-weight: bold;
  }
}
.options-container {
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid $blue;
  display: flex;
  flex-wrap: wrap;
}
.tags {
  &-fast {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    &-line {
      font-size: 12px;
      color: $blue;
      border-bottom: 1px dashed $blue;
      cursor: pointer;
      margin-bottom: .2rem;
    }
  }
}
.form {
  flex-wrap: wrap;
}
.tags-container {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.tag {
  margin-bottom: 5px;
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