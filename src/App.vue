<script setup lang="ts">
import { ref } from 'vue'
import ExpenseEntryForm from './components/forms/ExpenseEntryForm.vue'
import ExpenseList from './components/expenses/ExpenseList.vue'
import BaseButton from './components/global/BaseButton.vue'
import { useExpenses, type Expense } from './composables/useExpenses'

const successCount = ref(0)

function handleSuccess() {
  successCount.value++
}

function seedData() {
  // eslint-disable-next-line
  // @ts-ignore
  window.seed()
}
const { deleteExpense, expenses } = useExpenses()

function deleteAll() {
  expenses.value.forEach((expense) => {
    deleteExpense(expense.id)
  })
}

function cycleExpenses() {
  const [first, ...remainder] = expenses.value

  const data = [...remainder, first].filter((exp) => exp) as Expense[]
  expenses.value = data
}
</script>

<template>
  <main class="container mx-auto pt-16 md:pt-8 pb-8 relative px-4">
    <div class="absolute top-0 right-0 space-x-1">
      <BaseButton @click="cycleExpenses" class="font-mono text-gray-700 bg-gray-200">
        Cycle data
      </BaseButton>

      <BaseButton @click="seedData" class="font-mono text-gray-700 bg-gray-200">
        Seed Data
      </BaseButton>

      <BaseButton @click="deleteAll" class="font-mono text-gray-700 bg-gray-200">
        Delete All
      </BaseButton>
    </div>

    <div>
      <h1 class="font-bold text-2xl">New Expenses</h1>
      <ExpenseEntryForm class="mt-2" @success="handleSuccess" :key="successCount" />
    </div>

    <hr class="mt-8 border-gray-200" />

    <div class="mt-8 max-w-[600px]">
      <ExpenseList />
    </div>
  </main>
</template>

<style scoped></style>
