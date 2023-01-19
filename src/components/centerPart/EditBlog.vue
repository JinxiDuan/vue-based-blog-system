<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" style="font-size: 24px;font-weight:bold;">长博文编辑器</el-menu-item>
    <div class="flex-grow"/>
    <el-sub-menu index="1">
      <template #title>文件</template>
      <el-menu-item index="1-1">新建</el-menu-item>
      <el-menu-item index="1-2">保存到本地</el-menu-item>
      <el-menu-item index="1-3">打印</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>编辑</template>
      <el-menu-item index="2-1">在上方新增单元格</el-menu-item>
      <el-menu-item index="2-2">在下方新增单元格</el-menu-item>
      <el-menu-item index="2-3">上移单元格</el-menu-item>
      <el-menu-item index="2-4">下移单元格</el-menu-item>
      <el-menu-item index="2-5">删除当前单元格</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>设置</template>
      <el-sub-menu index="3-1">
        <template #title>字体大小</template>
        <el-menu-item index="3-1-1">
          <el-slider v-model="fontsize" :min="10" :max="40"/>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3-2">
        <template #title>主题选择</template>
        <el-menu-item index="3-2-1">白色日间</el-menu-item>
        <el-menu-item index="3-2-2">黑色深邃</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>

  <div class="floatToolBox">
    <el-affix :offset="10" style="z-index: 1501">
    <el-button-group>
      <el-button>便捷工具栏</el-button>
      <el-button type="primary">
        <el-icon>
          <Top/>
        </el-icon>
        上移
      </el-button>
      <el-button type="primary">
        <el-icon>
          <Bottom/>
        </el-icon>
        下移
      </el-button>
      <el-button type="primary">
        <el-icon>
          <CopyDocument/>
        </el-icon>
        复制
      </el-button>
      <el-button type="primary">
        <el-icon>
          <Upload/>
        </el-icon>
        在上方新建
      </el-button>
      <el-button type="primary">
        <el-icon>
          <Download/>
        </el-icon>
        在下方新建
      </el-button>
      <el-button type="primary">
        <el-icon>
          <Delete/>
        </el-icon>
        删除
      </el-button>
    </el-button-group>
    </el-affix>
  </div>

  <div class="editorBox" v-for="(para, i) in passage" key="i">
    <mavon-editor v-model="para.raw" @change="(val, render)=>{saveHtml(val,render,i)}"/>
  </div>
</template>

<script setup>
import {ref} from "vue";

let valueInCube = ref('');//测试用变量需删除
let fontsize = ref(10);
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  if (key == "2-2") {
    passage.value.push({
      "raw": "",
      "html": "",
    })
  }
}

let title = ref("")

let passage = ref([
  {
    "raw": "",
    "html": "",
  }
])

//===========以下为单元格操作函数===============
const saveHtml = (val, render, index) => {
  // passage.value[index].raw = val;无需同步
  passage.value[index].html = render;
}

const click = () => {
  console.log('nmsl');
}//测试用变量需删除
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.editorBox {
  margin: 10px 5px;
}

.floatToolBox {
  width: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>