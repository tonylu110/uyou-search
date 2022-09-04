<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import SearchBar from './components/SearchBar/SearchBar.vue';

const text = ref('')
const getText = (textValue: string) => {
  text.value = textValue
}
</script>

<template>
  <SearchBar @textValue="getText" />
</template>

<style scoped lang="scss">

</style>
