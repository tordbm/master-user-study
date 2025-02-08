import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFutbol,
  faBasketball,
  faGolfBall,
  faVolleyball,
  faFootball,
  faHockeyPuck,
} from '@fortawesome/free-solid-svg-icons'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

library.add(
  faFutbol,
  faBasketball,
  faGolfBall,
  faVolleyball,
  faFootball,
  faHockeyPuck
)
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
