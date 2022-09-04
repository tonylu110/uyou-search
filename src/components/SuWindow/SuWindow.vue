<template>
  <div class="list">
    <div 
      class="item" 
      v-for="(item, index) in sugs" 
      :key="index" 
      :style="{background: listIndex === index + 1 ? '#00000010' : ''}"
      @click="openLink(item)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, Ref, ref, watchEffect } from 'vue';

const { shell } = require('electron')
const ipcRenderer = require('electron').ipcRenderer

const props = defineProps({
  text: String
})
const sugs: Ref<string[]> = ref([])
watchEffect(() => [
  fetch(`https://mark.tnyl.xyz/sug/su?wd=${props.text}`, ).then(res => {
    return res.arrayBuffer()
  }).then(res => {
    const decoder = new TextDecoder('gbk')
    const textToStr = decoder.decode(res)
    const result = textToStr.match(/\(([^)]*)\)/)![1]
    const result1 = result.replace('q', '"q"')
    const result2 = result1.replace('p', '"p"')
    const result3 = result2.replace('s:', '"s":')
    const resJSON = JSON.parse(result3)
    sugs.value = resJSON.s
  })
])

const toKey = (e: any) => {
  if (e.key === 'ArrowDown' && listIndex.value <= 10) {
    listIndex.value++
  } else if (e.key === 'ArrowUp' && listIndex.value > 0) {
    listIndex.value--
  }
  if (e.key === 'Enter' && listIndex.value > 0) {
    shell.openExternal(`https://www.baidu.com/s?wd=${sugs.value[listIndex.value - 1]}`)
    ipcRenderer.send('window-hide')
  }
}

const listIndex = ref(0)
document.addEventListener('keydown', toKey)

const openLink = (keywords: string) => {
  shell.openExternal(`https://www.baidu.com/s?wd=${keywords}`) 
  ipcRenderer.send('window-hide')
}

onUnmounted(() => {
  console.log(1);
  document.removeEventListener('keydown', toKey)
})
</script>

<style scoped lang="scss">
@import '../../color.scss';

.list {
  height: 488px;
  width: calc(100vw - 30px);
  padding: 15px;
  outline: none;
  .item {
    padding: 10px;
    border-radius: 7px;
    cursor: pointer;

    &:hover {
      background-color: #00000020;
    }

    span {
      @include font-color;
    }
  }
}
</style>