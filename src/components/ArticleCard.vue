<template>
  <div
    class="card d-flex flex-column"
    :style="{
      backgroundColor: isClicked ? '#dbeeff' : '#f8f9fa',
      width: width,
      height: height,
      display: 'flex',
    }">
    <div
      class="card-body d-flex flex-column align-items-center flex-grow-1 btn"
      @click="clicked"
      data-bs-toggle="modal"
      :data-bs-target="'#fullArticle' + news_id">
      <img
        v-if="image"
        :src="imagePath"
        class="card-img-top"
        alt="Article Image" />
      <h5 class="card-title text-start no-wrap-truncate-text mt-3 mb-0">
        <b>{{ header }}</b>
      </h5>
    </div>
    <div class="d-flex justify-content-between mt-auto">
      <button
        v-if="currentRoute !== 'recommend-articles'"
        class="btn"
        @click="likeArticle(news_id)">
        <font-awesome-icon
          v-if="!store.likedArticles.includes(news_id)"
          icon="fa-regular fa-thumbs-up"
          size="2xl" />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-thumbs-up"
          size="2xl"
          style="color: green" />
      </button>
      <button
        class="btn btn-link"
        style="font-size: larger"
        @click="clicked"
        data-bs-toggle="modal"
        :data-bs-target="'#fullArticle' + news_id">
        Read More
      </button>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="'fullArticle' + news_id"
    tabindex="-1"
    aria-labelledby="fullArticleLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-body">
          <div class="text-center mb-3">
            <img
              v-if="image"
              :src="imagePath"
              alt="Article Image"
              class="img-fluid" />
          </div>
          <h1 class="modal-title text-start fs-5 mb-3">
            {{ header }}
          </h1>

          <p class="modal-abstract text-start">
            {{ abstract }}
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '../store/mainStore'

export default defineComponent({
  setup() {
    const store = useMainStore()

    return {
      store,
    }
  },
  props: {
    width: { type: String, required: true },
    height: { type: String, required: true },
    news_id: { type: String, required: true },
    header: { type: String, required: true },
    image: { type: null, String },
    abstract: { type: String, required: true },
  },
  data() {
    return {
      isClicked: false,
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name
    },
    imagePath() {
      if (!this.image) return ''
      return this.image
    },
  },
  methods: {
    clicked() {
      this.isClicked = !this.isClicked
    },
    likeArticle(id: string) {
      if (this.store.likedArticles.includes(id)) {
        this.store.likedArticles = this.store.likedArticles.filter(
          (i: string) => i !== id
        )
      } else {
        this.store.likedArticles.push(id)
      }
    },
  },
})
</script>

<style lang="css" scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
}

.card-title {
  min-height: 3rem;
}

.no-wrap-truncate-text {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
