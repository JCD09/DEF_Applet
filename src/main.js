import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store/store.js'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});