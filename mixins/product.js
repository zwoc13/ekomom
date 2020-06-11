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
    addOption() {
      this.product.options.push({
        title: '',
        items: [],
        fillings: [],
        fabrics: [],
        price: 0,
        discount: 0,
      })
    },
    addItem(index) {
      const { item, qnt, size } = this.newItem

      this.product.options[index].items.push({
        item,
        qnt,
        size
      })

      this.newItem.item = ''
      this.newItem.qnt = 0
      this.newItem.size = ''
    },
    deleteItem(name, index) { 
      const { items } = this.product
      const options = this.product.options[index]
      const filteredItems = options.items.filter(item => item.item !== name)

      this.product.options[index].items = filteredItems
    },
    addFabric(index) {
      const { forItem, what } = this.newFabric

      this.product.options[index].fabrics.push({
        forItem,
        what
      })    

      this.newFabric.forItem = ''
      this.newFabric.what = ''
    },
    addFilling(index) {
      const { forItem, what } = this.newFilling

      this.product.options[index].fillings.push({
        forItem,
        what
      })

      this.newFilling.forItem = ''
      this.newFilling.what = ''
    },
    deleteFabric(forItem, what, index) {
      const { fabrics } = this.product.options[index]
      const fabricsIndex = fabrics.findIndex(fabric => fabric.forItem === forItem && fabric.what === what)
      
      fabrics.splice(fabricsIndex, 1)
    },
    deleteFilling(forItem, what, index) {
      const { fillings } = this.product.options[index]
      const fillingsIndex = fillings.findIndex(filling => filling.forItem === forItem && filling.what === what)
      
      fillings.splice(fillingsIndex, 1)
    }
  },
})