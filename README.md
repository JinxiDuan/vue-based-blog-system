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

| 框架                                                                                                                    | 构建工具                                                                                                                                                  | 组件库(CSS框架)                                                                              | 网络请求库                                                                                                                                                                                                    | 后端API(可选)                                                                                                                    | 测试框架(可选)                                                                                    |
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

关于自动拉取构建与部署静态站点，请参考Vite官网文档中关于[部署静态站点](https://cn.vitejs.dev/guide/static-deploy.html)的说明。

请注意，无论您使用何种静态站点部署与托管服务，请务必确保fork本repo后，将**fork的仓库**导入。

# 总体布局与灵感 Overall Layout and Inspiration

我的博客页面主要采用三栏式布局，中间一栏作为主要内容区域

# 左菜单栏 Left Menu

# 各二级页面 Secondary Page

# 右栏 Right Column

# API与后台管理 API and Backend Management

# 困难与亮点(加分部分) Problem and Highlights

# 自我评价与讨论 Self-assessment and Discussion

# 总结 Summary

# 贡献与维护 Contribution and Maintain
