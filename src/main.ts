import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useExpenses } from './composables/useExpenses'
import data from '@/static/seed.json'

const app = createApp(App)

const { insertExpense } = useExpenses()

// eslint-disable-next-line
// @ts-ignore
window.seed = function() {
  data.forEach(exp => {
    insertExpense({...exp, amount: exp.amount.toString()})
  })
}

app.use(createPinia())
app.use(router)

app.mount('#app')
