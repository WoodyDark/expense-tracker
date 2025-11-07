<script setup lang="ts">
import { ref } from 'vue'
import ExpenseEntryForm from './components/forms/ExpenseEntryForm.vue'
import ExpenseList from './components/expenses/ExpenseList.vue'

const successCount = ref(0)

function handleSuccess() {
  successCount.value++
}
</script>

<template>
  <main class="container mx-auto pt-8">
    <div>
      <h1 class="font-bold text-2xl">New Expenses</h1>
      <ExpenseEntryForm class="mt-2" @success="handleSuccess" :key="successCount" />
    </div>

    <hr class="mt-8 border-gray-200" />

    <div class="mt-8 max-w-[900px]">
      <ExpenseList />
    </div>
  </main>
</template>

<style scoped></style>
