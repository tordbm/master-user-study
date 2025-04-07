<template>
  <div class="d-flex flex-column min-vh-100">
    <div class="container">
      <ContentLoader class="mt-5" :loading="store.loading">
        <h4 class="my-3">
          Your answers have now been submitted and you can safely exit this
          page. Thank you for your participation:)
        </h4>

        <div class="mb-3">
          <div>Your Prolific completion id:</div>
          <div class="d-flex justify-content-center mt-3">
            <div class="d-flex align-items-center">
              <input
                :value="store.prolificId"
                class="form-control form-control-sm me-2 w-auto"
                disabled />
              <button class="btn btn-outline-secondary btn-sm" @click="copyId">
                <font-awesome-icon icon="fa-solid fa-copy"></font-awesome-icon>
              </button>
            </div>
          </div>
        </div>
        <small v-if="copySuccess" class="text-success mt-1 d-block">
          Copied to clipboard!
        </small>

        <button type="button" class="btn btn-link" @click="redirect">
          Redirect back to Prolific
        </button>
      </ContentLoader>
    </div>
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
  data() {
    return {
      copySuccess: false,
    }
  },
  computed: {
    store() {
      return useMainStore()
    },
  },
  methods: {
    async copyId() {
      try {
        await navigator.clipboard.writeText(this.store.prolificId)
        this.copySuccess = true
        setTimeout(() => {
          this.copySuccess = false
        }, 2000)
      } catch (err) {
        console.error('Copy failed:', err)
      }
    },
    redirect() {
      window.open(this.store.redirectUrl, '_blank')
    },
  },
})
</script>
