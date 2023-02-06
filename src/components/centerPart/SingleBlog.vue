<template>
  <div class="blogBox">

    <el-avatar
        :src="avatarUrl"
        :size="48"
        class="avaBeforeBlog"
    >
    </el-avatar>

    <div class="IDBody" style="margin-top: 2px;">

      <div class="nameAndID">
        <span class="name">{{ userName }}</span>
        &nbsp;&nbsp;
        <span class="id">{{ '@' + userID + ' · ' + timeago }}</span>
      </div>

      <div class="body" style="margin-top: 2px;">
        {{ ifShortBlog ? passage : "发布了新博文" }}
      </div>


      <el-dropdown class="ThreeDotDD">
        <el-button :icon="'MoreFilled'" circle text>

        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>查看该推文</el-dropdown-item>
            <el-dropdown-item>关注博主</el-dropdown-item>
          </el-dropdown-menu>

        </template>
      </el-dropdown>

      <el-card
          class="longBlogBody"
          v-if="!ifShortBlog"
          shadow="hover"
          @click="enterPassage"
      >
        <template #header>
          <div class="title">
            {{ title }}
          </div>
        </template>
        <div class="bodyPassage">
          {{ txtPass }}
        </div>
      </el-card>

      <div class="OperateArea">
        <div class="btnWithData" v-for="(btn, i) in btnList">
          <div class="bottomBtn" @click="btn.clickEvent">
            <img :src="btn.clicked?btn.fillsrc:btn.src" height="18" width="18">
          </div>
          <span v-if="btn.data">{{ btn.data }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import markdownToTxt from "markdown-to-txt";
import {ref, watch} from "vue";
import like from '../../assets/like.svg'
import liked from '../../assets/liked.svg'
import comment from '../../assets/comment.svg'
import comment_filled from '../../assets/comment_filled.svg'
import share from '../../assets/share.svg'
import {format} from "timeago.js";
import {loginStatus} from "../../LogStatus.js";
import {ElMessage} from "element-plus";
import axios from "axios";
import Cookies from "js-cookie";


const emits = defineEmits(['enterPassage'])
const props = defineProps({
  blogProp: Object,
})
console.log(props.blogProp)
let RequesUrl = "http://114.132.153.34:9200"
let blogID = props.blogProp.id;
let avatarUrl = props.blogProp.attributes.users_permissions_user
    .data.attributes.userAvatar? RequesUrl + props.blogProp.attributes.users_permissions_user
    .data.attributes.userAvatar.data.attributes.formats.thumbnail.url: loginStatus.defaultAvatar;
let userName = props.blogProp.attributes.users_permissions_user
    .data.attributes.notUniqueName;
let userID = props.blogProp.attributes.users_permissions_user
    .data.attributes.username;
let ifShortBlog = props.blogProp.attributes.IfShortBlog;
let title = props.blogProp.attributes.Title;
let passage = props.blogProp.attributes.Content.passage;
let likes = props.blogProp.attributes.Likes.data.length;
let comments = props.blogProp.attributes.Comments;
let publishTime = props.blogProp.attributes.publishedAt;
let timeago = ref(format(publishTime, 'zh_CN'));
let likeEvent = () => {
      if (loginStatus.logonStatus) {
        btnList.value[0].clicked = !btnList.value[0].clicked;
      } else {
        ElMessage({
          message: "请先登录！",
          type: "warning"
        })
      }
    },
    commentEvent = () => {
    }, shareEvent = () => {
    };//后续定义事件函数

let getLiked = () => {
  for (let index in props.blogProp.attributes.Likes.data) {
    if (props.blogProp.attributes.Likes.data[index].id == loginStatus.logonProfile.id) {
      return true;
    }
  }
  return false;
}

let btnList = ref([{
  src: like,
  clickEvent: likeEvent,
  clicked: getLiked(),//改为GET到的参数
  fillsrc: liked,
  data: likes
}, {
  src: comment,
  clickEvent: commentEvent,
  clicked: false,
  fillsrc: comment_filled,
  data: comments
}, {
  src: share,
  clickEvent: shareEvent
}])

watch(() => btnList.value[0].clicked, (newValue) => {
  console.log(newValue)
  let keyID;
  let jwtoken = Cookies.get('jwt');
  if (newValue) {
    keyID = {
      connect: [loginStatus.logonProfile.id]
    };
  } else {
    keyID = {
      disconnect: [loginStatus.logonProfile.id]
    };
  }
  console.log(keyID)
  axios.put('http://114.132.153.34:9200/api/blogs/'+blogID+'?populate=*',
      {data: {Likes: keyID}},
      {
        headers: {
          'Authorization': 'Bearer '+jwtoken,
        }
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        btnList.value[0].data = data.data.attributes.Likes.data.length;
      })
      .catch((err) => {
        console.log(err);
      });

})
// console.log(btnList.value)
let txtPass = '';
if (!ifShortBlog) {
  for (let para in passage) {
    txtPass += markdownToTxt(passage[para].raw);
  }
}

let enterPassage = ()=>{
  emits('enterPassage', props.blogProp)
}

// console.log(txtPass)
</script>

<style lang="scss" scoped>
* {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.blogBox {
  position: relative;
  width: 100%;
  margin-top: 10px;
  border-top: 1px dashed var(--el-border-color);
  padding-top: 14px;
  display: flex;
  flex-direction: row;
  transition-duration: 0.3s;
  transition-property: background-color;

}

.blogBox:hover {
  /*background-color: #dedfe0;*/
}

.avaBeforeBlog {
  margin-right: 24px;
}

.IDBody {
  width: 720px;
  display: flex;
  flex-direction: column;
}

.nameAndID {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name {
  font-weight: bold;
}

.id {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.59);
}

.longBlogBody {
  cursor: pointer;
  border-radius: 20px;
  margin-top: 6px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.bodyPassage {
  font-size: 18px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #606266;
}

.OperateArea {
  width: 400px;
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.btnWithData {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.bottomBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
}

.bottomBtn:hover {
  background-color: rgba(77, 76, 76, 0.14);
}

.ThreeDotDD {
  position: absolute;
  top: 6px;
  right: 10px;
}
</style>
