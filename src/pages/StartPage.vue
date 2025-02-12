<template>
  <div class="d-flex flex-column min-vh-100">
    <h4 class="my-3">
      Welcome to my recommender! Please select some sports you are interested
      in!
    </h4>
    <h4
      class="my-3"
      :style="
        store.selectedCategories.length > 2 ? 'color: red' : 'color: black'
      ">
      {{ store.selectedCategories.length }} of 2 selected
    </h4>
    <div
      v-for="(category, rowIndex) in store.categoryToIconList"
      :key="rowIndex"
      class="row mt-3">
      <div class="col-sm-6 mb-3 mb-sm-0">
        <button
          class="btn category-button"
          :class="{
            active: store.selectedCategories.includes(rowIndex * 2),
          }"
          @click="toggleActive(rowIndex * 2)">
          <CategoryCard :header="category[0].name" :icon="category[0].icon" />
        </button>
      </div>
      <div class="col-sm-6">
        <button
          class="btn category-button"
          :class="{
            active: store.selectedCategories.includes(rowIndex * 2 + 1),
          }"
          @click="toggleActive(rowIndex * 2 + 1)">
          <CategoryCard :header="category[1].name" :icon="category[1].icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CategoryCard from '../components/CategoryCard.vue'
import { useMainStore } from '../store/mainStore'

export default defineComponent({
  components: {
    CategoryCard,
  },
  setup() {
    const store = useMainStore()
    return {
      store,
    }
  },
  created() {
    const clicked = localStorage.getItem('selectedCategories')
    if (clicked) {
      this.store.selectedCategories = JSON.parse(clicked).map(Number)
    }
  },
  methods: {
    toggleActive(index: number) {
      this.store.addCategory(index)
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
