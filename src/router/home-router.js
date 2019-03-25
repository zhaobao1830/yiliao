const About = () => import('@/views/about/About')
const Log = () => import('@/views/log/Log')

const homeRouter = [
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: '林间有风',
      icon: 'iconfont icon-iconset0103'
    }
  },
  {
    path: '/log',
    name: 'log',
    component: Log,
    meta: {
      title: '日志管理',
      icon: 'iconfont icon-rizhiguanli',
      auths: ['查询所有日志']
    }
  }
]

export default homeRouter
