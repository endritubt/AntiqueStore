import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _676e865b = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _d84103c0 = () => interopDefault(import('..\\pages\\category.vue' /* webpackChunkName: "pages/category" */))
const _8f555afe = () => interopDefault(import('..\\pages\\owner.vue' /* webpackChunkName: "pages/owner" */))
const _02b9023c = () => interopDefault(import('..\\pages\\products\\index.vue' /* webpackChunkName: "pages/products/index" */))
const _5fda63a4 = () => interopDefault(import('..\\pages\\products\\_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _f1b33dc0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _676e865b,
    name: "about"
  }, {
    path: "/category",
    component: _d84103c0,
    name: "category"
  }, {
    path: "/owner",
    component: _8f555afe,
    name: "owner"
  }, {
    path: "/products",
    component: _02b9023c,
    name: "products"
  }, {
    path: "/products/:id",
    component: _5fda63a4,
    name: "products-id"
  }, {
    path: "/",
    component: _f1b33dc0,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
