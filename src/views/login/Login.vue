<template>
  <div class="login">
    <div class="login-top">
      <p>退役军人事务部网上信访管理系统</p>
    </div>
    <div class="login-from"
         v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0)">
      <div class="form-title">工作人员登陆</div>
      <div class="form-group">
        <el-form :label-position="labelPosition" :rules="rules" :label-width="labelWidth" :model="formLogin">
          <el-form-item label="账号" prop="nickname">
            <el-input v-model="formLogin.nickname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formLogin.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="formLogin.code">
              <template slot="append">
                <img class="login-code" :src="code.src" @click="refreshCode">
              </template>
            </el-input>
          </el-form-item>
          <el-button @click="throttleLogin" type="primary" class="button-login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import Util from 'lin/utils/util'
  import Config from '@/config'
  import User from 'lin/models/user'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    name: 'Login',
    data () {
      return {
        throttleLogin: null, // 节流登录
        loading: false,
        labelPosition: 'right',
        labelWidth: '65px',
        formLogin: {
          nickname: 'super',
          password: '123456',
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
    created () {
      this.throttleLogin = Util.throttle(this.login, this.await)
    },
    mounted () {
      this.refreshCode()
    },
    methods: {
      async login () {
        const { nickname, password } = this.formLogin
        try {
          this.loading = true
          await User.getToken(nickname, password)
          await this.getInformation()
          this.loading = false
          this.$router.push('/about')
          this.$message.success('登录成功')
        } catch (e) {
          this.loading = false
        }
      },
      refreshCode () {
        this.formLogin.randomStr = Util.randomLenNum(this.code.len)
        this.code.src = `${Config.baseUrl}/admin/code/${this.formLogin.randomStr}`
      },
      async getInformation () {
        try {
          // 尝试获取用户信息
          const user = await User.getAuths()
          this.setUserAndState(user)
          this.setUserAuths(user.auths)
        } catch (e) {
          console.log(e)
        }
      },
      ...mapMutations({
          setUserAuths: 'SET_USER_AUTHS'
      }),
      ...mapActions([
        'setUserAndState'
      ])
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
      background-color: #3963bc;
      p{
        font-size: 30px;
        float: left;
        color: #fff;
        margin-left: 50px;
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
        background-color: #3963bc;
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
