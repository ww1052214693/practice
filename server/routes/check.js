var express = require('express')
var mogoose = require('mongoose')
var router = express.Router()
var User = require('../Models/user')

mogoose.connect('mongodb://localhost/person')

router.post('/',function (req,res) {
  // console.log('post请求');
  // res.redirect('http://localhost:8080/#/goods')
  //console.log(req.body);
  //res.send('这是一个post请求')
  //获取数据库中的数据
  var paras = {
    username:req.body.username,
    password:req.body.password
  }
  console.log(paras);
  // User.find(paras,function (erro,data) {
  //   if (erro) {
  //     console.log('出错');
  //   }else {
  //     console.log(data.username);
  //   }
  //
  // })
  User.findOne(paras,function (erro,data) {
  //   if (erro) {
  //     // res.json({
  //     //   status:'1',
  //     //   message:erro.message
  //     // })
  //     console.log('错误');
  //   } else {
  //     if (data) {
  //         // res.json({
  //         //   status: '0',
  //         //   message: '',
  //         //  result:{
  //         //    username:data.username
  //         // }
  //           //})
  //
  //       res.redirect('http://localhost:8080/#/goods')
  //     }
  //
  //   }
    if (data) {
           res.redirect('http://localhost:8080/#/goods')

    } else {
      res.json({
        status:'1',
        msg:'登录失败'
      })
    }
   })

 })

module.exports = router
