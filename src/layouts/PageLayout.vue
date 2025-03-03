<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <div
            class="progress mt-3"
            role="progressbar"
            aria-label="Progress"
            aria-valuemin="0"
            aria-valuemax="100">
            <div
              class="progress-bar"
              :style="'width: ' + progressStyling[currentRoute]"></div>
          </div>

          <div class="d-flex align-items-center justify-content-center"></div>
          <RouterView />
          <div
            class="d-flex justify-content-between p-3 bg-white position-fixed bottom-0 start-0 end-0 shadow">
            <button
              class="btn btn-primary"
              @click="prev()"
              :disabled="
                currentRoute === 'startpage' || currentRoute === 'reciept'
              ">
              Previous
            </button>
            <button
              v-if="currentRoute === 'recommend-articles'"
              class="btn btn-success"
              @click="submit()"
              :disabled="isNextDisabled">
              Submit
            </button>
            <button
              v-else
              class="btn btn-primary"
              @click="next()"
              :disabled="isNextDisabled">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { goToNextRoute, goToPrevRoute } from '../utils/utils'
import { useMainStore } from '../store/mainStore'
import { questions, AnswerOptions } from '../utils/questionaire'
import { submitUserStudy } from '../api/api'
import type { Question } from '../utils/types'

const preventOnRoutes = ['select-art', 'recommend-art']

const preventPageUnload = (event: BeforeUnloadEvent) => {
  if (
    preventOnRoutes.includes(window.location.pathname.split('/').pop() || '')
  ) {
    sessionStorage.setItem('reloaded', 'true')
    event.preventDefault()
    event.returnValue = ''
  }
}

const handleVisibilityChange = () => {
  if (
    document.visibilityState === 'hidden' &&
    preventOnRoutes.includes(window.location.pathname.split('/').pop() || '')
  ) {
    sessionStorage.setItem('reloaded', 'true')
  }
}

export default {
  components: {
    RouterLink,
    RouterView,
  },
  setup() {
    const store = useMainStore()
    return {
      store,
    }
  },
  inject: ['router', 'route'],
  data() {
    return {
      progressStyling: {
        startpage: '0%',
        'select-articles': '33.3%',
        'recommend-articles': '66.6%',
        reciept: '100%',
      },
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name
    },
    isNextDisabled() {
      return (
        (this.currentRoute === 'startpage' &&
          this.store.selectedCategories.length !== 3) ||
        (this.currentRoute === 'select-articles' &&
          this.store.likedArticles.length < 1) ||
        (this.currentRoute === 'recommend-articles' &&
          Object.keys(this.store.selectedAnswers).length !==
            questions.length) ||
        this.currentRoute === 'reciept'
      )
    },
  },
  mounted() {
    if (sessionStorage.getItem('reloaded')) {
      sessionStorage.removeItem('reloaded')
      this.router.push('/')
    }
    window.addEventListener('beforeunload', preventPageUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  },
  methods: {
    async submit() {
      this.next()
      this.store.loading = true
      const questionaire: Question[] = Object.entries(
        this.store.selectedAnswers
      ).map(([question_id, response]) => ({
        question_id,
        response: response as AnswerOptions,
      }))
      const response = await submitUserStudy(questionaire)
      this.store.recieptId = response.id
      this.store.loading = false
    },
    prev() {
      goToPrevRoute(this.router, this.route)
    },
    next() {
      window.scrollTo(0, 0)
      goToNextRoute(this.router, this.route)
    },
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', preventPageUnload)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  },
}
</script>
<style scoped>
.container {
  padding-bottom: 80px;
}
</style>
