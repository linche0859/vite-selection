import { showPoptip, domRect } from '@/compatibles/app/data'
import {
  showEditingNote,
  noteContent,
  noteColor,
} from '@/compatibles/poptip/data'
// let selectionTimer = null

/**
 * 顯示選取範圍的彈跳窗
 * @param {object} rect - DOMRect object
 */
const showPoptipHandler = (rect = {}) => {
  // console.log(rect)
  const keys = ['bottom', 'height', 'left', 'right', 'top', 'width']
  showPoptip.value = true
  keys.forEach((key) => {
    domRect.value[key] = rect[key]
  })
}
/**
 * 選取範圍事件
 * @param {object} event - selectionchange event
 */
export const selectionHandler = (event) => {
  // console.log(event);
  // 選取的 Selection 物件
  const selObj = document.getSelection()
  console.log(selObj)

  // 選取的文字內容
  const selectedTextContent = selObj.toString()

  // 取消選取內容
  if (!selectedTextContent) {
    showPoptip.value = false
    showEditingNote.value = false
    noteContent.value = ''
    noteColor.value = 'yellow'
    return
  }
  // console.log('文字內容', selObj.toString())

  // 選取內容的父元素，當選取多行時，可能會不準
  // console.log(selObj.anchorNode.parentElement)

  // 選取內容的區域
  const ranges = []
  console.group()
  for (let i = 0; i < selObj.rangeCount; i++) {
    ranges[i] = selObj.getRangeAt(i)
  }
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i]
    const { startContainer, endContainer, startOffset, endOffset } = range
    // Range 開始的父節點
    console.log(startContainer.parentElement)
    // Range 結束的父節點
    console.log(endContainer.parentElement)
    // Range 開始的偏移量
    console.log('startOffset', startOffset)
    // Range 結束的偏移量
    console.log('endOffset', endOffset)

    // 複製 Range 的選取內容，如果有跨父層則添加文字 parent element
    console.log(range.cloneContents())

    // 更換選取範圍的顏色，並重新 insert 回去有問題，先延後處理
    // 更換文字顏色參考：bit.ly/3jDZLdA
  }
  console.log(ranges)
  console.groupEnd()

  // 選取範圍的 DOMRect
  const domRect = selObj.getRangeAt(0).getBoundingClientRect()
  showPoptipHandler(domRect)
}
