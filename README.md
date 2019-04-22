## 基于EXPRESS框架搭建简单的 web 项目
* 因为`express4.x`中将命令工具分离出来了，所有需要先装 `express-generator` 。
  命令行输入：`npm install -g express-generator` ，即安装成功。
* `express --version` 查看版本，当前版本是 *4.16.0*
* `express -h` 查看express的所有命令行参数
* 执行命令 `express -e web-example` 使用 `ejs` 模板引擎，在 `web-example` 目录下创建工程
* `cd web-example` 进入到工程目录中，执行命令 `cnpm i` 安装工程依赖
* 依赖安装完成后，在工程的根目录执行 `npm start` 启动服务，服务默认监听端口为 `3000`
## 使用 `supervisor` 提高 nodejs 调试效率
* 全局安装调试工具 `npm i -g supervisor`
* 方式一 执行命令 `supervisor ./bin/www` 根目录下启动项目
* 方式二 配置 `package.json` 文件使用 `npm run debug` 命令启动项目
## 数据库
[基于角色的权限控制 RBAC](https://www.cnblogs.com/paulhe/p/4028389.html) (`Role Based Access Control`)

| 表名称            | 表描述                   |
| ----------------- | ------------------------ |
| `emay_user`       | 用户表                   |
| `auth_user_role`  | 用户与角色关联表         |
| `auth_role_auth`  | 角色与权限关联表         |
| `auth_role`       | 角色表                   |
| `auth_page`       | 页面表，并和导航产生关联 |
| `auth_oper`       | 操作权限表               |
| `auth_navigation` | 左侧导航列表             |
##### 查询步骤
  1. 通过用户 `id` 查询当前用户拥有的角色
  2. 通过角色 `id` 查询当前角色拥有的页面权限和操作权限
  3. 通过权限 `id` 查询可展示的页面并关联出导航
##### 问题
* `sequelize` 多对多 (`N:M`) 属性是驼峰写法。例如：`foreignKey` 
* `sequelize` 的部分API进行了更新，文档同步不完善，需要查询参考其他资料进行学习开发
* [新版本API更新文档](https://demopark.github.io/sequelize-docs-Zh-CN/upgrade-to-v5.html)

























#---------------------------------------------------------------------

## MaHua是什么?
一个在线编辑markdown文档的编辑器

向Mac下优秀的markdown编辑器mou致敬

## MaHua有哪些功能？

* 方便的`导入导出`功能
    *  直接把一个markdown的文本文件拖放到当前这个页面就可以了
    *  导出为一个html格式的文件，样式一点也不会丢失
* 编辑和预览`同步滚动`，所见即所得（右上角设置）
* `VIM快捷键`支持，方便vim党们快速的操作 （右上角设置）
* 强大的`自定义CSS`功能，方便定制自己的展示
* 有数量也有质量的`主题`,编辑器和预览区域
* 完美兼容`Github`的markdown语法
* 预览区域`代码高亮`
* 所有选项自动记忆

## 有问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件(dev.hubo#gmail.com, 把#换成@)
* QQ: 287759234
* weibo: [@草依山](http://weibo.com/ihubo)
* twitter: [@ihubo](http://twitter.com/ihubo)

## 捐助开发者
在兴趣的驱动下,写一个`免费`的东西，有欣喜，也还有汗水，希望你喜欢我的作品，同时也能支持一下。
当然，有钱捧个钱场（右上角的爱心标志，支持支付宝和PayPal捐助），没钱捧个人场，谢谢各位。

## 感激
感谢以下的项目,排名不分先后

* [mou](http://mouapp.com/) 
* [ace](http://ace.ajax.org/)
* [jquery](http://jquery.com)

## 关于作者

```javascript
  var ihubo = {
    nickName  : "草依山",
    site : "http://jser.me"
  }
```