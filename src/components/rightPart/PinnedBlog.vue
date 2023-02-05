<template>
  <div class="PBcontainer">
    <div class="searchBox">
      <input v-model="searchText" placeholder="输入以搜索">
    </div>
    <div class="titleBoard">
      <span>
        置顶
      </span>
      <span>
        📌
      </span>
    </div>
    <div class="pinnedBoxes">
      <el-card class="pinnedBlogs" shadow="hover" v-for="(blog, i) in PinnedBlogs" key="i">

        <template #header>

          <div class="cardHeader">
            <div class="avaAndNameID">
              <el-avatar
                  :src="blog.avasrc">
              </el-avatar>
              <div class="nameAndID">
                <div class="name">
                  {{blog.name}}
                </div>
                <div class="ID">
                  {{'@'+blog.ID}}
                </div>
              </div>
            </div>
            <el-tag>
              {{blog.tag}}
            </el-tag>
          </div>

        </template>

        <div class="PBContent" v-html="blog.content">

        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const searchText = ref('')

const PinnedBlogs = ref([{
  avasrc: "http://114.132.153.34:9200/uploads/nms_5cfc64a7b7.png?updated_at=2023-01-08T13:12:37.654Z",
  name: "Fredrick_DR",
  ID: "callmefred",
  tag: "CORE TEAM",
  content: "ola，新伙计！<br><br>欢迎你来到我的个人博客Fred's Blog。" +
      "虽说是个人博客，但你也可以在这里注册自己的账号" +
      "，自由发布自己的博文和分享。" +
      "接下来就让我作为blogger以及主要开发者（目前也是唯一开发者）" +
      "为你介绍一下博客的主要功能和分布。" +
      "<br><br>本博客以编程技术内容分享为主，其他内容为辅。后续可能会根据内容类别进行板块划分。" +
      "<br>博客采取三栏设计，左侧为菜单栏，中间为主要内容区，右侧为工具栏。" +
      "<br><br><h3>Quick Start</h3>在左栏底部找到“未登录”区域，点击进行登录或注册" +
      "，获取到登录态后你就可以在本博客自由探索啦！例如在最新或热门给喜欢的博文点赞、随手写一个短博文" +
      "、或用Markdown格式写一篇长博文。" +
      "<br><br><h3>碎碎念</h3>在左侧选取最新或热门模块以浏览当前最新发布以及热度最高的博文；" +
      "选取我的关注来查看我关注的blogger发布的内容；选取日志来查看博客系统更新日志以及未来" +
      "可能的TODO List，选择README来查看本博客详细设计文档（说明书）。（待续）"
}])
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.PBcontainer {

}

.PBcontainer .searchBox {
  height: 60px;
  padding: 12px 30px;
}

.searchBox input {
  cursor: not-allowed;
  outline: none;
  border-radius: 16px;
  height: 100%;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid transparent;
  background-color: rgba(27, 28, 31, 0.11);
}

.searchBox input:focus {
  background-color: white;
  border: 2px solid #007efc;
}

.titleBoard {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px 10px 30px;
  font-size: 21px;
  font-weight: bold;
}

.pinnedBoxes {
  margin: 5px 30px;
}

.PBContent{
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  line-height: 24px;
}

.pinnedBlogs {
  border-radius: 20px;
}

.cardHeader{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avaAndNameID{
  display: flex;
  flex-direction: row;
}

.nameAndID{
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  margin-top: 2px;
  margin-left: 12px;
}

.name{
  font-weight: bold;
}

.ID{
  margin-top: 2px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.71);
}
</style>