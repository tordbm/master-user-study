<template>
    <div class="alert alert-light" role="alert">
        <p>{{ props.text }}</p>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>
<style lang="css" scoped>
p {
  font-size: large;
}
</style>