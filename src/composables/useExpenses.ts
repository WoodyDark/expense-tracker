import { computed, ref } from "vue";

const storageKey = 'expenses'
const idKey = 'id'

export type RawExpense = {  activity: string, amount: string }
export type Expense = { id: number } & RawExpense

function getExpenses(): Expense[] {
  return JSON.parse(localStorage.getItem(storageKey) || '[]')
}

function getId(): number {
  return JSON.parse(localStorage.getItem(idKey) || '1')
}

function storeExpenses(expenses: Expense[]) {
  const data = JSON.stringify(expenses)
  localStorage.setItem(storageKey, data)
}

function storeId(newId: number) {
  const data = JSON.stringify(newId)
  localStorage.setItem(idKey, data)
}

const expensesBase = ref(getExpenses())
const idBase = ref(getId())

const expenses = computed({
  get() {
    return expensesBase.value
  },
  set(newValue) {
    expensesBase.value = newValue
    storeExpenses(newValue)
  }
})

const id = computed({
  get() {
    return idBase.value
  },
  set(newValue) {
    idBase.value = newValue
    storeId(newValue)
  }
})

function insertExpense(expense: RawExpense) {
  expenses.value = [createExpense(expense), ...expenses.value]
}

function editExpense(editedExpense: Expense) {
  expenses.value = expenses.value.map(expense => {
    return expense.id === editedExpense.id ? editedExpense : expense
  })
}

function deleteExpense(id: number) {
  expenses.value = expenses.value.filter(expense => expense.id !== id)
}

function createExpense(expense: RawExpense | Expense) {
  id.value++

  return {
    id: id.value,
    ...expense,
  }
}

export function useExpenses() {


  return {
    expenses: expenses,
    insertExpense,
    deleteExpense,
    editExpense,
  }
}
