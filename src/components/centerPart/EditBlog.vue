<template>
  <el-menu
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
        <el-button round>便捷工具栏</el-button>
        <el-button type="primary" @click="moveUp(nowEditingIndex)" round>
          <el-icon>
            <Top/>
          </el-icon>
          上移
        </el-button>
        <el-button type="primary" @click="moveDown(nowEditingIndex)" round>
          <el-icon>
            <Bottom/>
          </el-icon>
          下移
        </el-button>
        <el-button type="primary" @click="copyCube(nowEditingIndex)" round>
          <el-icon>
            <CopyDocument/>
          </el-icon>
          复制
        </el-button>
        <el-button type="primary" @click="addUpCube(nowEditingIndex)" round>
          <el-icon>
            <Upload/>
          </el-icon>
          在上方新建
        </el-button>
        <el-button type="primary" @click="addDownCube(nowEditingIndex)" round>
          <el-icon>
            <Download/>
          </el-icon>
          在下方新建
        </el-button>
        <el-button type="primary" @click="deleteCube(nowEditingIndex)" round>
          <el-icon>
            <Delete/>
          </el-icon>
          删除
        </el-button>
        <el-button type="primary" @click="showID" round>
          🆔
        </el-button>
      </el-button-group>
    </el-affix>
  </div>

  <div class="titleBox">
    <el-input
        style="font-size: 18px"
        placeholder="请输入标题"
        v-model="title"
        :maxlength="30"
        show-word-limit
        size="large"
    >
      <template #append>
        .md
      </template>
    </el-input>
  </div>


  <div class="editorBox" ref="editorBox" v-for="(para, i) in passage" :key="para.uniqueID" @click="changeFocus(i)">
    <div class="IDandUIDBox" v-if="ifShowID">
      <div class="IDBox" title="顺序编号">
        {{ i }}
      </div>
      <div class="UIDBox"
           title="唯一编号"
           :style="{height: UIDsBoxHeight[i]+'px',backgroundColor: i==nowEditingIndex?'#409EFF':'',color: i==nowEditingIndex?'white':'black'}">
        {{ para.uniqueID }}
      </div>
    </div>
    <mavon-editor
        v-model="para.raw"
        :toolbars="toolbarsVal"
        :subfield="false"
        :font-size="fontsize+'px'"
        @change="(val, render)=>{saveHtml(val,render,i)}"/>
  </div>

  <el-affix position="bottom" :offset="30" z-index="3000">
    <div class="submitBtnBox">
      <el-button round>
        保存草稿
      </el-button>
      <el-button type="primary" round>
        发送
      </el-button>
    </div>
  </el-affix>
</template>

<script setup>
import {nextTick, onMounted, ref} from "vue";
import {ElMessage} from "element-plus";

let valueInCube = ref('');//测试用变量需删除
let fontsize = ref(14);
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
  switch (key) {
    case "2-1":
      addUpCube(nowEditingIndex.value);
      break;
    case "2-2":
      addDownCube(nowEditingIndex.value)
      break;
    case "2-3":
      moveUp(nowEditingIndex.value)
      break;
    case "2-4":
      moveDown(nowEditingIndex.value)
      break;
    case "2-5":
      deleteCube(nowEditingIndex.value)
      break;
  }
}

const changeFocus = (index) => {
  nowEditingIndex.value = index;
  console.log(nowEditingIndex.value)
}

let title = ref("")
let passage = ref([
  {
    "raw": "",
    "html": "",
    "uniqueID": 0,
  }
])
let nowEditingIndex = ref(0)
let tailIndex = 1;

let toolbarsVal = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true, // 标题
  underline: true, // 下划线
  strikethrough: true, // 中划线
  mark: true, // 标记
  superscript: true, // 上角标
  subscript: true, // 下角标
  quote: true, // 引用
  ol: true, // 有序列表
  ul: true, // 无序列表
  link: true, // 链接
  imagelink: true, // 图片链接
  code: true, // code
  table: true, // 表格
  fullscreen: true, // 全屏编辑
  readmodel: true, // 沉浸式阅读
  htmlcode: true, // 展示html源码
  help: true, // 帮助
  /* 1.3.5 */
  undo: true, // 上一步
  redo: true, // 下一步
  trash: false, // 清空
  save: false, // 保存（触发events中的save事件）
  /* 1.4.2 */
  navigation: true, // 导航目录
  /* 2.1.8 */
  alignleft: true, // 左对齐
  aligncenter: true, // 居中
  alignright: true, // 右对齐
  /* 2.2.1 */
  subfield: true, // 单双栏模式
  preview: true, // 预览
}

//========展示左侧编号栏用变量↓============
let ifShowID = ref(false);
let UIDsBoxHeight = ref([0]);
let editorBox = ref(null);

onMounted(() => {
  refreshEDBoxList()
})

let refreshEDBoxList = () => {
  nextTick(() => {
    console.log(editorBox.value)
    for (let edBox in editorBox.value) {
      console.log(edBox)
      UIDsBoxHeight.value[edBox] = editorBox.value[edBox].clientHeight - 43;
      let roIE = new ResizeObserver((entries) => {
        UIDsBoxHeight.value[edBox] = editorBox.value[edBox].clientHeight - 43;
      });
      roIE.observe(editorBox.value[edBox]);
    }
    console.log(UIDsBoxHeight.value)
  })

}
//===========以下为单元格操作函数===============
const saveHtml = (val, render, index) => {
  // passage.value[index].raw = val;无需同步
  passage.value[index].html = render;
}

const moveUp = (index) => {
  if (index) {
    let temp = passage.value[index];
    passage.value[index] = passage.value[index - 1];
    passage.value[index - 1] = temp;
    changeFocus(NaN);
  } else {
    ElMessage({
      message: "未选定单元格或首个单元格无法上移",
      type: "error",
    })
  }
  refreshEDBoxList()
}

const moveDown = (index) => {
  if (index == passage.value.length - 1) {
    ElMessage({
      message: "最后一个单元格你想移哪去",
      type: "warning",
    })
    return;
  }
  if (index >= 0) {
    let temp = passage.value[index];
    passage.value[index] = passage.value[index + 1];
    passage.value[index + 1] = temp;
    changeFocus(NaN);
  } else {
    ElMessage({
      message: "未选定单元格",
      type: "error",
    })
  }
  refreshEDBoxList()
}

const copyCube = (index) => {
  if (index >= 0) {
    passage.value.splice(index + 1, 0, passage.value[index]);
    changeFocus(index + 1);
  } else {
    ElMessage({
      message: "未选定单元格",
      type: "error",
    })
  }
  refreshEDBoxList()
}


const addUpCube = (index) => {
  passage.value.splice(index, 0, {
    "raw": "",
    "html": "",
    "uniqueID": tailIndex,
  })
  tailIndex++;
  refreshEDBoxList()
}

const addDownCube = (index) => {
  console.log(index);
  passage.value.splice(index + 1, 0, {
    "raw": "",
    "html": "",
    "uniqueID": tailIndex,
  })
  tailIndex++;
  changeFocus(index + 1)
  refreshEDBoxList()
}

const deleteCube = (index) => {
  if (index) {
    passage.value.splice(index, 1);
    changeFocus(NaN);
  } else {
    ElMessage({
      message: "未选定单元格或首个单元格无法删除",
      type: "error",
    })
  }
  refreshEDBoxList()
}

const showID = () => {
  ifShowID.value = !ifShowID.value;
}

const click = () => {
  console.log('nmsl');
}//测试用变量需删除
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}

.editorBox {
  /*display: flex;*/
  /*flex-direction: row;*/
  height: auto;
  margin: 10px 5px;
}

.floatToolBox {
  width: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.IDandUIDBox {
  display: flex;
  flex-direction: column;
  float: left;
}


.IDBox {
  font-family: PTSans;
  font-weight: bold;
  height: 43px;
  width: 20px;
  background-color: rgba(170, 170, 170, 0.50);
  display: flex;
  justify-content: center;
  align-items: center;

}

.UIDBox {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(170, 170, 170, 0.33);
  font-family: PTSans;
  font-size: 18px;
}

.titleBox {
  width: 500px;
  margin: auto;
  /*font-size: 30px;*/
}

.submitBtnBox {
  box-sizing: border-box;
  width: 100%;
  padding-right: 6px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.v-note-wrapper {
  min-height: 0;
}
</style>