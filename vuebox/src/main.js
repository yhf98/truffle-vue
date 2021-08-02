import Vue from 'vue'
import App from './App.vue'
import 'es6-promise'

import DApp from './DApp/index.js';

Vue.prototype.$DApp = DApp;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
