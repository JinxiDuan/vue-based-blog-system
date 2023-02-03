<template>
  <div>
    <div class="topRow">
      <div style="font-weight: bold;font-size: 24px">
        {{ pageTitle ? pageTitle : "热门" }}
      </div>
      <el-icon :size="'large'">
        <MagicStick/>
      </el-icon>
    </div>
    <div class="postShortBox">
      <el-avatar
          :size="48"
          :src="loginStatus.logonStatus&&loginStatus.logonProfile.userAvatar
            ?loginStatus.urlStart+loginStatus.logonProfile.userAvatar.formats.thumbnail.url:
            loginStatus.defaultAvatar" style="margin-right: 24px;"></el-avatar>
      <el-input
          v-model="shortBlog"
          :autosize="{minRows:2,maxRows:10}"
          class="shortBlog"
          maxlength="300"
          placeholder="有什么新鲜事？"
          resize="none"
          show-word-limit
          type="textarea">

      </el-input>
    </div>
    <div class="postBtnBox">
      <el-button id="draftSaveBtn" disabled round @click="saveDraft">保存草稿</el-button>
      <el-button round type="primary" @click="submitShortBlog">
        发送短博文
      </el-button>
    </div>
    <div id="allBlogsBox">
      <SingleBlog
          v-for="blog in Blogs"
          :key="blog.id"
          :blog-prop="blog"
          @enter-passage="(blogprop)=>$emit('enterPassage', blogprop)"
      >
      </SingleBlog>
    </div>
  </div>
</template>

<script setup>
import {inject, ref} from "vue";
import SingleBlog from "./SingleBlog.vue";
import {loginStatus} from "../../LogStatus.js";
import axios from "axios";
import Cookies from "js-cookie";
import {ElMessage} from "element-plus";

let pageTitle //页面标题
let shortBlog = ref('')//短博文内容
let AvatarSrc = inject('userAvaRef')

let Blogs = ref({})
//以上代码仅供模拟接收到的数据

//真实接收数据
let getNewBlog = () => {
  let headerConfig = {};
  if (Cookies.get('jwt')) {
    headerConfig = {
      'Authorization': 'Bearer ' + Cookies.get('jwt'),
    }
  }
  axios.get('http://114.132.153.34:9200/api/blogs', {
    headers: headerConfig,
    params: {
      'sort': 'id:desc',
      'populate[0]': 'Likes',
      'populate[1]': 'users_permissions_user',
      'populate[2]': 'users_permissions_user.userAvatar'
    }
  }).then((response) => {
    Blogs.value = response.data.data;
    console.log(Blogs.value)
  }).catch((err) => {
    console.log(err)
  })
}
getNewBlog();

let saveDraft = () => {
  // location.href="https://baidu.com/"
}

let submitShortBlog = () => {
  if (loginStatus.logonStatus) {
    if (shortBlog.value) {
      let data = {
        data: {
          Title: "No Title",
          Content: {
            passage: shortBlog.value
          },
          IfShortBlog: true,
          users_permissions_user: {
            connect: [loginStatus.logonProfile.id]
          }
        }
      }
      axios.post('http://114.132.153.34:9200/api/blogs', data, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get('jwt'),
        }
      }).then((response) => {
        console.log(response.data)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      ElMessage({
        type: "warning",
        message: "内容不能为空!"
      })
    }
  } else {
    ElMessage({
      type: "warning",
      message: "请先登录!"
    })
  }
}
</script>

<style scoped>
.topRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.postShortBox {
  display: flex;
  flex-direction: row;
}

.shortBlog {
  font-size: 22px;
  width: auto;
  flex: 1;
}

.postBtnBox {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.postBtnBox #draftSaveBtn {
  margin-left: 60px;
}


</style>