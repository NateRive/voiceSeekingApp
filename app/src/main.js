import Vue from 'vue'
import router from './router';
require("./assets/scss/index.scss");
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
