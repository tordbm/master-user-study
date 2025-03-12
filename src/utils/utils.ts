import type { Article, RecommendedArticle } from './types'

export function goToNextRoute(router, route) {
  const routes = router.getRoutes().map((r) => r.path)
  const currentIndex = routes.indexOf(route.path)

  if (currentIndex !== -1 && currentIndex < routes.length - 1) {
    router.push(routes[currentIndex + 1])
  }
}

export function getSportFromIndex(sports: number[]): string[] {
  const sportsMap = {
    '0': 'soccer',
    '1': 'basketball',
    '2': 'golf',
    '3': 'fighting',
    '4': 'hockey',
    '5': 'football',
    '6': 'baseball',
    '7': 'racing',
    '8': 'tennis',
    '9': 'misc',
  }
  return sports.map((x) => sportsMap[x])
}

export function mapToGridLayout(articles: Article[]): Article[][] {
  const grid: Article[][] = []

  for (let i = 0; i < articles.length; i += 3) {
    grid.push(articles.slice(i, i + 3))
  }
  return grid
}

export function mapToCorrectColumnLayout(
  articles: RecommendedArticle[]
): [string[], RecommendedArticle[][]] {
  const grid: RecommendedArticle[][] = []

  const uniqueRecommenders = [
    ...new Set(articles.map((article) => article.recommender)),
  ]
  if (uniqueRecommenders.length !== 2) {
    throw new Error('Expected exactly two unique recommender values')
  }

  const [recommenderA, recommenderB] = uniqueRecommenders

  const groupA = articles.filter(
    (article) => article.recommender === recommenderA
  )
  const groupB = articles.filter(
    (article) => article.recommender === recommenderB
  )

  const maxRows = Math.max(groupA.length, groupB.length)

  for (let i = 0; i < maxRows; i++) {
    grid.push([groupA[i] || null, groupB[i] || null])
  }

  return [uniqueRecommenders, grid]
}
