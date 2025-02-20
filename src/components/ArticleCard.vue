<template>
  <div
    class="card border-primary d-flex flex-column"
    style="width: 20rem; height: 14rem; display: flex">
    <div class="card-body d-flex flex-column">
      <h6 class="card-title text-start no-wrap-truncate-text">
        {{ header }}
      </h6>
      <font-awesome-icon v-if="icon" class="my-3" :icon="icon" size="2xl" />
      <p class="card-text text-truncate">
        {{ abstract }}
      </p>
    </div>
    <div class="d-flex justify-content-between p-2 mt-auto">
      <button class="btn" @click="toggleActive(news_id)">
        <font-awesome-icon
          v-if="!store.likedArticles.includes(news_id)"
          icon="fa-regular fa-thumbs-up"
          size="xl" />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-thumbs-up"
          size="xl"
          style="color: #e11428" />
      </button>
      <button class="btn btn-link">Read More</button>
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
    icon: { type: null, String },
    abstract: { type: String, required: true },
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
.no-wrap-truncate-text {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
