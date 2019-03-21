const About = () => import('@/views/about/About')

const homeRouter = [
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: '林间有风',
      icon: 'iconfont icon-iconset0103'
    }
  }
]

export default homeRouter
