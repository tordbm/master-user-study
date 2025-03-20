<template>
  <div :id="'question' + index" class="card bg-light">
    <div class="card-body">
      <div class="card-title text-start">
        <b>
          {{ qaId + '. ' + question }}
        </b>
      </div>
      <div class="card-text">
        <div
          v-for="(option, optIndex) in options"
          :key="optIndex"
          class="form-check form-check-inline mt-1">
          <input
            class="form-check-input"
            type="radio"
            :name="'question' + qaId"
            :id="'inlineRadio' + qaId + '-' + optIndex"
            :value="option.value"
            v-model="store.selectedAnswers[qaId]" />
          <label
            class="form-check-label"
            :for="'inlineRadio' + qaId + '-' + optIndex">
            {{ option.text }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '../store/mainStore'

export default defineComponent({
  props: {
    qaId: { type: Number, required: true },
    index: { type: Number, required: true },
    question: { type: String, required: true },
    options: {
      type: Array as () => { value: string; text: string }[],
      required: true,
    },
  },
  setup() {
    const store = useMainStore()
    return { store }
  },
})
</script>
