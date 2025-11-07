import { computed, toValue, type MaybeRefOrGetter } from "vue"

export const formatter = new Intl.NumberFormat('en', {currency: 'usd', style: 'currency'})

export function useFormatter(value: MaybeRefOrGetter<number | string>) {
  return computed(() => {
    const numberized = Number(toValue(value))
    return formatter.format(numberized)
})
}
