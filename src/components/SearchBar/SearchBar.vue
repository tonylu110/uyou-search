<template>
  <div class="search-bar" :style="{borderBottom: broder}">
    <div class="close-button" @click="closeWindow">
      <span class="material-icons">close</span>
    </div>
    <div class="input">
      <input type="text" v-model="text" />
      <div class="search-button" @click="text=''" :style="{right: text.length > 0 ? '50px' : ''}">
        <span class="material-icons">close</span>
      </div>
      <div class="search-button" @click="search" :style="{right: text.length > 0 ? '5px' : ''}">
        <span class="material-icons">search</span>
      </div>
    </div>
    <div class="show">
      <span class="material-icons">close</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const { shell } = require('electron')

const ipcRenderer = require('electron').ipcRenderer
const closeWindow = () => {
  ipcRenderer.send("app-close")
}

const emits = defineEmits<{
  (e: 'textValue', text: string): void
}>()

const text = ref('')
const broder = ref('')
watchEffect(() => {
  emits('textValue', text.value)
  ipcRenderer.send('change-big-window', text.value.length > 0)
  broder.value = (text.value.length > 0) ? '2px solid #75757520' : ''
})

const search = () => {
  shell.openExternal(`https://www.baidu.com/s?wd=${text.value}`) 
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>