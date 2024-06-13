import Layout from '@/layout'

export const homeRouter = [
  {
    path: '/',
    name: 'Index',
    meta: {
      alwaysShow: true
    },
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '主页',
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: '/list',
    name: 'List',
    meta: {
      title: '列表',
    },
    component: Layout,
    children: [
      {
        path: '/list',
        name: 'List',
        meta: {
          title: '列表',
        },
        component: () => import('@/views/list/index.vue')
      }
    ]
  }
]

export const routes = [
  ...homeRouter,
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true
    },
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/403',
    component: () => import('@/views/error/403.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue')
  }
]

export default routes
