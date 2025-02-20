<template>
  <div class="d-flex flex-column min-vh-100">
    <h4 class="my-3">
      Please like some articles you would be interested in reading
    </h4>
    <ContentLoader :loading="store.loading">
      <div
        v-for="(article, rowIndex) in store.articles"
        :key="rowIndex"
        class="row mt-3">
        <div class="col-sm-4 mb-3 mb-sm-0">
          <ArticleCard
            :news_id="article[0].news_id"
            :icon="store.categoryToIcon(article[0].general_category)"
            :header="article[0].title"
            :abstract="article[0].abstract" />
        </div>
        <div class="col-sm-4">
          <ArticleCard
            :news_id="article[1].news_id"
            :icon="store.categoryToIcon(article[1].general_category)"
            :header="article[1].title"
            :abstract="article[1].abstract" />
        </div>
        <div class="col-sm-4">
          <ArticleCard
            :news_id="article[2].news_id"
            :icon="store.categoryToIcon(article[2].general_category)"
            :header="article[2].title"
            :abstract="article[2].abstract" />
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
