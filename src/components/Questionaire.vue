<template>
  <div class="questionaire">
    <div v-for="(item, index) in questions">
      <Question
        class="mb-3"
        :key="index"
        :qaId="item.qaId + index"
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
  margin-top: 4rem;
}
</style>
