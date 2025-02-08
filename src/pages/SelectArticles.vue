<template>
  <div class="d-flex flex-column min-vh-100">
    <h4 class="my-3">
      Please select some articles you would be interested in reading
    </h4>
    <ContentLoader :loading="store.loading">
      <div
        v-for="(article, rowIndex) in store.articles"
        :key="rowIndex"
        class="row mt-3">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <button
            class="btn category-button"
            :class="{
              active: store.selectedArticles.includes(article[0].news_id),
            }"
            @click="toggleActive(article[0].news_id)">
            <ArticleCard
              :header="article[0].title"
              :abstract="article[0].abstract" />
          </button>
        </div>
        <div class="col-sm-6">
          <button
            class="btn category-button"
            :class="{
              active: store.selectedArticles.includes(article[1].news_id),
            }"
            @click="toggleActive(article[1].news_id)">
            <ArticleCard
              :header="article[1].title"
              :abstract="article[1].abstract" />
          </button>
        </div>
      </div>
    </ContentLoader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import { getSportFromIndex, mapToGridLayout } from '../utils/utils'
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
    console.log(categories)
    if (categories) {
      this.categories = JSON.parse(categories).map(Number)
    }

    const sports = getSportFromIndex(this.categories)
    await this.store.fetchArticles(sports)
  },
  methods: {
    toggleActive(id: string) {
      if (this.store.selectedArticles.includes(id)) {
        this.store.selectedArticles = this.store.selectedArticles.filter(
          (i: string) => i !== id
        )
      } else {
        this.store.selectedArticles.push(id)
      }
    },
  },
})
</script>

<style scoped>
.category-button {
  transition: background-color 0.3s ease;
}

.category-button.active {
  background-color: green !important;
  color: white;
}
</style>
