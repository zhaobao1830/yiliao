import stageConfig from '@/config/stage' // 引入舞台配置

const state = {
  logined: false, // 是否登录
  user: null, // 当前用户
  tabs: [], // 浏览历史
  menuTabs: [], // 右侧tab栏
  auths: [], // 每个用户的所有权限
  defaultActive: '', // 当前激活菜单
  // 舞台配置
  stageConfig
}

export default state
