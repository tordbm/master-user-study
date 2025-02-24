import { defineStore } from 'pinia'
import { fetchRecommendedArticles, fetchSportsArticles } from '../api/api'
import { mapToCorrectColumnLayout, mapToGridLayout } from '../utils/utils'
import type { Article, RecommendedArticle } from '../utils/types'

export const useMainStore = defineStore('store', {
  state: () => {
    return {
      loading: false,
      articles: [] as Article[],
      likedArticles: [] as Article[],
      selectedCategories: [] as number[],
      recommendations: [] as RecommendedArticle[],
      recommender1: null as string | null,
      recommender2: null as string | null,
      categoryToIconList: [
        [
          { name: 'Soccer', icon: 'fa-solid fa-futbol' },
          { name: 'Basketball', icon: 'fa-solid fa-basketball' },
          { name: 'Golf', icon: 'fa-solid fa-golf-ball' },
        ],
        [
          { name: 'Fighting', icon: 'fa-solid fa-hand-fist' },
          { name: 'Hockey', icon: 'fa-solid fa-hockey-puck' },
          { name: 'Football', icon: 'fa-solid fa-football' },
        ],
        [
          { name: 'Baseball', icon: 'fa-solid fa-baseball-bat-ball' },
          { name: 'Racing', icon: 'fa-solid fa-flag-checkered' },
          { name: 'Tennis', icon: 'fa-solid fa-table-tennis-paddle-ball' },
        ],
      ],
    }
  },
  actions: {
    async fetchArticles(sports: string[]) {
      if (this.articles.length > 0) return
      this.loading = true
      const response = await fetchSportsArticles(sports)
      this.articles = mapToGridLayout(response)
      this.loading = false
    },
    async fetchRecommendations(likedArticles: string[]) {
      this.loading = true
      const response = await fetchRecommendedArticles(likedArticles)
      const [recommenders, grid] = mapToCorrectColumnLayout(response)
      this.recommender1 = recommenders[0]
      this.recommender2 = recommenders[1]
      this.recommendations = grid
      this.loading = false
    },
    addCategory(index: number) {
      if (this.selectedCategories.includes(index)) {
        this.selectedCategories = this.selectedCategories.filter(
          (i: number) => i !== index
        )
      } else {
        this.selectedCategories.push(index)
      }
      localStorage.setItem(
        'selectedCategories',
        JSON.stringify(this.selectedCategories)
      )
    },
    categoryToIcon(category: string) {
      const categoryToIconMap = Object.fromEntries([
        ['misc', 'fa-solid fa-rectangle-list'],
        ...this.categoryToIconList
          .flat()
          .map(({ name, icon }) => [name.toLowerCase(), icon]),
      ])

      return categoryToIconMap[category] || 'fa-solid fa-question'
    },
  },
})
