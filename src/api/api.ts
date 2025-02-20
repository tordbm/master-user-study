import axios from 'axios'
import type { Article, RecommendedArticle } from '../utils/types'

axios.defaults.baseURL = 'https://profound-viki-monclair-f9ab654d.koyeb.app'

export async function fetchSportsArticles(
  sports: string[]
): Promise<Article[]> {
  try {
    const response = await axios.post('/articles', { sports: sports })
    return response.data
  } catch (error) {
    console.error('Error fetching articles: ', error)
    throw error
  }
}

export async function fetchRecommendedArticles(
  likedArticles: string[]
): Promise<RecommendedArticle[]> {
  try {
    const response = await axios.post('/recommend', { news_ids: likedArticles })
    return response.data
  } catch (error) {
    console.error('Error fetching recommendations: ', error)
    throw error
  }
}
