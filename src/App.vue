<template>
  <PageLayout />
</template>

<script lang="ts">
import PageLayout from './layouts/PageLayout.vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  components: {
    PageLayout,
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
