# 直播端

## 1. 开发构建

> **本项目采用 Vue3+Vite+pnpm 技术栈，node版本为 v18.16.0。pnpm版本未 v8.6.1。**

```bash
# 本地开发
pnpm run dev

# 构建测试环境
pnpm run build:alpha

# 构建生产环境
pnpm run build:prod

# 代码格式化
pnpm run lint:fix
```

## 2. 开发约定

> **本项目采用 ESlint + Prettier 作为代码风格检查和格式化，需要装这两个插件。**

### 2.1 目录结构

```bash
├── public              # 静态资源
│   │── favicon.ico     # favicon图标
│   └── index.html      # html模板
└── src                 # 源代码
│   ├── api             # http请求
│   ├── assets          # 静态资源：不会被编译！
│   │   ├── iconfont    # 字体文件
│   │   ├── images      # 图片
│   │   └── js          # 静态js文件
│   ├── components      # 全局组件
│   ├── constants       # 常量
│   ├── directives      # 指令
│   ├── filters         # 过滤器
│   ├── flows           # 全局业务组件
│   ├── layout          # layout
│   ├── libs            # 库文件
│   ├── plugins         # 插件
│   ├── router          # 路由
│   ├── store           # 全局状态
│   ├── styles          # 全局样式
│   ├── utils           # 全局工具方法
│   ├── views           # 所有页面
│   ├── App.vue         # 入口页面
│   └── main.js         # 入口文件
├── .editorconfig       # 编辑器配置
├── .env.xxx            # 环境变量配置
├── .eslintignore       # eslint 过滤文件
├── .eslintrc.js        # eslint 配置项
├── .gitignore          # git 过滤文件
├── .prettierrc         # 格式化配置项
├── babel.config.js     # babel-loader 配置
├── vue.config.js       # vue-cli 配置
├── postcss.config.js   # postcss 配置
└── package.json        # package.json
```

### 2.2 命名规范

#### 2.2.1 组件命名

- 所有的 Component 文件都是以大写开头驼峰式风格，除了 index.vue。
- 组件必须给 name 属性，使用大写开头驼峰式风格，如果为页面组件，路由 name 和组件 name 必须一致。

例如：

```js
import Button from '@/components/Button/index.vue'
import Select from '@/components/Select/Select.vue'
```

#### 2.2.2 路由命名

- 路由路径命名：使用全小写，多词横线连接风格。

例如：

```bash
{
  path: 'user-manage/user-list'
  path: 'user-manage/user-edit/:id'
}
```

#### 2.2.3 文件和文件夹命名

- 文件命名：使用多词横线连接风格。

例如：

```js
import '@/utils/shadow-dom.js'
import '@/utils/http-server/http.js'
```

#### 2.2.4 localStorage 说明

- 先在 /constants/index.js 中集中定义字段名称，然后再其他地方使用。

```js
// constants/index.js
const prefix = 'HEALTH__'
export default {
  token: `${prefix}TOKEN`,
  userInfo: `${prefix}USERINFO`,
}

// vue文件中
this.$storage.set(this.$constants.token)

// 普通js文件中
import storage from '@/storage'
import constants from '@/constants'
storage.set(this.$constants.token)
```


更多代码规范参考：[肖瘤前端开发规范](http://wiki.xiaoliuyisheng.cn/pages/viewpage.action?pageId=2491723)

### 2.2 代码提交

每次提交代码时需要添加一个提交类型，例如：Feat 处方详情

- Feat 新功能
- Fix 修复 Bug
- Docs 文档变更，比如 README/CHANGELOG 等
- Style 代码格式（不影响代码运行的变动）
- Refactor 重构
- Perf 性能优化
- Test 增加测试
- Chore 构建过程或辅助工具的变动
- Revert 代码回退
- Build 变更项目构建或外部依赖

## 3. 项目相关

### 3.2 路由配置

#### 路由相关属性说明

```bash
path        # 页面路径
name        # 路径名称
meta        # 路由元信息
component   # 路由页面
children    # 子路由
```

#### 路由 meta 属性说明

```bash
meta[icon]               # 路由图标
meta[title]              # 页面和菜单标题
meta[hidden]             # 是否在菜单栏隐藏 [false]
meta[multiple]           # 是否多开页面[false]
meta[keepAlive]          # 是否开启页面缓存 [false]
meta[alwaysShow]         # 是否一直显示根路由 [false]
meta[activeMenu]         # 当路由设置了该属性，则会高亮相对应的侧边栏，例如: activeMenu: 'UserList'
meta[href]               # 跳转到的http链接，配置此属性将不再打开菜单和路由
meta[beforeClose]        # 关闭二次确认 [false]
```

#### 关闭页面

```js
const { proxy } = getCurrentInstance()

// 关闭当前页面
proxy.$tab.closePage()

// 关闭指定页面
const route = useRoute()
proxy.$tab.closePage({ id: route.meta.id })

// 关闭页面之后重定向
proxy.$tab.closePage({ redirect: { /* 路由参数 */ } })
```
