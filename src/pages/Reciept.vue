<template>
  <div class="d-flex flex-column position-fixed min-vh-100">
    <ContentLoader :loading="store.loading">
      <h4 class="my-3">
        Your answers have now been submitted and you can safely exit this page.
        Thank you for your participation:)
      </h4>
      <div class="container">Your id: {{ store.recieptId }}</div>
    </ContentLoader>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ContentLoader from '../components/ContentLoader.vue'
import { useMainStore } from '../store/mainStore'

export default defineComponent({
  components: {
    ContentLoader,
  },
  setup() {
    const store = useMainStore()

    return {
      store,
    }
  },
})
</script>
