import homeRouter from './home-router'

const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/home/Home')

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/about',
    component: Home,
    children: [
      ...homeRouter
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

export default routes
