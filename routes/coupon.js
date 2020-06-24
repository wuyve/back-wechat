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
    let arr = [];
    let addSQL = "INSERT INTO coupon (`open_id`, `status`, `use_type`, `range_begin`, `range_end`, `rule`, `discount_type`, `discount_depth`, `acti_id`, `acti_desc`, `discount_desc`) VALUES ?";
    for (let i = 0, len = params.num; i < len; i++) {
      
      let addparam = [params.open_id, params.status, params.use_type, params.range_begin, params.range_end, params.rule, params.discount_type, params.discount_depth, params.acti_id || null, params.acti_desc || null, params.discount_desc || null];
      arr.push(addparam);
    }
    console.log(arr);
    connection.query(addSQL, [arr], function(err, results) {
      errno.errno = 200;
      errno.message = '成功';  
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        errno.errno = 109;
        errno.message = '添加优惠券失败';
      }
      res.send({errno, results});
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

// 商家删除优惠券
router.delete('/shopper/delete', function(req, res, next) {
  let params = req.body;
  let delSQL = `DELETE FROM coupon WHERE acti_id = ${params.acti_id}`;
  connection.query(delSQL, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if(err) {
      console.log('[UPDATE ERROR] - ', err.message);
      // 删除项目失败，返回errno: '102'
      errno.errno = 110;
      errno.message = '删除优惠券失败';
    }
    res.send({errno, results});
  });
});

// 商家修改优惠券
// 根据优惠id修改优惠券
router.post('/shopper/modify', function(req, res, next) {
  let params = req.body;
  let updateSQL = `UPDATE coupon SET use_type = ?, status = ?, range_begin = ?, range_end = ?, rule = ?, discount_type = ?, discount_depth = ?, acti_desc = ?, discount_desc = ? WHERE acti_id = ?`;
  let updateParams = [params.use_type, params.status, params.range_begin, params.range_end, params.rule, params.discount_type, params.discount_depth, params.acti_desc, params.discount_desc, params.acti_id];
  connection.query(updateSQL, updateParams, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      // 修改项目失败，返回errno: '103'
      errno.errno = 111;
      errno.message = '商家修改优惠券失败';
    }
    res.send({errno, results});
  });
});

// 消费者领取优惠券
// 修改open_id的*为用户名
router.post('/consumer/receive', function(req, res, next) {
  let params = req.body;
  let updateSQL = `UPDATE coupon SET open_id = ? WHERE discount_id = ?`;
  let updateParams = [params.open_id, params.discount_id];
  connection.query(updateSQL, updateParams, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      // 修改项目失败，返回errno: '103'
      errno.errno = 111;
      errno.message = '修改消费券的open_id失败';
    }
    res.send({errno, results});
  });
});

// 修改优惠券状态
router.post('/consumer/status', function(req, res, next) {
  let params = req.body;
  let updateSQL = `UPDATE coupon SET status = ? WHERE discount_id = ?`;
  let updateParams = [params.status, params.discount_id];
  connection.query(updateSQL, updateParams, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      // 修改项目失败，返回errno: '103'
      errno.errno = 112;
      errno.message = '修改消费券状态失败';
    }
    res.send({errno, results});
  });
});

// 商城展示优惠券
router.get('/consumer/status', function(req, res, next) {
  let params = URL.parse(req.url, true).query;
  let searchSQL = `SELECT * FROM coupon WHERE open_id = '${params.open_id}' AND use_type = ${params.use_type} AND status = ${params.status} AND acti_id = ${params.status}`;
  connection.query(updateSQL, function(err, results) {
    errno.errno = 200;
    errno.message = '成功';
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      // 修改项目失败，返回errno: '103'
      errno.errno = 113;
      errno.message = '展示优惠券失败';
    }
    res.send({errno, results});
  });
});


module.exports = router;
