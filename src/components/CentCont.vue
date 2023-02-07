<template>
  <el-col
      :span="holderSpan"
      style="position: relative;"
  >
    <KeepAlive include="HitBlog">
      <component :is="ComponentRefs[props.centerComponent]"
                 @login-success="$emit('loginSuccess')"
                 @post-success="$emit('postSuccess')"
                 @enter-passage="(blogprop)=>$emit('enterPassage', blogprop)"
                 @return-hit="$emit('returnHit')"
      >
      </component>
    </KeepAlive>
  </el-col>
</template>

<script setup>
import HitBlog from "./centerPart/HitBlog.vue";
import EditBlog from "./centerPart/EditBlog.vue";
import loginRegis from "./centerPart/LoginRegis.vue";
import Passage from "./centerPart/Passage.vue";
import MyFollow from "./centerPart/MyFollow.vue";
import Schedule from "./centerPart/Schedule.vue";
import {computed} from "vue";

const props = defineProps({
  centerComponent: String,
})

let ComponentRefs = {
  'h': HitBlog,
  'w': EditBlog,
  'l': loginRegis,
  'p': Passage,
  'f': MyFollow,
  's': Schedule
}

const holderSpan = computed(() => {
  if (props.centerComponent == 'w') {
    return 14;
  } else {
    return 12;
  }
})

</script>

<style scoped>

</style>