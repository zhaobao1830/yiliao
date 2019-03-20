![](https://img.shields.io/badge/版本-0.0.1.alpha.1-3963bc.svg)
![](https://img.shields.io/badge/node-10.15.3+-3963bc.svg)
![](https://img.shields.io/badge/vue-~2.5.17-3963bc.svg)
![](https://img.shields.io/badge/脚手架-vuecli3-3963bc.svg)
![](https://img.shields.io/badge/element-~2.4.6-3963bc.svg)

#### 简介
使用Vue+element-ui实现的内容管理系统框架 
#### 目录结构
├───public // 公共资源目录，该目录webpack原封打包

│    ├───icons // icon图片存放目录

│    │   favicon.ico // 本站favicon图片

│    │   index.html // template模板

├───src

│    ├───assets // 静态资源文件存放目录

│    ├───base // 基础组件 

│    ├───common // 核心库

│    │   │   config // 全局的基础配置

│    │   │   filter // 全局过滤器

│    │   │   mixin // 全局mixin

│    │   │   models // model层

│    │   │   utils // 各种工具函数

│    ├───components // 布局组件及业务基础组件

│    ├───router // 前端路由

│    │   │   index.js // vue-router入口文件

│    │   │   routes.js // vue-router路由配置

│    ├───store // vuex状态管理文件

│    ├───views // 业务组件

│    │   App.vue // vue根组件

│    │   main.js // webpack打包入口

│   babel.config.js // babel配置文件

│   .browserslistrc // 适配浏览器版本

│   .eslintrc.js // eslint配置文件

│   .gitignore // git上传忽略文件

