<template>
  <div class="MFContainer">
    <div class="topRow">
      <div class="pageTitle">
        我的关注
      </div>
      <el-icon :size="'large'">
        <UserFilled/>
      </el-icon>
    </div>

    <el-empty description="空空如也~" class="empty" v-if="ifEmpty">

    </el-empty>
  </div>
</template>

<script setup>

import {computed, ref} from "vue";

const followings = ref({})

let ifEmpty = computed(()=>{
   return Object.keys(followings.value).length === 0
})
</script>

<style scoped>
.topRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.pageTitle {
  font-weight: bold;
  font-size: 24px;
}

.empty{
  margin-top: 280px;
}
</style>