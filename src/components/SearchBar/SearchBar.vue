<template>
  <div class="close-button" @click="closeWindow">
    <span class="material-icons">close</span>
  </div>
  <input type="text" class="input">
  <div class="show">
    <span class="material-icons">close</span>
  </div>
</template>

<script setup lang="ts">
const ipcRenderer = require('electron').ipcRenderer
const closeWindow = () => {
  ipcRenderer.send("window-close")
}
</script>

<style scoped lang="scss">
@import '../../color.scss';

input {
  background-color: #00000020;
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

  &:hover + .input {
    width: calc(100% - 65px);
  }

  &:active {
    background-color: #00000040;
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
  background-color: #00000020;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>