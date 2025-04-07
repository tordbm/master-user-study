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

          <RouterView />
          <div
            class="d-flex justify-content-center p-3 bg-white position-fixed bottom-0 start-0 end-0 shadow">
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
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { goToNextRoute } from '../utils/utils'
import { useMainStore } from '../store/mainStore'
import { questions, AnswerOptions } from '../utils/questionaire'
import { submitUserStudy } from '../api/api'
import type { Question } from '../utils/types'

const preventOnRoutes = ['select-cat', 'select-art', 'recommend-art']

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
        'select-categories': '25%',
        'select-articles': '50%',
        'recommend-articles': '75%',
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
        (this.currentRoute === 'select-categories' &&
          this.store.selectedCategories.length !== 3) ||
        (this.currentRoute === 'select-articles' &&
          this.store.likedArticles.length !== 10) ||
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
        question_id: Number(question_id),
        response: this.transformResponseToRec(
          Number(question_id),
          response
        ) as AnswerOptions,
        recommender1: this.store.recommender1,
        recommender2: this.store.recommender2,
      }))
      const response = await submitUserStudy(questionaire)
      this.store.prolificId = response.id
      this.store.redirectUrl = response.redirect_url
      this.store.loading = false
    },
    next() {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
      goToNextRoute(this.router, this.route)
    },
    transformResponseToRec(
      question_id: number,
      response: string
    ): AnswerOptions {
      const answerToRec = {
        LIST1: question_id === 15 ? 'list1' : this.store.recommender1,
        LIST2: question_id === 15 ? 'list2' : this.store.recommender2,
        UNSURE: 'unsure',
      }
      return answerToRec[response]
    },
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', preventPageUnload)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  },
}
</script>
<style scoped>
@media screen and (max-width: 850px) {
  .container {
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 140px;
  }
}
.container {
  padding-bottom: 140px;
}

button {
  --bs-btn-padding-y: 0.75rem;
  --bs-btn-padding-x: 2rem;
  --bs-btn-font-size: 1.5rem;
}
</style>
