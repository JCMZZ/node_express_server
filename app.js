/**
 * 注入模块
 */
let CREATEERROR = require('http-errors');
let express = require('express');
let session = require('express-session');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let interceptor = require('./bin/interceptor');
/**
 * 注入路由
 */
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/user');
let loginRouter = require('./routes/login');
let roleRouter = require('./routes/role');
let logRouter = require('./routes/log');
/**
 * 引入配置
 */
let { CONFIG, PROJECT, SECRET } = require('./bin/config')
/**
 * 生成项目实例
 */
let app = express();
/**
 * 视图引擎设置
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**
 * 使用 session 中间件
 */
app.use(session({
  name: 'JSESSION',
  /**
   * 对session id 相关的cookie 进行签名
   */
  secret: SECRET,
  resave: true,
  /**
   * 是否保存未初始化的会话
   */
  saveUninitialized: false,
  cookie: {
    /**
     * 设置 session 的有效时间，单位毫秒
     */
    maxAge: 1000 * 60 * 1,
  }
}));

/**
 * 注入中间件
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * 拦截器
 */
app.use(interceptor());
/**
 * 注册路由
 */
app.use(PROJECT, indexRouter);
app.use(PROJECT, usersRouter);
app.use(PROJECT, loginRouter);
app.use(PROJECT, roleRouter);
app.use(PROJECT, logRouter);

/* 捕获404并转发给错误处理程序 */
// app.use(function(req, res, next) {
//   next(CREATEERROR(404));
// });

// /* 错误处理程序 */
// app.use(function(err, req, res, next) {
//   /* 设置局部变量，只提供开发中的错误 */
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   /* 渲染错误页面 */
//   res.status(err.status || 500);
//   res.render('error', {...CONFIG, currentPage: {name: '404'}, operAuth: JSON.stringify([]) });
// });

module.exports = app;
