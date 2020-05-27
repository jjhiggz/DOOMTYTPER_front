import Vue from 'vue'
import App from './App.vue'
import "nes.css/css/nes.min.css";

// import { Sampler } from 'tone'


// Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

