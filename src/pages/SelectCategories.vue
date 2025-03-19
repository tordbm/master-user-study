<template>
  <div class="d-flex flex-column min-vh-100">
    <h2 class="my-3">Step 1</h2>
    <p>
      {{ info }}
    </p>
    <h4
      class="my-3"
      :style="
        store.selectedCategories.length !== 3 ? 'color: red' : 'color: black'
      ">
      {{ store.selectedCategories.length }} of 3 selected
    </h4>
    <div class="container">
      <div
        v-for="(category, rowIndex) in store.categoryToIconList"
        :key="rowIndex"
        class="row mt-3">
        <div v-for="(item, index) in category" :key="index" class="col-sm-4">
          <button
            class="btn category-button"
            :class="{
              active: store.selectedCategories.includes(rowIndex * 3 + index),
            }"
            @click="toggleActive(rowIndex * 3 + index)">
            <CategoryCard :header="item.name" :icon="item.icon" />
          </button>
        </div>
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
  data() {
    return {
      info: 'Please click on 3 sports you are interested in reading news articles about',
    }
  },
  methods: {
    toggleActive(index: number) {
      this.store.addCategory(index)
    },
  },
})
</script>

<style lang="css" scoped>
.category-button {
  transition: background-color 0.3s ease;
  --bs-btn-padding-y: 0.75rem;
}

p {
  font-size: large;
}

.category-button.active {
  background-color: green !important;
  color: white;
}
</style>
