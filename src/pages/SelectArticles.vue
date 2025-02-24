<template>
  <div class="d-flex flex-column min-vh-100">
    <h4 class="my-3">
      Please like some articles you would be interested in reading
    </h4>
    <ContentLoader :loading="store.loading">
      <div class="container">
        <div
          v-for="(articleRow, rowIndex) in store.articles"
          :key="rowIndex"
          class="row d-flex justify-content-center mt-3">
          <div
            v-for="(article, colIndex) in articleRow"
            :key="colIndex"
            class="col-sm-4 mx-auto d-flex justify-content-center">
            <ArticleCard
              :news_id="article.news_id"
              :icon="store.categoryToIcon(article.general_category)"
              :header="article.title"
              :abstract="article.abstract" />
          </div>
        </div>
      </div>
    </ContentLoader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import { getSportFromIndex } from '../utils/utils'
import ContentLoader from '../components/ContentLoader.vue'
import { useMainStore } from '../store/mainStore'

export default defineComponent({
  components: {
    ArticleCard,
    ContentLoader,
  },
  setup() {
    const store = useMainStore()
    return {
      store,
    }
  },
  data() {
    return {
      categories: [] as number[],
    }
  },
  async created() {
    const categories = localStorage.getItem('selectedCategories')
    if (categories) {
      this.categories = JSON.parse(categories).map(Number)
    }

    const sports = getSportFromIndex(this.categories)
    await this.store.fetchArticles(sports)
  },
})
</script>
