<template>
  <div class="container">
    <div class="topRow">
      <el-button :icon="'Back'" circle @click="$emit('returnHit')">
      </el-button>
      <div style="display: flex;justify-content:center;align-items:center;">
        <span
            style=
                "padding-right: 10px;
                font-size: 30px;
                display: flex;
                justify-content:center;
                align-items:center;"
        >
          <el-icon>
            <Document/>
          </el-icon>
        </span>
        <span class="pageTitle">
          文章
        </span>

      </div>
    </div>
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="avaTimeBox">
      <el-avatar
          :src="avatarUrl"
      ></el-avatar>
      <div class="userName">
        {{ userName }}
      </div>
      <div class="userID userName">
        ·
      </div>
      <div class="userID userName">
        {{'@'+userID}}
      </div>
      <div class="userID userName">
        ·
      </div>
      <div class="userID userName">
        {{compiledTimeObj.format('YYYY/MM/DD HH:mm:ss')}}
      </div>
    </div>
    <div class="body markdown-body">
      <div v-for="(para,i) in passage" v-html="para.html">

      </div>
    </div>
  </div>
</template>

<script setup>
import {inject} from "vue";
import "../../assets/css/github-markdown.min.css"
import {loginStatus} from "../../LogStatus.js";
import moment from "moment";

let rawPassage = inject('passage');
let title = rawPassage.value.attributes.Title
let passage = rawPassage.value.attributes.Content.passage;
let avatarUrl = rawPassage.value.attributes.users_permissions_user
    .data.attributes.userAvatar ? loginStatus.urlStart + rawPassage.value.attributes.users_permissions_user
    .data.attributes.userAvatar.data.attributes.formats.thumbnail.url : loginStatus.defaultAvatar;
let userName = rawPassage.value.attributes.users_permissions_user
    .data.attributes.notUniqueName;
let userID = rawPassage.value.attributes.users_permissions_user
    .data.attributes.username;
let ifShortBlog = rawPassage.value.attributes.IfShortBlog;
let likes = rawPassage.value.attributes.Likes.data.length;
let comments = rawPassage.value.attributes.Comments;
let publishTime = rawPassage.value.attributes.publishedAt;
let compiledTimeObj = moment.utc(publishTime);
compiledTimeObj.locale();
console.log(passage)
</script>

<style scoped>
.container {
  width: 100%;
}

.pageTitle {
  font-size: 24px;
  font-weight: bold;
}

.topRow {
  width: 100%;
  height: 70px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color)
}


.title {
  text-align: center;
}

.avaTimeBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0 25px 0;
}

.userName {
  margin-left: 10px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: 21px;
  font-weight: 500;
}

.userID{
  font-size: 18px;
  color: rgb(51,65,85);
}

.body {
  width: 100%;
}
</style>