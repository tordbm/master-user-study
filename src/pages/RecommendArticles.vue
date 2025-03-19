<template>
  <div class="d-flex flex-column min-vh-100">
    <div v-if="isMobile && showRotateMessage" class="rotate-device">
      <img
        src="/images/rotate-phone.png"
        alt="Rotate your phone"
        class="rotate-animation" />
      <p>Please flip your device horizontally</p>
    </div>
    <h2 class="my-3">Step 3</h2>
    <p>
      {{ info }}
    </p>
    <ContentLoader :loading="store.loading">
      <div v-if="!isMobile" class="container">
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
                  height="25rem"
                  width="23rem"
                  :news_id="articleRow[0].news_id"
                  :image="store.categoryToImage(articleRow[0].general_category)"
                  :header="articleRow[0].title"
                  :abstract="articleRow[0].abstract" />
              </div>
              <div class="col-sm-6">
                <h2 v-if="rowIndex === 0" class="text-start">List 2</h2>
                <ArticleCard
                  height="25rem"
                  width="23rem"
                  :news_id="articleRow[1].news_id"
                  :image="store.categoryToImage(articleRow[1].general_category)"
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

      <div v-else>
        <div class="row mt-3">
          <!-- List 1 and List 2 Columns -->
          <div class="col-sm-8">
            <div
              v-for="(articleRow, rowIndex) in store.recommendations"
              :key="rowIndex"
              class="row mt-3">
              <div class="col-sm-6 mr-3">
                <h2 v-if="rowIndex === 0" class="text-start">List 1</h2>
                <ArticleCard
                  height="16rem"
                  width="12rem"
                  :news_id="articleRow[0].news_id"
                  :image="store.categoryToImage(articleRow[0].general_category)"
                  :header="articleRow[0].title"
                  :abstract="articleRow[0].abstract" />
              </div>
              <div class="col-sm-6 mr-3">
                <h2 v-if="rowIndex === 0" class="text-start">List 2</h2>
                <ArticleCard
                  height="16rem"
                  width="12rem"
                  :news_id="articleRow[1].news_id"
                  :image="store.categoryToImage(articleRow[1].general_category)"
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
  data() {
    return {
      info: ' Below are two proposed lists of articles based on your previous selection. Please answer the questionaire and click "Submit" when completed',
      isMobile: false,
      showRotateMessage: false,
    }
  },
  async created() {
    this.isMobile = screen.width <= 900
    this.checkOrientation()

    if (this.isMobile) {
      window.addEventListener('resize', this.checkOrientation)
    }

    const likes = this.store.likedArticles

    await this.store.fetchRecommendations(likes)
  },
  methods: {
    checkOrientation() {
      if (this.isMobile) {
        this.showRotateMessage = window.innerHeight > window.innerWidth
      } else {
        this.showRotateMessage = false
      }
    },
  },
  beforeUnmount() {
    if (this.isMobile) {
      window.removeEventListener('resize', this.checkOrientation)
    }
  },
})
</script>
<style scoped>
p {
  font-size: large;
}

.rotate-device {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1rem 2rem;
  border-radius: 10px;
  z-index: 9999;
}

.rotate-animation {
  width: 50px;
  height: 50px;
  animation: rotate 5s infinite linear;
}

@keyframes rotate {
  100% {
    transform: rotate(0deg);
  }
  0% {
    transform: rotate(360deg);
  }
}

@media (orientation: portrait) {
  .rotate-device {
    display: block;
  }
}

@media (orientation: landscape) {
  .rotate-device {
    display: none;
  }
}
</style>
