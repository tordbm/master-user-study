import type { Article } from './types'

export function goToNextRoute(router, route) {
  const routes = router.getRoutes().map((r) => r.path)
  const currentIndex = routes.indexOf(route.path)

  if (currentIndex !== -1 && currentIndex < routes.length - 1) {
    router.push(routes[currentIndex + 1])
  }
}

export function goToPrevRoute(router, route) {
  const routes = router.getRoutes().map((r) => r.path)
  const currentIndex = routes.indexOf(route.path)

  if (currentIndex > 0) {
    router.push(routes[currentIndex - 1])
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
