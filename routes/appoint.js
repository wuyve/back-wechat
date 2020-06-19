var express = require('express');
var router = express.Router();
const URL = require('url');
const mysql = require('mysql');
const { isArray } = require('util');
const { param } = require('./receiveAddr');
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

// 新增预约信息
router.post('/add', function(req, res, next) {
    let params = req.body; // post
    let addSQL = `INSERT INTO appoint (open_id, date, opera, item) VALUES (?, ?, ?, ?)`;
    let addparam = [params.open_id, params.date, params.opera, params.item];
    console.log(params);
    connection.query(addSQL, addparam, function(err, results) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        errno.errno = 104;
        errno.message = '预约失败';
      }
      res.send({errno, results});
    });
});

// 获取预约信息
router.get('/get', function(req, res, next) {
  let params = URL.parse(req.url, true).query;
  console.log(params);
  let searchSQL = `SELECT * FROM appoint WHERE open_id = '${params.open_id}' AND opera = '${params.opera}'`;
  let searchParam = [params.open_id, params.opera];
  connection.query(searchSQL, function(err, results) {
    if (err) {
      console.log('[SELECt ERROR] - ', err.message);
      errno.errno = 105;
      errno.message = '查询预约信息失败';
    }
    res.send({errno, results});
  });
});

// // 删除收货地址
// router.delete('/delete', function(req, res, next) {
//   let params = req.body;
//   let delSQL = `DELETE FROM receive_address WHERE receive_id = ${params.receive_id}`;
//   connection.query(delSQL, function(err, results) {
//     if(err) {
//       console.log('[UPDATE ERROR] - ', err.message);
//       // 删除项目失败，返回errno: '102'
//       errno.errno = '102';
//       errno.description = '删除收货地址失败';
//     }
//     res.send({errno, results});
//   });
// });

// // 修改收货地址
// router.post('/modify', function(req, res, next) {
//   let params = req.body;
//   let updateSQL = `UPDATE receive_address SET is_default = ?, open_id = ?, link_name = ?, link_phone = ?, link_area = ?, link_addr = ? WHERE receive_id = ?`;
//   let updateParams = [params.is_default, params.open_id, params.link_name, params.link_phone, params.link_area, params.link_addr, params.receive_id];
//   connection.query(updateSQL, updateParams, function(err, results) {
//     if (err) {
//       console.log('[UPDATE ERROR] - ', err.message);
//       // 修改项目失败，返回errno: '103'
//       errno.errno = '103';
//       errno.description = '修改收货地址失败';
//     }
//     res.send({errno, results});
//   });
// });

module.exports = router;
