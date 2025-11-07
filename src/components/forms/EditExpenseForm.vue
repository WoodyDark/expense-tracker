<script setup lang="ts">
import { useExpenses, type Expense } from '@/composables/useExpenses'
import { ref } from 'vue'
import BaseButton from '../global/BaseButton.vue'

const props = defineProps<{
  expense: Expense
}>()

const emit = defineEmits<{
  (event: 'success'): void
  (event: 'cancel'): void
}>()

const { editExpense } = useExpenses()

const activity = ref(props.expense.activity)
const amount = ref(props.expense.amount)

function handleSubmit() {
  editExpense({
    ...props.expense,
    activity: activity.value,
    amount: amount.value,
  })

  emit('success')
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    @keydown.esc="emit('cancel')"
    class="flex items-stretch gap-4"
  >
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-medium pl-2" :for="`edit-activity-${expense.id}`"
          >Activity</label
        >
        <input
          :id="`edit-activity-${expense.id}`"
          autofocus
          class="border border-gray-300 py-2 px-4 rounded-md bg-white"
          v-model="activity"
          placeholder="Activity"
          type="text"
        />
      </div>

      <div>
        <label class="block text-xs font-medium pl-2" :for="`edit-amount-${expense.id}`"
          >Amount</label
        >
        <input
          :id="`edit-amount-${expense.id}`"
          class="border border-gray-300 py-2 px-4 rounded-md bg-white"
          v-model="amount"
          placeholder="Spending"
          pattern="^\d*(\.\d{0,2})?$"
          type="text"
        />
      </div>
    </div>

    <BaseButton type="submit" class="bg-blue-700 text-white">Save Changes</BaseButton>
    <BaseButton type="button" class="text-gray-700 font-medium" @click="emit('cancel')"
      >Cancel</BaseButton
    >
  </form>
</template>
