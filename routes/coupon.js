// 定义用户的优惠券
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

// 添加优惠券
router.post('/add', function(req, res, next) {
    let params = req.body; // post
    let addSQL = `INSERT INTO coupon (open_id, status, use_type, range_begin, range_end, rule, discount_type, discount_depth, acti_id, acti_desc, discount_desc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let addparam = [params.open_id, params.status, params.use_type, params.range_begin, params.range_end, params.rule, params.discount_type, params.discount_depth, params.acti_id || null, params.acti_desc || null, params.discount_desc || null];
    console.log(params);
    console.log(isArray(params.link_area))
    connection.query(addSQL, addparam, function(err, results) {
      errno.errno = 200;
      errno.message = '成功';  
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        errno.errno = 109;
        errno.message = '添加优惠券失败';
      }
      res.send(errno);
    });
});

// 获取优惠券
router.get('/get', function(req, res, next) {
  let params = URL.parse(req.url, true).query;
  console.log(params);
  let searchSQL = ''
  if (params.use_type) {
    searchSQL = `SELECT * FROM coupon WHERE open_id = '${params.open_id}' AND use_type = ${params.use_type} AND status = ${params.status}`;
  } else {
    searchSQL = `SELECT * FROM coupon WHERE open_id = '${params.open_id}' AND status = ${params.status}`;
  }
  connection.query(searchSQL, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if (err) {
      console.log('[SELECt ERROR] - ', err.message);
      errno.errno = 108;
      errno.message = '查询优惠券失败';
    }
    res.send({errno, results});
  });
});

// 删除优惠券
router.delete('/delete', function(req, res, next) {
  let params = req.body;
  let delSQL = `DELETE FROM coupon WHERE acti_id = ${params.acti_id}`;
  connection.query(delSQL, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if(err) {
      console.log('[UPDATE ERROR] - ', err.message);
      // 删除项目失败，返回errno: '102'
      errno.errno = '110';
      errno.message = '删除优惠券失败';
    }
    res.send({errno, results});
  });
});

// 修改优惠券
// router.post('/modify', function(req, res, next) {
//   let params = req.body;
//   let updateSQL = `UPDATE receive_address SET is_default = ?, open_id = ?, link_name = ?, link_phone = ?, link_area = ?, link_addr = ? WHERE receive_id = ?`;
//   let updateParams = [params.is_default, params.open_id, params.link_name, params.link_phone, params.link_area, params.link_addr, params.receive_id];
//   connection.query(updateSQL, updateParams, function(err, results) {
//     if (err) {
//       console.log('[UPDATE ERROR] - ', err.message);
//       // 修改项目失败，返回errno: '103'
//       errno.errno = '103';
//       errno.message = '修改收货地址失败';
//     }
//     res.send({errno, results});
//   });
// });

module.exports = router;
