const state = {
  logined: false, // 是否登录
  user: null, // 当前用户
  tabs: [], // 浏览历史
  menuTabs: [], // 右侧tab栏
  auths: [], // 每个用户的所有权限
  stopTime: 0, // 停止操作时间
  sideBarList: [], // 侧边栏列表
  defaultActive: '' // 当前激活菜单
}

export default state
