const About = () => import('@/views/About')
const Home = () => import('@/views/Home')

const routes = [
  {
    path: '/',
    name: 'homw',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

export default routes
