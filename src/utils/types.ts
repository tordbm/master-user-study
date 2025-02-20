export interface Article {
  news_id: string
  general_category: string
  title: string
  abstract: string
}

export interface RecommendedArticle {
  recommender: string
  news_id: string
  general_category: string
  title: string
  abstract: string
}
