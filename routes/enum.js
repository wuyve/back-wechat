// 存储枚举值
var express = require('express');
var router = express.Router();
const URL = require('url');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'wechatspa',
  multipleStatements: true
});
connection.connect();
var errno = {
  errno: 200,
  message: '成功'
};

// 新增枚举
router.post('/add', function(req, res, next) {
    let params = req.body; // post
    let addSQL = `INSERT INTO enum (keywords, key, words) VALUES (?, ?, ?)`;
    let addparam = [params.keywords, params.key, params.words];
    console.log(params);
    connection.query(addSQL, addparam, function(err, results) {
      errno.errno = 200;
      errno.message = '成功';
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        errno.errno = 120;
        errno.message = '添加枚举失败';
      }
      res.send({errno, results});
    });
});

// 获取枚举
router.get('/get', function(req, res, next) {
    let params = URL.parse(req.url, true).query;
    console.log(params);
    let searchSQL =  `SELECT * FROM enum WHERE keywords = '${params.keywords}' AND key = ${params.key}`;
    connection.query(searchSQL, function(err, results) {
      errno.errno = 200;
      errno.message = '成功';
      if (err) {
        console.log('[SELECt ERROR] - ', err.message);
        errno.errno = 121;
        errno.message = '查询枚举失败';
      }
      res.send({errno, results});
    });
});

module.exports = router;
