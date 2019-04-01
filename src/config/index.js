const config = {
  baseUrl: 'http://cms.lin.7yue.pro/',
  // baseUrl: 'http://118.190.154.85:10000',
  stagnateTime: 1 * 60 * 60 * 1000, // 无操作停滞时间  默认1小时
  openAutoJumpOut: false, // 是否开启无操作跳出
  notLoginRoute: ['login'], // 无需登录即可访问的路由 name
  api: {
    codeUrl: '' // 请求验证码的地址
  }
}

export default config
