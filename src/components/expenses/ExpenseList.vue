<script setup lang="ts">
import { useExpenses } from '@/composables/useExpenses'
import ExpenseListItem from './ExpenseListItem.vue'
import { computed, ref } from 'vue'
import { useFormatter } from '@/helpers/currencyFormatter'

const { expenses } = useExpenses()
const search = ref('')

const searchedExpenses = computed(() => {
  const query = search.value.trim().toLowerCase()

  return query
    ? expenses.value.filter((expense) => expense.activity.toLowerCase().includes(query))
    : expenses.value
})

const totalSpending = computed(() => {
  return searchedExpenses.value.reduce((acc, expense) => {
    return acc + Number(expense.amount)
  }, 0)
})

const formattedAmount = useFormatter(totalSpending)
</script>

<template>
  <div class="font-bold text-2xl">
    <div class="grid grid-cols-2">
      <h2>Past Expenses</h2>
      <div class="text-right">{{ formattedAmount }}</div>
    </div>
  </div>

  <div class="mt-2">
    <input
      class="border border-gray-300 py-2 px-4 rounded-md bg-white w-64"
      v-model="search"
      placeholder="Search (e.g. Medical Bills)"
      type="search"
    />

    <div class="mt-4">
      <ol v-if="searchedExpenses.length > 0" class="grid">
        <TransitionGroup
          enter-active-class="transition duration-300 origin-left"
          enter-from-class="scale-x-0"
          move-class="transition duration-500"
        >
          <ExpenseListItem
            v-for="(expense, index) in searchedExpenses"
            :key="expense.id"
            :expense="expense"
            class="p-4 rounded-md"
            :class="index % 2 === 0 ? 'bg-gray-100' : ''"
          />
        </TransitionGroup>
      </ol>

      <p v-else class="text-gray-500 text-center py-8 bg-gray-50 rounded-md">No expenses</p>
    </div>
  </div>
</template>
