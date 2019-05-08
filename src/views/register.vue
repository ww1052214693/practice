<template>
    <div class="reg">
      <form action="/reg" method="post" class="form">
        <div class="form-group">
          <div class="form-group">
            用户名: <input type="text" placeholder="请输入用户名" name="username">
          </div>
          <div class="form-group">
            密码:&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" placeholder="请输入密码" name="password">
          </div>
          <div class="form-group">
            电话: &nbsp;&nbsp;<input type="text" placeholder="请输入电话号码" name="userphone">
          </div>
          <div class="form-group">
            地址: &nbsp;&nbsp;<input type="text" placeholder="请输入地址" name="useraddress">
          </div>
          <button type="submit" class="ok">确定</button>
        </div>
      </form>

    </div>

</template>

<script>
    export default {
        name: "register"
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .form
    width: 100%
    height:300px
    text-align:center
    margin-top:50px
    .form-group
      margin-top:20px
      input
        border:1px solid #000
</style>
