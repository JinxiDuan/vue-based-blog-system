<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" style="font-size: 24px;font-weight:bold;">长博文编辑器</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>文件</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>

<!--  <div id="main">-->
<!--    <mavon-editor v-model="value"/>-->
<!--  </div>-->
</template>

<script setup>
import {ref} from "vue";

let value = ref('');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

const click = ()=>{
  console.log('nmsl');
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>