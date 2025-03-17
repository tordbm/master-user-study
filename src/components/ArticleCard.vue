<template>
  <div
    class="card border-primary d-flex flex-column"
    style="width: 23rem; height: 25rem; display: flex">
    <div class="card-body d-flex flex-column align-items-center flex-grow-1">
      <img v-if="image" :src="imagePath" class="card-img-top" />
      <h5 class="card-title text-start no-wrap-truncate-text mt-3 mb-0">
        <b>{{ header }}</b>
      </h5>
      <!-- <font-awesome-icon v-if="icon" class="my-3" :icon="icon" size="2xl" /> -->

      <!-- <p class="card-text text-truncate">
        {{ abstract }}
      </p> -->
    </div>
    <div class="d-flex justify-content-between mt-auto">
      <button
        v-if="currentRoute !== 'recommend-articles'"
        class="btn"
        @click="toggleActive(news_id)">
        <font-awesome-icon
          v-if="!store.likedArticles.includes(news_id)"
          icon="fa-regular fa-thumbs-up"
          size="xl" />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-thumbs-up"
          size="xl"
          style="color: green" />
      </button>
      <button
        class="btn btn-link"
        data-bs-toggle="modal"
        :data-bs-target="'#fullArticle' + news_id">
        Read More
      </button>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" :id="'fullArticle' + news_id" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title text-start fs-5">
            {{ header }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body text-start">
          {{ abstract }}
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
    news_id: { type: String, required: true },
    header: { type: String, required: true },
    image: { type: null, String },
    abstract: { type: String, required: true },
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
    toggleActive(id: string) {
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
