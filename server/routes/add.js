var express = require('express')

var router = express.Router()

var mongoose = require('mongoose')

var User = require('../Models/user')


mongoose.connect('mongodb://localhost:27017/person')


router.post('/',function (req,res) {
  var admin = new User(req.body);
  admin.save(function (erro,result) {
    if (erro) {

      return console.log('保存失败');
      //
    } else {
      // alert('注册成功!')
      //res.send(result)
      res.redirect('/login')
    }
  })
})


//千万要在这儿将router导出
module.exports = router
