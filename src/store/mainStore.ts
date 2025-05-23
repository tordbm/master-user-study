import { defineStore } from 'pinia'
import { fetchRecommendedArticles, fetchSportsArticles } from '../api/api'
import { mapToCorrectColumnLayout, mapToGridLayout } from '../utils/utils'
import type { Article, RecommendedArticle } from '../utils/types'
import { reactive } from 'vue'

export const useMainStore = defineStore('store', {
  state: () => {
    return {
      loading: false,
      prolificId: null as string | null,
      redirectUrl: null as string | null,
      articles: [] as Article[],
      likedArticles: [] as Article[],
      selectedCategories: [] as number[],
      recommendations: [] as RecommendedArticle[],
      recommender1: null as string | null,
      recommender2: null as string | null,
      selectedAnswers: reactive({} as Record<number, string | null>),
      categoryToIconList: [
        [
          { name: 'Soccer', icon: '⚽️' },
          { name: 'Basketball', icon: '🏀' },
          { name: 'Golf', icon: '🏌️‍♀️' },
        ],
        [
          { name: 'Martial Arts', icon: '🥊' },
          { name: 'Hockey', icon: '🏒' },
          { name: 'American Football', icon: '🏈' },
        ],
        [
          { name: 'Baseball', icon: '⚾️' },
          { name: 'Racing', icon: '🏎️' },
          { name: 'Tennis', icon: '🎾' },
        ],
      ],
    }
  },

  actions: {
    async fetchArticles(sports: string[], shown_articles: string[]) {
      this.loading = true
      const response = await fetchSportsArticles(sports, shown_articles)
      if (this.articles.length === 0) {
        this.articles = mapToGridLayout(response)
      } else {
        this.articles = [...this.articles, ...mapToGridLayout(response)]
      }
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
    },
    categoryToImage(category: string) {
      const image = {
        fighting: '/images/martial_arts.png',
        basketball: '/images/basketball.png',
        football: '/images/football.png',
        golf: '/images/golf.png',
        hockey: '/images/hockey.png',
        racing: '/images/racing.png',
        soccer: '/images/soccer.png',
        tennis: '/images/tennis.png',
        baseball: '/images/baseball.png',
        misc: '/images/misc.png',
      }
      return image[category]
    },
    categoryToIcon(category: string) {
      const categoryToIconMap = Object.fromEntries([
        ['misc', 'fa-solid fa-rectangle-list'],
        ['fighting', '🥊'],
        ['football', '🏈'],
        ...this.categoryToIconList
          .flat()
          .map(({ name, icon }) => [name.toLowerCase(), icon]),
      ])

      return categoryToIconMap[category] || 'fa-solid fa-question'
    },
    transformAnswersToRec(questionId: number, answer: string) {
      const answerToRec = {
        LIST1: questionId === 15 ? 'list1' : this.recommender1,
        LIST2: questionId === 15 ? 'list2' : this.recommender2,
        UNSURE: 'unsure',
      }
      this.selectedAnswers[questionId] = answerToRec[answer]
    },
    getShownArticleIds(): string[] {
      return this.articles.flatMap((x) => x.map((x) => x.news_id))
    },
  },
})
