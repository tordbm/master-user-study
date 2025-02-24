<template>
  <div :id="'question' + index" class="card">
    <div class="card-body">
      <div class="card-text">
        {{ question }}
      </div>
      <div
        v-for="(option, index) in options"
        :key="index"
        class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          name="inlineRadioOptions"
          :id="'inlineRadio' + index"
          :value="option.value"
          v-model="selectedOption" />
        <label class="form-check-label" :for="'inlineRadio' + index">{{
          option.text
        }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '../store/mainStore'

export default defineComponent({
  setup() {
    const store = useMainStore()
    return {
      store,
    }
  },
  props: {
    index: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: Array<Object>, required: true },
  },
  data() {
    return { selectedOption: null }
  },
  watch: {
    selectedOption(newValue) {
      console.log(newValue)
    },
  },
})
</script>
