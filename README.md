# Vue-based Front-end Blog System

# 简介 Introduction

这是一个主要使用**Vue技术栈**构建的博客前端系统，本来是学校Web应用开发课程的大作业，
但本着一不做二不休的原则，我打算以这份大作业为基础，逐渐将这个博客系统完善为我的个人博客。

> [Check My Instance](http://xn--ykqpuy7vfvs.codes/)
> *Its domain may looks weird but not purposely be offensive.
> It's just a test for Chinese included domain and I randomly choose the words. When the blog is formally in service I
> will register a new decent domain.*

- 多用户的博客系统
- 注册、登录、用户设置
- 单一用户的个性化主页 [-]
- 具有短博文与长博文两种类型
- 长博文支持Markdown语法
- 长博文支持多单元格编辑
- 支持点赞、评论 [-]
- 共享的日志

**[-]**: 尚未完全实现，等待后续OTA

尽管此项目将会部署上线作为我的个人博客，前端部分构建前的源代码将会保持开源。

# 技术栈和工具使用 Technologies and Tool Used

|                                                          框架                                                           |                                                                         构建工具                                                                          |                                       组件库(CSS框架)                                        |                                                                                                  网络请求库                                                                                                   |                                                          后端API(可选)                                                           |                                          测试框架(可选)                                           |
|:---------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|
| <img src="https://cdn.iconscout.com/icon/free/png-256/vuejs-1175052.png" style="width: 100px;height: auto"><br/>Vue 3 | <img title="" src="https://avatars.githubusercontent.com/u/65625612?s=280&v=4" alt="" style="width: 100px;height: auto" data-align="inline"><br/>Vite | <img src="https://element-plus.gitee.io/images/element-plus-logo.svg"><br/>Element Plus | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Axios_%28computer_library%29_logo.svg/1280px-Axios_%28computer_library%29_logo.svg.png" style="width: 100px;height: auto"><br/>Axios | <img src="https://strapi.io/assets/strapi-logo-dark.svg" style="width: 100px;height: auto"><br/>strapi<br/>Community Edition | <img src="https://vitest.dev/logo-shadow.svg" style="width: 100px;height: auto"><br/>Vitest |

### 其他工具和依赖 Other dependencies

- [js-cookie](https://www.npmjs.com/package/js-cookie)
- [markdown-to-text](https://www.npmjs.com/package/markdown-to-text)
- [mavon-editor](https://www.npmjs.com/package/mavon-editor)
- [moment](https://www.npmjs.com/package/moment)
- [node-shi](https://www.npmjs.com/package/node-shi)
- [timeago.js](https://www.npmjs.com/package/timeago.js)

# 部署与使用方法 Deploy

在clone下载本项目后，请首先安装依赖

**npm**

```shell
npm install
```

**yarn**

```shell
yarn install
```

**pnpm**

```shell
pnpm install
```

*后文中将均以npm为例，其他包管理器修改管理器命令即可*

要进入**开发模式**，使用vite中的dev指令即可

```shell
vite dev || npm run dev
```

要**部署**到Web Server上，需要先使用Vite进行构建，默认输出到`.\deploy`目录中

```shell
vite build || npm run build
```

要修改输出目录或公共基础路径，需要修改`vite.config.js`文件

```javascript
export default defineConfig({
    plugins: [vue()],
    base: '/',//<----修改base选项来修改公共基础路径
    build: {
        outDir: 'deploy',//<----修改outDir选项来修改输出目录
    }
    // resolve: { alias: { 'vue': 'vue/dist/vue.esm-bundler.js' } }
})
```

关于自动拉取构建与部署静态站点，请参考Vite官网文档中关于[部署静态站点](https://cn.vitejs.dev/guide/static-deploy.html)
的说明。

请注意，无论您使用何种静态站点部署与托管服务，请务必确保**fork本repo**后，将**fork的仓库**导入。

# 总体布局与灵感 Overall Layout and Inspiration

我的博客页面主要采用三栏式布局,中间一栏作为主要内容区域，左侧为菜单栏，右侧为附加/工具栏。这样布局设计主要是受到Twitt*
r布局方式的启发，这种布局简洁易用，也易于展示较新的信息流，后续加入响应式布局也比较方便。

![mainPrev](http://114.132.153.34:9200/uploads/2023_02_12_230437_698adf1466.png?updated_at=2023-02-12T15:06:42.677Z)

**关于灵感**

起初我是打算使用个人技术博客常用的以板块进行分区的布局方式，即根据博文所属的不同技术分区进行归类，大致用UI模拟了一下，发现这样主页比较冗杂，不便使用。

不仅如此，我们的作业要求构建一个支持多人使用的博客系统，即他人也可以通过博客平台分享自己的博文，用户之间可以互动，我转念一想这不就是社交媒体的交互形式吗，于是借鉴了小蓝鸟的三栏式布局，但也根据相应的需求调整了比例与具体内容。

# 左菜单栏 Left Menu

左侧的菜单栏是相对比较静态的页面，主要承担着整个博客项目中Navigator的角色。

![leftNavi](http://114.132.153.34:9200/uploads/2023_02_22_202736_c82c6ea6b6.png?updated_at=2023-02-22T12:29:33.474Z)

*侧边栏典型状态*

主要由Logo、导航按钮、长博文发送按钮和Profile栏组成

- Logo是采用简单的黑白底色+文字实现的，但是似乎直角边与圆角风格由些许违和，后续可能会改成圆角形式

- 导航按钮采用的是Element+组件库中的`<el-button>`标签实现，点击按钮即可导航到相应的二级页面

- 长博文按钮采用单个的大号蓝色按钮(由于组件库默认主题色为蓝色)

- Profile栏则是在初次加载页面时加载，首先会检查cookie中是否存储了登录的token信息，若没有则显示未登录，若存储了则通过Get请求获取个人头像ID信息。

# 各二级页面 Secondary Page

目前主要有六类二级页面，分别为： 
## 热门、最新博文预览

最新博文预览目前主要负责从后台获取博文信息流，并将其以简短形式流式展示在主页上

展示方式主要为两列，第一列为**头像**，第二列分别从上到下排列为**昵称**与**博文内容**，底部为**操作栏**，可以进行点赞，评论，转发等操作

**头像**采用`<el-avatar>`标签，**博文内容**分为两类，短博文如下：

![short](http://114.132.153.34:9200/uploads/_a6069446c8.png?updated_at=2023-02-22T15:59:41.126Z)

长博文采用卡片形式简短展示，卡片为element+标签`<el-card>`，并修改了圆角值，效果如下:

![long](http://114.132.153.34:9200/uploads/longblog_a69b01e21b.png?updated_at=2023-02-22T16:09:37.139Z)

除了博文展示外，用户还可以直接在页面顶部随手发送一篇短博文，同样使用头像+主区域的形式，其中头像使用头像组件，主区域为一个自适应高度的输入框，
使用 `<el-input>`中的`type="textarea"`属性实现，字数限制为300，使用maxlength属性实现，输入框下方使用按钮组件作为发送按钮，效果如下：

![input](http://114.132.153.34:9200/uploads/input_cbaa8689e9.png?updated_at=2023-02-22T16:21:00.222Z)

## 我的关注列表

我的关注列表主要采用条式展示用户关注的用户列表信息，可以点击用户进行查看
目前效果如下 _(暂时)_ ：

![follows](http://114.132.153.34:9200/uploads/follow_e6908e27be.png?updated_at=2023-02-22T16:25:23.504Z)

## 博客日志

博客日志主要用于展示博客更新的日志以及一些日后的一些更新计划，主要由两部分组成，分别为**日历**与**当日详细日志列表**

## README(本页面)
## 长博文编辑页面
## 登录、注册页面

# 右栏 Right Column

# API与后台管理 API and Backend Management

# 困难与亮点(加分部分) Problem and Highlights

# 自我评价与讨论 Self-assessment and Discussion

# 总结 Summary

# 贡献与维护 Contribution and Maintain
