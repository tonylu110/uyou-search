<template>
  <div class="search-bar">
    <div class="close-button" @click="closeWindow">
      <span class="material-icons">close</span>
    </div>
    <input type="text" class="input" v-model="text">
    <div class="show">
      <span class="material-icons">close</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

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
</script>

<style scoped lang="scss">
@import '../../color.scss';

.search-bar {
  -webkit-app-region: drag;
  width: calc(100vw - 30px);
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  overflow: hidden;
  border-bottom: v-bind(broder);

  input {
    background-color: #75757520;
    border: none;
    -webkit-app-region: no-drag;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
    transition: 0.3s width;
    @include font-color;
  }

  .close-button {
    -webkit-app-region: no-drag;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 50%;
    color: transparent;
    position: fixed;
    right: 15px;
    z-index: 1;
    cursor: pointer;

    &:hover + .input {
      width: calc(100% - 65px);
    }

    &:active {
      background-color: #00000020;
    }

    &:hover ~ .show {
      opacity: 1;
      right: 15px;
    }
  }

  .show {
    opacity: 0;
    position: fixed;
    transition: 0.3s;
    right: -30px;
    padding: 5px;
    border-radius: 50%;
    @include font-color;
    background-color: #75757520;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>