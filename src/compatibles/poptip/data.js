import { ref, computed } from '@vue/runtime-core'
import { domRect, selection } from '@/compatibles/app/data'

export const poptip = ref(null)
// 是否顯示新增/編輯筆記
export const showEditingNote = ref(false)
export const poptipHeight = ref(0)
export const noteContent = ref('')
export const noteColor = ref('yellow')
export const noteColorList = ref([
  { value: 'yellow', class: 'btn-yellow' },
  { value: 'blue', class: 'btn-blue' },
  { value: 'red', class: 'btn-red' },
  { value: 'green', class: 'btn-green' },
])

export const poptipStyle = computed(() => {
  const poptipWidth = poptip.value?.clientWidth ?? 0
  const svgWidth = selection.value?.querySelector?.('svg').clientWidth ?? 0
  const selectionWidth = selection.value?.clientWidth ?? 0
  // poptip 與選取範圍最上方間距 38px
  const padding = 38
  const rectTop = domRect.value?.top ?? 0
  const rectLeft = domRect.value?.left ?? 0

  // console.log('rectTop', rectTop)
  // console.log('rectLeft', rectLeft)

  const insetX = {}
  const top =
    rectTop < poptipHeight.value + padding
      ? rectTop + padding
      : rectTop - poptipHeight.value - padding

  if (rectLeft - poptipWidth / 2 < 0) insetX.left = `${Math.max(rectLeft, 0)}px`
  else if (rectLeft + poptipWidth / 2 > svgWidth)
    insetX.right =
      selectionWidth > svgWidth ? `${selectionWidth - svgWidth}px` : 0
  else insetX.left = `${rectLeft - poptipWidth / 2}px`

  return { top: `${top}px`, ...insetX }
})

export default function () {
  return { poptip }
}
