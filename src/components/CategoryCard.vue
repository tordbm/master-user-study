<template>
  <div class="card border-primary" style="width: 18rem; height: 6rem">
    <div class="card-body">
      <h5 class="card-title">{{ props.header }}</h5>
      <font-awesome-icon :icon="props.icon" size="2xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  header: string
  icon: string
}>()
</script>
