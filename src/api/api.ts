import axios from 'axios'
import type { Article, RecommendedArticle } from '../utils/types'

axios.defaults.baseURL = 'https://profound-viki-monclair-f9ab654d.koyeb.app'

async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  let attempt = 0
  while (attempt < retries) {
    try {
      return await fn()
    } catch (error) {
      attempt++
      console.error(`Attempt ${attempt} failed:`, error)
      if (attempt >= retries) throw error
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw new Error('All retry attempts failed')
}

export async function fetchSportsArticles(
  sports: string[]
): Promise<Article[]> {
  return retry(() =>
    axios.post('/articles', { sports }).then((res) => res.data)
  )
}

export async function fetchRecommendedArticles(
  likedArticles: string[]
): Promise<RecommendedArticle[]> {
  return retry(() =>
    axios
      .post('/recommend', { news_ids: likedArticles })
      .then((res) => res.data)
  )
}
