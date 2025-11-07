<script setup lang="ts">
import { useExpenses, type Expense } from '@/composables/useExpenses'
import { computed, ref } from 'vue'
import EditExpenseForm from '../forms/EditExpenseForm.vue'
import { useFormatter } from '@/helpers/currencyFormatter'

const props = defineProps<{
  expense: Expense
}>()

const editMode = ref(false)
const { deleteExpense } = useExpenses()

function handleDelete() {
  deleteExpense(props.expense.id)
}

const amount = computed(() => props.expense.amount)
const formattedAmount = useFormatter(amount)
</script>

<template>
  <li>
    <EditExpenseForm
      v-if="editMode"
      @success="editMode = false"
      @cancel="editMode = false"
      :expense="expense"
    />

    <div v-else>
      <div class="grid grid-cols-2 text-lg">
        <div clas="col-span-1">{{ expense.activity }}</div>
        <div clas="col-span-1">
          <div class="text-right">
            {{ formattedAmount }}
          </div>
        </div>
      </div>

      <div class="text-sm">
        <button class="text-blue-500 cursor-pointer" @click="editMode = true">Edit</button>
        |
        <button class="text-blue-500 cursor-pointer" @click="handleDelete">Delete</button>
      </div>
    </div>
  </li>
</template>
