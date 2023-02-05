<template>
  <el-col :span="7">
    <el-affix :offset="0">
      <component :is="ComponetsRef[letterRef]" :style="basicStyle">

      </component>
    </el-affix>
  </el-col>
</template>

<script setup>
import PinnedBlog from "./rightPart/PinnedBlog.vue";
import {ref} from "vue";

const letterRef = ref('p')
const basicStyle = ref({
  minHeight: "100vh",
  borderLeft: "1px solid var(--el-border-color)",
})

const ComponetsRef = {
  'p': PinnedBlog,
}
</script>

<style scoped>

</style>