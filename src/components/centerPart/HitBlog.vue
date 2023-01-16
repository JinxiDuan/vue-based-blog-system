<template>
  <div class="topRow">
    <div style="font-weight: bold;font-size: 24px">
      {{ pageTitle ? pageTitle : "热门" }}
    </div>
    <el-icon :size="'large'">
      <MagicStick/>
    </el-icon>
  </div>
  <div class="postShortBox">
    <el-avatar :src="AvatarSrc" style="margin-right: 24px;" :size="48"></el-avatar>
    <el-input
        v-model="shortBlog"
        placeholder="有什么新鲜事？"
        type="textarea"
        maxlength="300"
        :autosize="{minRows:2,maxRows:10}"
        resize="none"
        class="shortBlog"
        show-word-limit>

    </el-input>
  </div>
  <div class="postBtnBox">
    <el-button round id="draftSaveBtn" disabled>保存草稿</el-button>
    <el-button type="primary" round >
      发送短博文
    </el-button>
  </div>
  <div id="allBlogsBox">
    <SingleBlog v-for="(blog,i) in Blogs" :key="i" :blog-prop="blog">
    </SingleBlog>
  </div>
</template>

<script setup>
import {inject, ref} from "vue";
import SingleBlog from "./SingleBlog.vue";

let pageTitle //页面标题
let shortBlog = ref('')//短博文内容
let AvatarSrc = inject('userAvaRef')
//以下代码仅供模拟接收到的数据
let SingleBlogEG = `{
  "id": 1,
  "attributes": {
    "Title": "TestBlog",
    "BlogID": "blog-0",
    "Content": {
      "passage": [
        {
          "raw": "# title1",
          "html": "<h1>title1</h1>",
          "useHtml": true
        },
        {
          "raw": "# title1 Amazon should recognize its first unionized warehouse in the U.S., a federal labor official has ruled, rejecting the company's bid to unravel a breakthrough union win on Staten Island.\\n\\nOn Wednesday, the National Labor Relations Board's Region 28 regional director, Cornele Overstreet, dismissed Amazon's allegations that labor-board officers and union organizers improperly influenced the union vote. In the spring, the upstart Amazon Labor Union won the right to represent some 8,000 workers at the massive New York warehouse.\\n\\nAmazon is expected to appeal the Jan. 11 ruling before the full board in Washington, D.C. But labor experts say board members are likely to side with their regional colleagues. That would certify the union's win and require Amazon to begin bargaining \\"in good faith\\" with the union, or they can request a review of the decision by Jan. 25. If the company refuses, the case would likely make its way into courts.",
          "html": "<h1>title1</h1>",
          "useHtml": true
        }
      ]
    },
    "Likes": "0",
    "createdAt": "2023-01-03T14:23:20.842Z",
    "updatedAt": "2023-01-10T14:24:04.045Z",
    "publishedAt": "2023-01-03T14:23:24.787Z",
    "IfShortBlog": false,
    "blog_user": {
      "data": {
        "id": 1,
        "attributes": {
          "UserID": "testuser",
          "UserName": "testUser",
          "UserRole": "user",
          "createdAt": "2023-01-08T12:04:26.535Z",
          "updatedAt": "2023-01-08T13:12:40.574Z",
          "publishedAt": "2023-01-08T12:04:33.007Z",
          "UserAvatar": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "nms.png",
                "alternativeText": null,
                "caption": null,
                "width": 1920,
                "height": 1080,
                "formats": {
                  "thumbnail": {
                    "name": "thumbnail_nms.png",
                    "hash": "thumbnail_nms_5cfc64a7b7",
                    "ext": ".png",
                    "mime": "image/png",
                    "path": null,
                    "width": 245,
                    "height": 138,
                    "size": 53.33,
                    "url": "/uploads/thumbnail_nms_5cfc64a7b7.png"
                  },
                  "small": {
                    "name": "small_nms.png",
                    "hash": "small_nms_5cfc64a7b7",
                    "ext": ".png",
                    "mime": "image/png",
                    "path": null,
                    "width": 500,
                    "height": 281,
                    "size": 179.83,
                    "url": "/uploads/small_nms_5cfc64a7b7.png"
                  },
                  "medium": {
                    "name": "medium_nms.png",
                    "hash": "medium_nms_5cfc64a7b7",
                    "ext": ".png",
                    "mime": "image/png",
                    "path": null,
                    "width": 750,
                    "height": 422,
                    "size": 368.33,
                    "url": "/uploads/medium_nms_5cfc64a7b7.png"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`
SingleBlogEG = JSON.parse(SingleBlogEG)
let Blogs = ref([SingleBlogEG, SingleBlogEG, SingleBlogEG, SingleBlogEG])
//以上代码仅供模拟接收到的数据

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
}
.postBtnBox{
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.postBtnBox #draftSaveBtn{
  margin-left: 60px;
}


</style>