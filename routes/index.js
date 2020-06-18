var express = require('express');
var router = express.Router();
const URL = require('url');
const request = require('request')
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'wechatspa',
  multipleStatements: true
});
function myTimeToLocal(inputTime){
	var localTime = '';
	inputTime = new Date(inputTime).getTime();
	const offset = (new Date()).getTimezoneOffset();
	localTime = (new Date(inputTime - offset * 60000)).toISOString();
	localTime = localTime.substr(0, localTime.lastIndexOf('.'));
	localTime = localTime.replace('T', ' ');
	return localTime;
}
connection.connect();
/* GET home page. */
// router.get('/regist', function (req, res) {
  // let params = URL.parse(req.url, true).query;
  // request({
  //   url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx8a7363722709c498&secret=6f5e868caae6945f25a4f4fa2fe55f27&js_code=${params.js_code}&grant_type=authorization_code`,
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'text/json'
  //   }
  // }, function (error, response, body) {
  //   if (!error&&response.statusCode == 200) {
  //     params.openid = body.openid;
  //     let addSQL = `INSERT INTO userinfo (username, createDate, openid) VALUES (?, ?, ?)`;
  //     params.createDate = myTimeToLocal(params.createDate);
  //     let addparams = [params.username, params.createDate, params.openid];
  //     console.log(params)
  //     connection.query(addSQL, addparams, function (err, result) {
  //       if (err) {
  //         console.log('[INSERT ERROR] - ', err.message);
  //       } else {
  //         console.log('添加成功');
  //       }
  //     })
  //   }
  //   res.send(body);
  // })
// })

module.exports = router;
