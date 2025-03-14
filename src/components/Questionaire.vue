<template>
  <div class="questionaire">
    <h2 class="text-start">Questionaire</h2>
    <div v-for="(item, index) in questions">
      <Question
        class="mb-3"
        :key="index"
        :qaId="index + 1"
        :index="index"
        :question="item.question"
        :options="item.options" />
    </div>
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
<style lang="scss">
.questionaire {
  margin-top: 1rem;
}
</style>
