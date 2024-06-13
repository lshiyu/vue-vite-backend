import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import useMenuStore from '@/store/modules/menu'
import useUserStore from './store/modules/user'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  try {
    await useMenuStore().generateRoutes()
    next()
  } catch (error) {
    console.log(error)
    useUserStore().logout()
    return false
  }
  // if (useUserStore().getToken()) {
  //   if (to.path === '/login') return '/'
  //   if (useMenuStore().routes.length) return true
  //   // 根据用户权限生成路由
  //   try {
  //     const routes = await useMenuStore().generateRoutes()
  //     routes.forEach(route => router.addRoute(route))
  //     return to.fullPath
  //   } catch (error) {
  //     console.log(error)
  //     useUserStore().logout()
  //     return false
  //   }
  // } else {
  //   if (whiteList.includes(to.path)) return true
  //   return '/login?redirect=' + to.fullPath
  // }
})

router.afterEach(NProgress.done)
