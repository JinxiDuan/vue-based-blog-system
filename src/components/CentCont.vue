<template>
  <el-col :span="holderSpan" style="position: relative;">
    <component :is="ComponentRefs[props.centerComponent]"></component>
  </el-col>
</template>

<script setup>
import HitBlog from "./centerPart/HitBlog.vue";
import EditBlog from "./centerPart/EditBlog.vue";
import {computed, ref} from "vue";

const props = defineProps({
  centerComponent: String,
})

let ComponentRefs = {
  'h': HitBlog,
  'w': EditBlog
}

const holderSpan = computed(()=>{
  if(props.centerComponent=='w'){
    return 14;
  }else{
    return 12;
  }
})
</script>

<style scoped>

</style>