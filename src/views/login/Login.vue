<template>
  <div class="login">
    <div class="login-top">
      <p>退役军人事务部网上信访管理系统</p>
    </div>
    <div class="login-from"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0)">>
      <div class="form-title">工作人员登陆</div>
      <div class="form-group">
        <el-form :label-position="labelPosition" :rules="rules" :label-width="labelWidth" :model="formLogin">
          <el-form-item label="账号" prop="nickname">
            <el-input v-model="formLogin.nickname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLogin.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="formLogin.code">
              <template slot="append">
                <img class="login-code" :src="code.src" @click="refreshCode">
              </template>
            </el-input>
          </el-form-item>
          <el-button @click="fromSubmit" type="primary" class="button-login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import request from 'common/utils/http'
  import util from 'common/utils/util'
  import config from 'common/config'

  export default {
    name: 'Login',
    data () {
      return {
        loading: false,
        labelPosition: 'right',
        labelWidth: '65px',
        formLogin: {
          nickname: '',
          password: '',
          randomStr: '',
          code: ''
        },
        code: {
          len: 4,
          src: ''
        },
        rules: {
          nickname: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
          // code: [
          //   { required: true, message: '请输入验证码', trigger: 'blur' }
          // ]
        }
      }
    },
    mounted () {
      this.refreshCode()
    },
    methods: {
      async fromSubmit () {
        const { nickname, password } = this.formLogin
      },
      refreshCode () {
        this.formLogin.randomStr = util.randomLenNum(this.code.len)
        this.code.src = `${config.baseUrl}/admin/code/${this.formLogin.randomStr}`
      }
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
        .login-code {
          width: 90px;
          height: 40px - 2px;
          display: block;
          margin: 0px -20px;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }
      }
    }
  }
</style>
