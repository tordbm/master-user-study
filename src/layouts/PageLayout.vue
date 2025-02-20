<template>
  <main>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/"></RouterLink>
        </nav>
      </div>
    </header>

    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <div
            class="progress mt-3"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow="20"
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
              :disabled="currentRoute === 'startpage'">
              Previous
            </button>
            <button
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
        startpage: '20%',
        'select-articles': '40%',
        'recommend-articles': '60%',
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
          this.store.selectedCategories.length !== 2) ||
        (this.currentRoute === 'select-articles' &&
          this.store.likedArticles.length < 1)
      )
    },
  },
  methods: {
    prev() {
      goToPrevRoute(this.router, this.route)
    },
    next() {
      goToNextRoute(this.router, this.route)
    },
  },
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.container {
  padding-bottom: 80px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
