<template>
  <div class="d-flex flex-column min-vh-100" @scroll="handleScroll">
    <h2 class="my-3">Step 2</h2>
    <p class="p-large">
      <b>{{ info }}</b>
    </p>
    <p class="p-placeholder">
      **The images used are <u>placeholders</u> and therefore not linked to the
      actual article content, only its category.**
    </p>
    <hr class="my-4" />
    <h4
      class="mt-2 mb-3 sticky-header"
      :style="
        store.likedArticles.length !== 10 ? 'color: red' : 'color: black'
      ">
      {{ store.likedArticles.length }} of 10 selected
    </h4>
    <ContentLoader :loading="store.articles.length === 0" />
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
            height="25rem"
            width="23rem"
            :news_id="article.news_id"
            :image="store.categoryToImage(article.general_category)"
            :header="article.title"
            :abstract="article.abstract" />
        </div>
      </div>
      <ContentLoader :loading="store.loading && store.articles.length < 48" />
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
      sports: [] as string[],
      info: 'Please select 10 articles you find fits your news preference by clicking the "Like" button in the bottom left. To read more, click "Read More". Already read articles will turn light blue. To get more articles, keep scrolling.',
    }
  },
  async created() {
    this.sports = getSportFromIndex(this.store.selectedCategories)
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
<style lang="css" scoped>
.sticky-header {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  padding: 10px;
}

.p-large {
  font-size: large;
}

.p-placeholder {
  font-size: medium;
}
</style>
