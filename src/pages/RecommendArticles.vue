<template>
  <div class="d-flex flex-column min-vh-100">
    <h4 class="my-3">Recommended articles based on your selection</h4>
    <ContentLoader :loading="store.loading">
      <div
        v-for="(article, rowIndex) in store.recommendations"
        :key="rowIndex"
        class="row mt-3">
        <div class="col-sm-4 mb-3 mb-sm-0">
          <h2 v-if="rowIndex === 0">{{ store.recommender1 }}</h2>
          <ArticleCard
            :news_id="article[0].news_id"
            :icon="store.categoryToIcon(article[0].general_category)"
            :header="article[0].title"
            :abstract="article[0].abstract" />
        </div>
        <div class="col-sm-4">
          <h2 v-if="rowIndex === 0">{{ store.recommender2 }}</h2>
          <ArticleCard
            :news_id="article[1].news_id"
            :icon="store.categoryToIcon(article[1].general_category)"
            :header="article[1].title"
            :abstract="article[1].abstract" />
        </div>
      </div>
    </ContentLoader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
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
  async created() {
    const likes = this.store.likedArticles

    await this.store.fetchRecommendations(likes)
  },
})
</script>
