var express = require('express');
var router = express.Router();
const URL = require('url');
const mysql = require('mysql');
const { param } = require('.');
const e = require('express');
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
// 添加商家信息
router.post('/add', function(req, res, next) {
    let params = req.body;
    let addSQL = `INSERT INTO shopper_info (shopper_name, shopper_phone, shopper_wechat, open_id, shopper_sex, shopper_img, shopper_occuption, shopper_remarks, score) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let addParam = [params.shopper_name, params.shopper_phone, params.shopper_wechat, params.open_id, params.shopper_sex, params.shopper_img, params.shopper_occuption, params.shopper_remarks, params.score];
    connection.query(addSQL, addParam, function(err, results) {
        errno.errno = 200;
        errno.message = '成功';
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            errno.errno = 112;
            errno.message = '添加商家信息失败';
        }
        res.send({errno, results});
    });
});
// 获取商家信息
router.get('/get', function(req, res, next) {
    let params = URL.parse(req.url, true).query;
    let searchSQL;
    let searchParam = params.shopper_name;
    if (searchParam == '') {
        searchSQL = 'SELECT * FROM shopper_info';
    } else if (searchParam !== '' && searchParam !== undefined) {
        searchParam = '%' + params.shopper_name + '%';
        searchSQL = `SELECT * FROM shopper_info WHERE shopper_name LIKE '${searchParam}'`;
    }
    let id = params.id;
    if (id !== undefined) {
        searchParam = id;
        searchSQL = `SELECT * FROM shopper_info WHERE id = '${searchParam}'`;
    }
    connection.query(searchSQL, function (err, results) {
        errno.errno = 200;
        errno.message = '成功';
        if (err) {
            console.log('[SELECt ERROR] - ', err.message);
            errno.errno = 113;
            errno.message = '查询商家信息失败';
        }
        console.log(results);
        res.send({errno, results});
    });
});

// 获取|修改商家详情
router.get('/getinfo', function(req, res, next) {
    let params = URL.parse(req.url, true).query;
    let searchSQL = 'SELECT * FROM shopper_info WHERE id = ?';
    let searchParam = [params.id];

})
module.exports = router;
