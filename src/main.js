import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMeta from 'vue-meta'
import './registerServiceWorker'
import './assets/sass/app.scss'

//font-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faAngleLeft, 
  faAngleRight, 
  faAngleUp, 
  faAngleDown 
} from '@fortawesome/free-solid-svg-icons'

library.add(faAngleLeft, faAngleRight, faAngleUp, faAngleDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)
//end font-awesome

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueMeta)

Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
