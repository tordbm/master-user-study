<template>
  <div class="questionaire">
    <div class="d-flex w-100 justify-content-center position-relative">
      <h2 class="mx-auto">Questionnaire</h2>
      <div class="position-absolute end-0 mt-2">
        {{ Object.keys(store.selectedAnswers).length }} / 24 answered
      </div>
    </div>

    <div class="question-list">
      <div v-for="(item, index) in paginatedQuestions" :key="index">
        <Question
          class="mb-3"
          :qaId="(currentPage - 1) * questionsPerPage + index + 1"
          :index="(currentPage - 1) * questionsPerPage + index"
          :question="item.question"
          :options="item.options" />
      </div>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
      <div>{{ Object.keys(store.selectedAnswers).length }} / 24 answered</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Question from './Question.vue'
import { questions } from '../utils/questionaire'
import { useMainStore } from '../store/mainStore'

export default defineComponent({
  components: {
    Question,
  },
  setup() {
    const store = useMainStore()

    return {
      store,
    }
  },
  data() {
    return {
      questions,
      currentPage: 1,
    }
  },
  computed: {
    questionsPerPage() {
      return screen.width <= 900 ? 4 : 10
    },
    paginatedQuestions() {
      const start = (this.currentPage - 1) * this.questionsPerPage
      return this.questions.slice(start, start + this.questionsPerPage)
    },

    totalPages() {
      return Math.ceil(this.questions.length / this.questionsPerPage)
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        this.scrollToTop()
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.scrollToTop()
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        this.currentPage--
      }
    },
    scrollToTop() {
      const container = this.$el.querySelector('.question-list')
      if (container) {
        container.scrollTop = 0
      }
    },
  },
})
</script>

<style lang="scss">
.questionaire {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.question-list {
  max-height: auto;
  overflow-y: auto;
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  gap: 10px;
  align-items: center;
}
button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  transition: 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
