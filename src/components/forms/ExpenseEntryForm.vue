<script setup lang="ts">
import { useExpenses } from '@/composables/useExpenses'
import { ref } from 'vue'
import BaseButton from '../global/BaseButton.vue'

const emit = defineEmits<{
  (event: 'success'): void
}>()

const activity = ref('')
const amount = ref('')
const { insertExpense } = useExpenses()

function handleSubmit() {
  emit('success')

  insertExpense({
    activity: activity.value,
    amount: amount.value,
  })
}
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row gap-4">
      <input
        class="border border-gray-300 py-2 px-4 rounded-md"
        v-model="activity"
        placeholder="Activity"
        type="text"
      />
      <input
        class="border border-gray-300 py-2 px-4 rounded-md"
        v-model="amount"
        placeholder="Spending"
        pattern="^\d*(\.\d{0,2})?$"
        type="text"
      />
      <BaseButton class="text-white bg-blue-700" type="submit">Submit</BaseButton>
    </form>
  </div>
</template>
