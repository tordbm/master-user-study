<template>
  <div v-for="(item, index) in questions">
    <Question
      :index="index"
      :question="item.question"
      :options="item.options" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Question from './Question.vue'
import { questions } from '../utils/questionaire'

export default defineComponent({
  setup() {
    return { questions }
  },
  components: {
    Question,
  },
})
</script>
