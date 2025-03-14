import { createRouter, createWebHistory } from 'vue-router'
import SelectArticles from '../pages/SelectArticles.vue'
import StartPage from '../pages/StartPage.vue'
import RecommendArticles from '../pages/RecommendArticles.vue'
import Reciept from '../pages/Reciept.vue'
import SelectCategories from '../pages/SelectCategories.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'startpage',
      component: StartPage,
    },
    {
      path: '/select-cat',
      name: 'select-categories',
      component: SelectCategories,
    },
    {
      path: '/select-art',
      name: 'select-articles',
      component: SelectArticles,
    },
    {
      path: '/recommend-art',
      name: 'recommend-articles',
      component: RecommendArticles,
    },
    {
      path: '/reciept',
      name: 'reciept',
      component: Reciept,
    },
  ],
})

export default router
