var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');/*post方法*/

// ==路由信息（接口地址）开始存放在./routers目录下==
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var receive_address = require('./routes/receiveAddr');
var appoint = require('./routes/appoint');
var coupon = require('./routes/coupon.js');
var my_enum = require('./routes/enum.js');
var shopperInfo = require('./routes/shopperInfo.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/receive/address', receive_address);
app.use('/appoint', appoint);
app.use('/coupon', coupon);
app.use('/enum', my_enum);
app.use('/shopper/info', shopperInfo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// var app = express();

app.all('*', function (req, res, next) {
  // 设置请求头为允许跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 设置服务器支持的所有头信息字段
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
  // 设置服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method.toLowerCase() == 'options') {
      res.send(200);  // 让options尝试请求快速结束
  } else {
      next();
  }
});

module.exports = app;