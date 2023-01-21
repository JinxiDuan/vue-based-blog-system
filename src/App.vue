<script setup>
import LeftMenu from "./components/LeftMenu.vue";
import CentCont from "./components/CentCont.vue";
import RightCol from "./components/RightCol.vue";
import {computed, nextTick, onMounted, provide, reactive, ref, watch} from "vue";

const placeHolder = ref();
const leftMenu = ref();
const userAvaRef = ref('');
const centerCompTag = ref('h')
let state = ref({phWidth: 100, phLeft: 100}) //The width of PlaceHolder
provide('userAvaRef', userAvaRef);
//提供头像的路径以供注入

onMounted(() => {
      state.value.phWidth = placeHolder.value.$el.offsetWidth;
      state.value.phLeft = placeHolder.value.$el.getBoundingClientRect().left;

      userAvaRef.value = leftMenu.value.profile.userAvatar;
      //给传入的值赋值

      let ro = new ResizeObserver((entries) => {
        state.value.phWidth = placeHolder.value.$el.offsetWidth;
        state.value.phLeft = placeHolder.value.$el.getBoundingClientRect().left;
      });
      ro.observe(placeHolder.value.$el);
      window.onresize = () => {
        state.value.phWidth = placeHolder.value.$el.offsetWidth;
        state.value.phLeft = placeHolder.value.$el.getBoundingClientRect().left;
      }
      //响应式更新左边栏的元素宽度与left值
    }
)


let boundingClientRect = computed(() => {
  return placeHolder.value.$el.getBoundingClientRect();
})


let changeCentPart = (tag) => {
  if (tag) {
    centerCompTag.value = tag;
    nextTick(() => {
      state.value.phWidth = placeHolder.value.$el.offsetWidth;
      state.value.phLeft = placeHolder.value.$el.getBoundingClientRect().left;
    })

  }
}

/*
小日志：e
这里尝试使用props属性传递占位元素的宽度和左边距到真正存放左菜单栏的组件中去
首先尝试的是获取占位元素的ref，再通过ref获取宽度和左边距离
元素的ref在没有绑定时没办法获取，需要写在mounted里面
后发现普通变量在改变后，v-bind属性绑定不会随着普通变量动态变化
遂将v-bind绑定的属性也改为动态的（使用计算属性-》改为ref）
可以实现第一次生成页面时，真组件与占位元素的对齐，但是当窗口变化时不会动态变化
尝试监听中使用getter实时变化可是根本不变，遂改为注册window.onresize监听窗口变化
*/
/*
二次日志：1.3尝试寻找一个低代码的后端平台，最终确定使用strapi作为该项目目前的后端
之前尝试过amplify但是需要部署到aws云上，（收费）
facebook提供的Parse也是一个可用的低代码平台，但是没有GUI，不愿用（懒）
json-server可用但是好像不支持图片等数据，可能可以转为矩阵等存储在value中（有点简陋不想用）
后续可能会尝试用flask或者其他纯代码框架撸一个后端（但是不是现在考虑的事）
 */
// 1.4日志：身体不舒服，摆烂
// 1.6日志：增加了左侧菜单栏选项，虽然样式不好看，但是优化样式是后面做的事情，先试着用组件库把骨架搭出来，后面再美化
// 1.7日志：加了个头像展示栏
// 1.8日志: 加了一个顶栏，准备加短博文输入框，构思了用户发布的博文展示流
// 1.9日志: 家里马桶堵了，通了一下午马桶
/* 1.10笔记+日志： ref在template中会自动解包，无需加.value访问，在script中需要使用value
props无需使用value访问
使用setup语法糖需要使用defineExpose定义暴露给父子节点
做了一个短报文发送框
用inject方法获取了头像
考虑将单个博文包装为组件，props传单个博文对象进去，用v-for遍历获取到的博文
用cheerio或htmlparser获取博文转html后的图片路径，做一个带图片和不带图片的预览组件版本（待实现）
单个博文组件使用el自带的卡片组件+左头像
待查：strapi中特定对象的2层populate get方法
 */
// 1.11日志：实现单个博文组件，样式待调整
//1.12日志： 调整了样式和响应式数据
// 1.13日志： 做了单个博文右上角的dropdown菜单，有点焦虑内耗，
// 决定还是先做长博文编辑器（markdown）的部分，再做登录，最后完善其他部分
/* 1.14日志：做了左侧菜单按钮切换页面的功能，发现直接用组件库中的el-menu而不是按钮似乎更加
符合常理，编辑器不用之前的了，准备重写。
 */
/* 1.15日志: 编辑器顶部菜单暂时准备用el-menu，虽然好像在点击后菜单选项就会一直保持激活状态
不符合不包含状态的功能按钮应有的样式，但是组件库没提供选项更改，所以先用着，想改再看看要不再造个轮子
编辑器单个cube打算用开源基于vue的富文本md编辑器maven-editor
摆烂一下
 */
/* 1.16 解决了一下右侧滚动条会占用右侧像素造成元素不对齐的问题

 */
/*
1.17 调整了一下编辑器中 js变量与dom中编辑器的响应式关系
去除了表明当前单元格使用html或md的bool变量
测试了新增单元格的功能
 */

/*1.18
处理了leftmenu响应式高宽更新不及时的问题
新增了便捷操作栏 采用固钉的方式
后续：
考虑增加一个按钮，用于显示或隐藏单元格序号
左下角增加草稿箱
右栏放作者，创作时间等信息
 */

/*1.19
在使用 Vue3 的组件式 API 时，如果你在使用 v-for 渲染列表时对列表进行操作，可能会出现这类错误。这是因为 Vue 会在渲染列表时使用 key 值来标识列表中的每一项。如果你对列表进行修改，Vue 会尝试重用已经存在的元素来渲染新的数据，而不是创建新的元素。如果你没有为每一项设置 key 值或者你的 key 值不能唯一标识列表中的每一项，Vue 就会混淆元素。
为了避免这类问题，你应该在 v-for 指令中使用 key 值，并确保这些 key 值是唯一的。
 */

/*1.20
基本完成单元格操作功能
部署了服务器端的strapi
还有序号
草稿箱
右侧作者信息栏
 */

/*1.21
ResizeObserver可以监控元素的位置高宽变化
resize事件只能监控窗口（浏览器窗口）的变化
 */
</script>


<template>
  <el-row justify="space-around">
    <LeftMenu
        :ref-width="state.phWidth"
        :ref-left="state.phLeft"
        ref="leftMenu"
        class="leftMenu"
        @switchPage="changeCentPart"
    >

    </LeftMenu>
    <el-col :span="3" ref="placeHolder">
      <!--Just A Placeholder-->
    </el-col>
    <CentCont :center-component="centerCompTag">

    </CentCont>
    <RightCol>

    </RightCol>
  </el-row>
</template>

<style lang="scss">
#app {
  margin: 0 auto;
  width: 1600px;
  height: 100%;
  //background-color: antiquewhite;
}

.leftMenu {
  border-right: 1px solid var(--el-border-color);
  height: 100%;
}

CentCont {

}

RightCol {

}
</style>
