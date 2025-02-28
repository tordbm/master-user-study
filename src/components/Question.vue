<template>
  <div :id="'question' + index" class="card">
    <div class="card-body">
      <div class="card-title text-start">
        <b>
          {{ index + 1 + '. ' + question }}
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
            :name="'question' + index"
            :id="'inlineRadio' + index + '-' + optIndex"
            :value="option.value"
            v-model="selectedOption" />
          <label
            class="form-check-label"
            :for="'inlineRadio' + index + '-' + optIndex">
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
    qaId: { type: String, required: true },
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
  computed: {
    selectedOption: {
      get() {
        return this.store.selectedAnswers[this.index] || null
      },
      set(value: string) {
        this.store.setAnswer(this.qaId, value)
      },
    },
  },
})
</script>
