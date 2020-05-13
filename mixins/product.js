import Vue from 'vue'

export default ({
  data() {
    return {
      product: {},
      newItem: {
        item: '',
        qnt: 0,
        size: '',
      },
      newFabric: {
        forItem: '',
        what: '',
      },
      newFilling: {
        forItem: '',
        what: '',
      }
    }
  },
  methods: {
    addItem() {
      const { item, qnt, size } = this.newItem

      this.product.items.push({
        item,
        qnt,
        size
      })

      this.newItem.item = ''
      this.newItem.qnt = 0
      this.newItem.size = ''
    },
    deleteItem(name) { 
      const { items } = this.product
      const filteredItems = items.filter(item => item.item !== name)

      this.product.items = filteredItems
    },
    addFabric() {
      const { forItem, what } = this.newFabric

      this.product.fabrics.push({
        forItem,
        what
      })    

      this.newFabric.forItem = ''
      this.newFabric.what = ''
    },
    addFilling() {
      const { forItem, what } = this.newFilling

      this.product.fillings.push({
        forItem,
        what
      })

      this.newFilling.forItem = ''
      this.newFilling.what = ''
    },
    deleteFabric(forItem, what) {
      const { fabrics } = this.product
      const filteredFabrics = fabrics.filter(fabric => fabric.forItem === forItem && fabric.what !== what)

      this.product.fabrics = filteredFabrics
    },
    deleteFilling(forItem, what) {
      const { fillings } = this.product
      const filteredFillings = fillings.filter(filling => filling.forItem === forItem && filling.what !== what)

      this.product.fillings = filteredFillings
    }
  },
})