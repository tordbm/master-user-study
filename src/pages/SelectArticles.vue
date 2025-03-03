<template>
  <div class="d-flex flex-column min-vh-100" @scroll="handleScroll">
    <h4 class="my-3">
      Please like some articles you would be interested in reading
    </h4>

    <div v-if="store.articles.length > 0" class="container">
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
      <ContentLoader :loading="store.loading" />
    </div>
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
      sports: [] as string[],
    }
  },
  async created() {
    const categories = localStorage.getItem('selectedCategories')
    if (categories) {
      this.categories = JSON.parse(categories).map(Number)
    }

    this.sports = getSportFromIndex(this.categories)
    await this.store.fetchArticles(this.sports, [])
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    async fetchMore() {
      if (this.store.loading) return
      await this.store.fetchArticles(
        this.sports,
        this.store.getShownArticleIds()
      )
    },
    handleScroll() {
      const bottomOfWindow =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
      if (bottomOfWindow) {
        this.fetchMore()
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
})
</script>
