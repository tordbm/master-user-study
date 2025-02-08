import { defineStore } from 'pinia'
import { fetchSportsArticles } from '../api/api'
import { mapToGridLayout } from '../utils/utils'

export const useMainStore = defineStore('store', {
  state: () => {
    return {
      loading: false,
      articles: [] as Article[],
      selectedArticles: [] as Article[],
      selectedCategories: [] as number[],
    }
  },
  actions: {
    async fetchArticles(sports: string[]) {
      this.loading = true
      const response = await fetchSportsArticles(sports)
      this.articles = mapToGridLayout(response)
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
  },
})
