<script setup lang="ts">
const emit = defineEmits<{
  (event: 'click', value: PointerEvent): void
}>()
</script>

<template>
  <button class="px-4 py-2 font-bold rounded-lg cursor-pointer" @click="emit('click', $event)">
    <slot></slot>
  </button>
</template>
