import Vue from 'vue'
import router from './router';
require("./assets/scss/index.scss");
import App from './App.vue'
import { store } from "./store/store";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
