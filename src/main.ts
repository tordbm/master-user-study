import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFutbol,
  faBasketball,
  faGolfBall,
  faHandFist,
  faFootball,
  faHockeyPuck,
  faThumbsUp,
  faBaseballBatBall,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as faThumbsUpReg } from '@fortawesome/free-regular-svg-icons'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

library.add(
  faFutbol,
  faBasketball,
  faGolfBall,
  faHandFist,
  faFootball,
  faHockeyPuck,
  faThumbsUp,
  faThumbsUpReg,
  faBaseballBatBall,
  faQuestion
)
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
