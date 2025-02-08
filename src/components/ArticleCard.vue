<template>
  <div class="card border-primary" style="width: 30rem; height: 20rem">
    <div class="card-body">
      <h5 class="card-title">{{ props.header }}</h5>
      <font-awesome-icon v-if="props.icon" :icon="props.icon" size="2xl" />
      <p class="card-text">
        {{ props.abstract }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  header: string
  icon?: string
  abstract: string
}>()
</script>
