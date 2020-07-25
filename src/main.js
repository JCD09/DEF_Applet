import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js';

new Vue({
  el: '#app',
  store, // include store into the app component so it is accessible to all of the elements?
  render: h => h(App)
});