<template>
  <div class="login">
    <form action="http://localhost:8080/check" method="post" class="form">
      <span class="msg" v-show="showSpan">密码输入错误</span>
      <div class="form-group">
        <div class="form-group">
          用户名: <input type="text" placeholder="请输入用户名" v-model="username" name="username">
        </div>
        <div class="form-group">密码:&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" placeholder="请输入密码" v-model="password"
                                                                  name="password">
        </div>
        <button type="submit" class="login">登录</button>
        <button type="button" class="zhu_ce">
          <router-link to="/register">注册</router-link>
        </button>
      </div>
    </form>
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    data() {
      return {
        userMessage: {},
        username: '',
        password: '',
        showSpan: false
      }
    },
    mounted() {
      axios.post('/check', {
        username: this.username,
        password: this.password
      }).then((response) => {
        var res = response.data;
        if (res.status === '0') {
          this.showSpan=false
        } else {
          this.showSpan=true
        }
      })
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .form
    width: 100%
    height: 300px
    text-align: center
    margin-top: 50px
    .form-group
      margin-top: 20px
      input
        border: 1px solid #000
    button
      margin-top: 10px
    .zhu_ce
      a
        color: #000
</style>
