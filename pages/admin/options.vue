<template>
  <div class="container">
    <Loader :show="isLoading" />
    <div class="columns">
      <div class="column is-6 is-12-mobile">
        <div class="box">
          <p class="title is-3">Категорія</p>
          <form class="form" @submit.prevent="createCategory">
            <div class="field">
              <label class="label">Назва</label>
              <input type="text" class="input" v-model="newCategory.name">
            </div>
            <div class="field">
              <label class="label">Батьківська категорія</label>
              <div class="select is-fullwidth">
                <select v-model="newCategory.parent">
                  <option selected value="null">-----</option>
                  <option :key="category._id" v-for="category in categories" :value="category._id">{{ category.name }}</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label">Опис</label>
              <textarea class="textarea" v-model="newCategory.description"></textarea>
            </div>
            <div class="field file has-name">
              <label class="file-label">
                <input class="file-input" type="file" @change="convertPhoto($event)">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
                <span class="file-name">
                  Upload the file
                </span>
              </label>
            </div>
            <div class="field">
              <img :src="newCategory.image" class="image form-image" />
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-12 is-12-mobile">
        <div class="box">
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Фото</th>
                  <th>Назва</th>
                  <th>Підкатегорії</th>
                  <th>Видалити</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="category._id" v-for="category in categories">
                  <td><img class="table-image" :src="category.jpeg" /></td>
                  <td>{{ category.name }}</td>
                  <td>
                    <div class="subcategory" :key="subcategory._id" v-for="subcategory in category.subcategories">
                      <img class="subcategory-image" :src="subcategory.jpeg" />
                      <p class="subcategory-name">{{ subcategory.name }}</p>
                      <a class="delete is-small" @click="deleteCategory(subcategory._id)"></a>
                    </div>
                  </td>
                  <td class="flex-end">
                    <a class="delete is-medium" @click="deleteCategory(category._id)"></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6 is-12-mobile">
        <div class="box">
          <p class="title is-3">Тканина</p>
          <form class="form" @submit.prevent="createFabric">
            <div class="field">
              <label class="label">Назва</label>
              <input type="text" class="input" v-model="newFabric.name">
            </div>
            <div class="field">
              <label class="label">Опис</label>
              <textarea class="textarea" v-model="newFabric.description"></textarea>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="column is-6 is-12-mobile">
        <div class="box">
          <div class="table-cont">
            <div class="table-container">
              <table class="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Назва</th>
                    <th>Видалити</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="fabric._id" v-for="fabric in fabrics">
                    <td>{{ fabric.name }}</td>
                    <td>
                      <a class="delete is-medium" @click="deleteFabric(fabric._id)"></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6 is-12-mobile">
        <div class="box">
          <p class="title is-3">Наповнювач</p>
          <form class="form" @submit.prevent="createFilling">
            <div class="field">
              <label class="label">Назва</label>
              <input type="text" class="input" v-model="newFilling.name">
            </div>
            <div class="field">
              <label class="label">Опис</label>
              <textarea class="textarea" v-model="newFilling.description"></textarea>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="column is-6 is-12-mobile">
        <div class="box">
          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Видалити</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="filling._id" v-for="filling in fillings">
                  <td>{{ filling.name }}</td>
                  <td>
                    <a class="delete is-medium" @click="deleteFilling(filling._id)"></a>
                  </td>
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
import Loader from '@/components/Loader'

export default {
  name: 'AdminOptions',
  layout: 'admin',
  middleware: 'verified',
  components: { Loader },
  data() {
    return {
      isLoading: false,
      newCategory: { name: '', description: '', image: '', parent: null },
      newFabric: { name: '', description: '' },
      newFilling: { name: '', description: '' },
      categories: [],
      fabrics: [],
      fillings: [],
    }
  },
  async asyncData(ctx) {
    const { categories: fetchedCategories } = await ctx.$axios.$get('/api/categories')
    const { fabrics } = await ctx.$axios.$get('/api/fabrics')
    const { fillings } = await ctx.$axios.$get('/api/fillings')

    const categories = fetchedCategories.map(category => {
      if (!category.parent) {
        return {
          ...category,
          subcategories: fetchedCategories.filter(cat => cat.parent && cat.parent === category._id)
        }
      }
    }).filter(category => category)

    return {
      categories,
      fabrics,
      fillings,
    }
  },
  methods: {
    convertPhoto(e, place = 'newCategory') {
      e.preventDefault()
      const that = this
      const image = e.target.files[0]
      const reader = new FileReader()
      reader.onload = function(e) {
        const dataUrl = e.target.result
        that[place].image = dataUrl
      }
      reader.readAsDataURL(image)
    },
    async createCategory() {
      this.isLoading = true

      const { name, description, image, parent } = this.newCategory
      const { categories } = await this.$axios.$post('/api/categories', { name, description, image, parent })
      this.categories = categories

      this.newCategory.name = ''
      this.newCategory.description = ''
      this.newCategory.image = ''

      this.isLoading = false
    },
    async deleteCategory(id) {
      const { categories } = await this.$axios.$delete(`/api/categories/${id}`) 
      this.categories = categories
    },
    async createFabric() {
      const { name, description } = this.newFabric
      const { fabrics } = await this.$axios.$post('/api/fabrics', { name, description })
      this.fabrics = fabrics
    },
    async deleteFabric(id) {
      const { fabrics } = await this.$axios.$delete(`/api/fabrics/${id}`) 
      this.fabrics = fabrics
    },
    async createFilling() {
      const { name, description } = this.newFilling
      const { fillings } = await this.$axios.$post('/api/fillings', { name, description })
      this.fillings = fillings
    },
    async deleteFilling(id) {
      const { fillings } = await this.$axios.$delete(`/api/fillings/${id}`) 
      this.fillings = fillings
    },
  }
}
</script>

<style lang="scss" scoped>
.table-image {
  width: 60px;
}
.form-image {
  max-width: 100px;
}
.subcategory {
  display: flex;
  align-items: center;
  &-image {
    max-height: 50px;
    padding-right: 5px;
  }
  &-name {
    font-size: 14px;
    padding-right: 5px;
  }
}
.flex-end {
  text-align: right;
}
</style>