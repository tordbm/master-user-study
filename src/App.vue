<template>
  <Analytics />
  <PageLayout />
</template>

<script lang="ts">
import PageLayout from './layouts/PageLayout.vue'
import { useRouter, useRoute } from 'vue-router'
import { Analytics } from '@vercel/analytics/vue'

export default {
  components: {
    PageLayout,
    Analytics,
  },
  setup() {
    return {
      router: useRouter(),
      route: useRoute(),
    }
  },
  provide() {
    return {
      router: this.router,
      route: this.route,
    }
  },
}
</script>
