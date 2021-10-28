<template>
  <div
    ref="poptip"
    class="absolute bg-[#394249] rounded-[10px]"
    style="box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2)"
    :style="poptipStyle"
    :class="showPoptip ? 'opacity-100 z-0' : 'opacity-0 z-[-1]'"
  >
    <!-- 非新增/編輯筆記狀態的工具列 -->
    <ul
      class="flex items-center space-x-[10px] p-3"
      :class="showEditingNote ? 'hidden' : 'flex'"
    >
      <li>
        <button
          class="btn-icon tooltip"
          data-content="新增筆記"
          data-direction="bottom"
          @click="showEditingNote = true"
        >
          <img src="/src/assets/note.svg" alt="note" />
        </button>
      </li>
      <li>
        <button class="btn-icon">
          <img src="/src/assets/search.svg" alt="search" />
        </button>
      </li>
      <li>
        <button class="btn-icon">
          <img src="/src/assets/yellow.svg" alt="yellow" />
        </button>
      </li>
      <li>
        <button class="btn-icon">
          <img src="/src/assets/blue.svg" alt="blue" />
        </button>
      </li>
      <li>
        <button class="btn-icon">
          <img src="/src/assets/red.svg" alt="red" />
        </button>
      </li>
      <li>
        <button class="btn-icon">
          <img src="/src/assets/green.svg" alt="green" />
        </button>
      </li>
    </ul>
    <!-- 新增/編輯筆記狀態下的顯示 -->
    <ul
      class="
        flex
        justify-end
        items-center
        space-x-[10px]
        p-3
        border-b border-[#586874]
      "
      :class="showEditingNote ? 'flex' : 'hidden'"
    >
      <li>
        <button
          class="btn-icon btn-edit-icon tooltip"
          data-content="打開筆記"
          data-direction="top"
        >
          <img src="/src/assets/linktopage.svg" alt="linktopage" />
        </button>
      </li>
      <li>
        <button class="btn-icon btn-edit-icon">
          <img src="/src/assets/trash.svg" alt="trash" />
        </button>
      </li>
      <li>
        <button class="btn-icon btn-edit-icon" @click="showPoptip = false">
          <img src="/src/assets/close.svg" alt="close" />
        </button>
      </li>
    </ul>
    <!-- 新增/編輯筆記的輸入區塊 -->
    <div v-show="showEditingNote" class="pt-5 pb-3">
      <textarea
        v-model.trim="noteContent"
        class="
          block
          px-[27px]
          w-[408px]
          h-[136px]
          bg-transparent
          text-white
          leading-5
          outline-none
        "
        placeholder="寫下筆記"
        @mousedown.prevent
      >
      </textarea>
      <ul class="flex px-[19px] space-x-[10px]">
        <li v-for="item in noteColorList" :key="item.value">
          <button
            class="btn-icon btn-edit-icon btn-color relative"
            :class="[item.class, { active: item.value === noteColor }]"
            @click="clickNoteColorHandler(item.value)"
          ></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { showPoptip } from '@/compatibles/app/data'
  import {
    poptip,
    poptipStyle,
    showEditingNote,
    noteContent,
    noteColor,
    noteColorList,
  } from '@/compatibles/poptip/data'
  import method from '@/compatibles/poptip/method'
  export default {
    directives: {
      focus: {
        // directive definition
        updated(el, binding) {
          if (binding.value) el.focus()
        },
      },
    },
    setup() {
      const { clickNoteColorHandler } = method()

      return {
        showPoptip,
        poptip,
        poptipStyle,
        showEditingNote,
        noteContent,
        noteColor,
        noteColorList,
        clickNoteColorHandler,
      }
    },
  }

  method()
</script>

<style scoped>
  .btn-icon {
    display: block;
    width: 54px;
    height: 54px;
    border-radius: 4px;
  }
  .btn-edit-icon {
    width: 48px;
    height: 48px;
  }
  .btn-icon img {
    margin-left: auto;
    margin-right: auto;
  }
  .btn-icon:hover {
    background-color: #4b5861;
  }
  .btn-color::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .btn-yellow::after {
    background-color: #ffc645;
  }
  .btn-blue::after {
    background-color: #4fa2cf;
  }
  .btn-red::after {
    background-color: #ff5050;
  }
  .btn-green::after {
    background-color: #3a9b8c;
  }
  .btn-color.active::after {
    border: 2px solid #fff;
  }
  .tooltip {
    position: relative;
  }
  .tooltip::after {
    content: attr(data-content);
    position: absolute;
    display: none;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px;
    background-color: #434343;
    color: #fff;
    border-radius: 4px;
    white-space: nowrap;
  }
  .tooltip[data-direction='top']::after {
    bottom: calc(100% + 8px);
  }
  .tooltip[data-direction='bottom']::after {
    top: calc(100% + 8px);
  }
  .tooltip:hover::after {
    display: block;
  }
</style>
