import { defineStore } from 'pinia'
import { fetchSportsArticles } from '../api/api'
import { mapToGridLayout } from '../utils/utils'
import type { Article } from '../utils/types'

export const useMainStore = defineStore('store', {
  state: () => {
    return {
      loading: false,
      articles: [] as Article[],
      selectedArticles: [] as Article[],
      selectedCategories: [] as number[],
      categoryToIconList: [
        [
          { name: 'Soccer', icon: 'fa-solid fa-futbol' },
          { name: 'Basketball', icon: 'fa-solid fa-basketball' },
        ],
        [
          { name: 'Golf', icon: 'fa-solid fa-golf-ball' },
          { name: 'Fighting', icon: 'fa-solid fa-hand-fist' },
        ],
        [
          { name: 'Hockey', icon: 'fa-solid fa-hockey-puck' },
          { name: 'American Football', icon: 'fa-solid fa-football' },
        ],
      ],
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
    categoryToIcon(category: string) {
      const test = this.categoryToIconList.map((x) =>
        x.find((x) => x.name.toLowerCase() === category)
      )
      console.log(test)
      return ''
    },
  },
})
