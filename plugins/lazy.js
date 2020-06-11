import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

export default async (context, inject) => {
  Vue.use(VueLazyLoad, {
    preLoad: 0,
    loading: require('@/assets/images/loader.svg'),
    attempt: 1,
    lazyComponent: true,
    observer: true,
    throttleWait: 500,
  })
}