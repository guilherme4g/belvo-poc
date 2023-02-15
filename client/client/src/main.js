import Vue from 'vue'
import App from './App.vue'
import '@belvo/belvo-vue-components/dist/vue-components/belvo-vue-components.css'
import BelvoComponentsPlugin from '@belvo/belvo-vue-components'
import vuetify from './plugins/vuetify'

Vue.use(BelvoComponentsPlugin)
console.log('window', window)
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

