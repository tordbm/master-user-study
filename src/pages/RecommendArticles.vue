<template>
  <div class="d-flex flex-column min-vh-100">
    <h4 class="my-3">Recommended articles based on your selection</h4>
    <ContentLoader :loading="store.loading">
      <div class="container">
        <div class="row mt-3">
          <!-- List 1 and List 2 Columns -->
          <div class="col-sm-8">
            <div
              v-for="(articleRow, rowIndex) in store.recommendations"
              :key="rowIndex"
              class="row mt-3">
              <div class="col-sm-6">
                <h2 v-if="rowIndex === 0" class="text-start">List 1</h2>
                <ArticleCard
                  :news_id="articleRow[0].news_id"
                  :icon="store.categoryToIcon(articleRow[0].general_category)"
                  :header="articleRow[0].title"
                  :abstract="articleRow[0].abstract" />
              </div>
              <div class="col-sm-6">
                <h2 v-if="rowIndex === 0" class="text-start">List 2</h2>
                <ArticleCard
                  :news_id="articleRow[1].news_id"
                  :icon="store.categoryToIcon(articleRow[1].general_category)"
                  :header="articleRow[1].title"
                  :abstract="articleRow[1].abstract" />
              </div>
            </div>
          </div>

          <div class="col-sm-4">
            <Questionaire />
          </div>
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
import Questionaire from '../components/Questionaire.vue'

export default defineComponent({
  components: {
    ArticleCard,
    ContentLoader,
    Questionaire,
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
