import axios from 'axios'

axios.defaults.baseURL = ' http://127.0.0.1:8000'

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
