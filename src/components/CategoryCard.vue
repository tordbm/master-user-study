<template>
  <div class="card border-primary" style="width: 15rem; height: 7rem">
    <div class="card-body">
      <h5 class="card-title">{{ props.header }}</h5>
      <h1>
        {{ icon }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  header: string
  icon: string
}>()
</script>
