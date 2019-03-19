<template>
  <div class="login">
    <div class="form-box"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0)">
      <div class="title">
        <h1>信访管理系统</h1>
      </div>
      <form class="login-form"
            autocomplete="off"
            @submit.prevent="throttleLogin()">
        <div class="form-item nickname">
          <span class="icon account-icon"></span>
          <input type="text"
                 v-model="form.nickname"
                 autocomplete="off"
                 placeholder="填写用户名"/>
        </div>
        <div class="form-item password">
          <span class="icon secret-icon"></span>
          <input type="password"
                 v-model="form.password"
                 autocomplete="off"
                 placeholder="填写密码"/>
        </div>
        <button class="submit-btn"
                type="submit">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        loading: false,
        form: {
          nickname: '',
          password: ''
        }
      }
    },
    methods: {
      throttleLogin () {}
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  .login{
    width: 100%;
    height: 100%;
    background-size: auto;
    background: #1b2c5f url(~assets/img/login/login-ba.png) no-repeat center;
    .form-box{
      position: fixed;
      width: 445px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .title{
        height: 37px;
        line-height: 37px;
        font-size: 30px;
        margin-bottom: 15%;
        h1 {
          padding-left: 74px;
          box-sizing: border-box;
          text-align: left;
          color: #8c98ae;
          font-family: "HYYiSongW";
        }
      }
      .login-form {
        width: 100%;
        .form-item {
          width: 100%;
          height: 40px;
          box-sizing: border-box;
          padding-bottom: 13px;
          margin-bottom: 34px;
          input {
            width: 100%;
            height: 100%;
            background:transparent;
            color: #c4c9d2;
            font-size: 14px;
            padding-left: 74px;
            box-sizing: border-box;
            font-family: "HYYiSongW";
          }
        }
        .form-item.nickname {
          background: url(~assets/img/login/nickname.png) no-repeat;
          background-size: 100% auto;
          background-position: left bottom;
        }
        .form-item.password {
          background: url(~assets/img/login/password.png) no-repeat;
          background-size: 100% auto;
          background-position: left bottom;
        }
        .submit-btn {
          width: 100%;
          height: 70px;
          color: #c4c9d2;
          font-family: "HYYiSongW";
          font-size: 16px;
          text-align: left;
          box-sizing: border-box;
          padding: 0 10px;
          padding-left: 74px;
          background: url(~assets/img/login/login-btn.png) no-repeat;
          background-size: 90% auto;
          background-position: center bottom;
          border: none;
          cursor: pointer;
        }
      }
    }
  }
</style>
