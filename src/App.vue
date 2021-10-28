<script setup>
  import { onMounted, nextTick } from '@vue/runtime-core'
  import { showPoptip, selection, domRect } from './compatibles/app/data'
  import { selectionHandler } from './compatibles/app/method'
  import { poptipStyle } from './compatibles/poptip/data'
  import ScgComponent from './components/Svg.vue'
  import Poptip from './components/Poptip.vue'

  onMounted(() => {
    nextTick(() => {
      selection.value.addEventListener('selectstart', () => {
        document.addEventListener('selectionchange', selectionHandler)
      })
      selection.value.addEventListener('mouseleave', () => {
        document.removeEventListener('selectionchange', selectionHandler)
      })
    })
  })
</script>

<template>
  <div>
    <div ref="selection" class="relative">
      <ul>
        <li>
          <ScgComponent />
        </li>
      </ul>
      <Poptip />
    </div>
    <p>Poptip：{{ showPoptip }}</p>
    <p>Selected DOMRect：{{ domRect }}</p>
    <p>Poptip style：{{ poptipStyle }}</p>
  </div>
</template>

<style></style>
