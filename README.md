## React后台管理系统

### 1 . 项目简介

1) 此项目是一个后台管理的 SPA 

2) 使用 React 全家桶 + Antd + Axios + ES6 + Webpack 等技术 

3) 采用模块化、组件化、工程化的模式开发

### 2 . 项目启动

开发环境运行

```javascript
npm start
```

生产环境运行

```
npm run build
```

测试环境

```
npm run test
```

### 3 . 技术选型

前后台数据展现/交互/组件化

```javascript
react react-router-dom antd redux
```

接口测试工具

```javascript
postman
```

模拟数据工具

```javascript
json-server mock-js
```

项目构建/工程化

```javascript
webpack creat-react-app eslint
```

富文本编辑器

```javascript
react-draft-wysiwyg draft-js draft-to-html
```

图标库

```javascript
echarts
```

### 4 . 开发日志

#### 2021.01.30

1> 解决授权时间是当前时间的bug

2> 完成角色管理页面增删改查等功能

3> 完成用户管理页面删除功能和修改时回显的功能

4> category组件异步请求一级分类列表和二级分类列表

5> category组件完善列表显示,显示隐藏添加或更新的modal界面

#### 2021.01.29

1> 头部添加动态获取地区的天气组件 (rc-form进行表单校验,微数据的在线天气请求接口,免费的只能使用20次)

2> 用户管理静态页面搭建,获取角色列表,设置角色权限 (antd->Tree)

3> 搭建redux仓库,使用异步中间件 (redux-thunk)

4> category 和 product 静态页面搭建

#### 2021.01.25

1>完成登录静态页面以及表单前端验证

2> 完成项目整体框架,侧边栏及路由搭建 (使用递归,利用props.location.pathname设置刷新后要打开的侧边栏)

3> 完成头部静态组件 

### 5 . 问题

**1 . antd->Tree无法回显**

解决:  onCheck={onCheck}   checkedKeys={checkedKeys}结合使用      单使用selectedKeys={checkedKeys}无效