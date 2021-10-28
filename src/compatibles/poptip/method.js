import { nextTick, onMounted, watch } from '@vue/runtime-core'
import {
  poptip,
  poptipHeight,
  showEditingNote,
  noteColor,
} from '@/compatibles/poptip/data'

export default function () {
  /**
   * 點擊筆記顏色事件
   * @param {string} value - 選取的顏色值
   */
  const clickNoteColorHandler = (value) => {
    noteColor.value = value
  }

  watch(showEditingNote, (status) => {
    nextTick(() => {
      poptipHeight.value = poptip.value.clientHeight
    })
  })
  onMounted(() => {
    poptipHeight.value = poptip.value.clientHeight
  })

  return { clickNoteColorHandler }
}
