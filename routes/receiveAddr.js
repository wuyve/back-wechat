var express = require('express');
var router = express.Router();
const URL = require('url');
const mysql = require('mysql');
const { isArray } = require('util');
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

// 添加收货地址
router.post('/add', function(req, res, next) {
    let params = req.body; // post
    let addSQL = `INSERT INTO receive_address (is_default, open_id, link_name, link_phone, link_area, link_addr) VALUES (?, ?, ?, ?, ?, ?)`;
    let addparam = [params.is_default, params.open_id, params.link_name, params.link_phone, params.link_area, params.link_addr];
    console.log(params);
    console.log(isArray(params.link_area))
    connection.query(addSQL, addparam, function(err, results) {
      errno.errno = 200;
      errno.message = '成功';  
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        errno.errno = 100;
        errno.message = '添加收货地址失败';
      }
      res.send(errno);
    });
});

// 获取收货地址
router.get('/get', function(req, res, next) {
  let params = URL.parse(req.url, true).query;
  console.log(params);
  let searchSQL = `SELECT * FROM receive_address WHERE open_id = '${params.open_id}'`;
  connection.query(searchSQL, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if (err) {
      console.log('[SELECt ERROR] - ', err.message);
      errno.errno = 101;
      errno.message = '查询收货地址失败';
    }
    res.send({errno, results});
  });
});

// 删除收货地址
router.delete('/delete', function(req, res, next) {
  let params = req.body;
  let delSQL = `DELETE FROM receive_address WHERE receive_id = ${params.receive_id}`;
  connection.query(delSQL, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if(err) {
      console.log('[UPDATE ERROR] - ', err.message);
      // 删除项目失败，返回errno: '102'
      errno.errno = '102';
      errno.message = '删除收货地址失败';
    }
    res.send({errno, results});
  });
});

// 修改收货地址
router.post('/modify', function(req, res, next) {
  let params = req.body;
  let updateSQL = `UPDATE receive_address SET is_default = ?, open_id = ?, link_name = ?, link_phone = ?, link_area = ?, link_addr = ? WHERE receive_id = ?`;
  let updateParams = [params.is_default, params.open_id, params.link_name, params.link_phone, params.link_area, params.link_addr, params.receive_id];
  connection.query(updateSQL, updateParams, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      // 修改项目失败，返回errno: '103'
      errno.errno = '103';
      errno.message = '修改收货地址失败';
    }
    res.send({errno, results});
  });
});

module.exports = router;
