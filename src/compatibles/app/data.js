import { ref } from '@vue/runtime-core'

export const showPoptip = ref(false)
export const selection = ref(null)
export const domRect = ref({})

export default function () {
  return { showPoptip, selection, domRect }
}
