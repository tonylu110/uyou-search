<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar/SearchBar.vue';
import SuWindow from './components/SuWindow/SuWindow.vue';

const text = ref('')
const getText = (textValue: string) => {
  text.value = textValue
}
</script>

<template>
  <SearchBar @textValue="getText" />
  <SuWindow v-if="text.length > 0" :text="text"/>
</template>

<style scoped lang="scss">

</style>
