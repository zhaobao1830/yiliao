<template>
  <div class="login">
    <div class="login-top">
      <p>退役军人事务部网上信访管理系统</p>
    </div>
    <div class="login-from">
      <div class="form-title">工作人员登陆</div>
      <div class="form-group">
        <el-form :label-position="labelPosition" :label-width="labelWidth" :model="formLogin">
          <el-form-item label="账号">
            <el-input v-model="formLogin.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLogin.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="formLogin.code">
              <template slot="append">
                <img class="login-code" :src="code.src" @click="refreshCode">
              </template>
            </el-input>
          </el-form-item>
          <el-button @click="submit" type="primary" class="button-login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        labelPosition: 'right',
        labelWidth: '65px',
        formLogin: {
          username: 'admin',
          password: '123456',
          randomStr: '',
          code: ''
        },
        code: {
          len: 4,
          src: ''
        }
      }
    },
    methods: {
      refreshCode () {}
    }
  }
</script>

<style scoped lang="scss" type="text/scss">
  .login{
    width: 100%;
    height: 100%;
    .login-top{
      width: 100%;
      height: 90px;
      line-height: 90px;
      background-color: #1b2c5f;
      p{
        font-size: 30px;
        float: left;
        color: #fff;
      }
    }
    .login-from{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #eee;
      .form-title{
        height: 60px;
        line-height: 60px;
        font-size: 25px;
        background-color: #245097;
        color: #fff;
      }
      .form-group{
        padding: 0 20px;
        margin-top: 30px;
      }
    }
  }
</style>
