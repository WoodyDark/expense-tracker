<script setup lang="ts">
const emit = defineEmits<{
  (event: 'click', value: PointerEvent): void
}>()
</script>

<template>
  <button
    class="lg:px-4 lg:py-2 px-1.5 py-3 whitespace-nowrap font-medium rounded-lg cursor-pointer"
    @click="emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>
