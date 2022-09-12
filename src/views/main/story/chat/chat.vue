<template>
  <div class="chat">
    <my-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import myEditor from '@/base-ui/editor'

export default defineComponent({
  name: 'chat',
  components: {
    myEditor
  },
  setup() {
    const htmlString = ref<string>('请畅所欲言吧')
    return {
      htmlString
    }
  }
})
</script>

<style scoped></style>
