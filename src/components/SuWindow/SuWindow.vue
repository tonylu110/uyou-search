<template>
  <div class="list">
    <div class="item" v-for="(item, index) in sugs" :key="index">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watchEffect } from 'vue';

const props = defineProps({
  text: String
})
const sugs: Ref<String[]> = ref([])
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
</script>

<style scoped lang="scss">
@import '../../color.scss';

.list {
  height: 488px;
  width: calc(100vw - 30px);
  padding: 15px;
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