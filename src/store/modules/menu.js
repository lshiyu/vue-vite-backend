import { defineStore } from 'pinia'
import { to } from 'await-to-js'

import Layout from '@/layout'
import { homeRouter } from '@/router/routes'
import { getMenuByRouter } from '@/utils/system'
import { getPermissions } from '@/api/account'

import usePageStore from './page'
const modules = import.meta.glob('../../views/**/**.vue')

export const useMenuStore = defineStore('menu', () => {
  const routes = ref([])
  const menus = ref([])
  const permissions = ref([])

  const filterAsyncRoutes = routes => {
    const asyncRoutes = []
    routes.forEach(item => {
      if (item.is_menu === 1) {
        const route = {
          path: item.path,
          name: item.perm_identifier,
          meta: {
            title: item.name,
            icon: item.icon,
            hidden: item.is_hidden === 1,
            multiple: item.multipage === 1,
            keepAlive: item.keep_alive === 1,
            alwaysShow: item.always_show === 1,
            beforeClose: item.before_close === 1,
            activeMenu: item.active_menu
          },
          component: item.file_url === 'Layout' ? Layout : loadView(item.file_url)
        }
        // 重定向处理
        if (item.path === '') {
          route.redirect = '/'
        }
        // 子路由处理
        if (item.children) {
          route.children = filterAsyncRoutes(item.children)
        }
        asyncRoutes.push(route)
      }
    })
    return asyncRoutes
  }

  const filterPermissions = routes => {
    let res = []
    routes.forEach(menu => {
      if (menu.is_menu === 2 && !menu.children) {
        res.push(menu.perm_identifier)
      }
      if (menu.children) {
        res = res.concat(filterPermissions(menu.children))
      }
    })
    return res
  }

  const generateMenus = () => {
    menus.value = getMenuByRouter([...homeRouter, ...routes.value])
    usePageStore().init([...homeRouter, ...routes.value])
    usePageStore().keepAliveRefresh()
  }

  const generatePermissions = routes => {
    permissions.value = filterPermissions(routes)
  }

  const generateRoutes = async () => {
    // const [err, res] = await to(getPermissions())
    // if (!err) {
    //   const asyncRoutes = filterAsyncRoutes(res.data)
    //   routes.value = asyncRoutes

    //   generateMenus()
    //   generatePermissions(res.data)

    //   return asyncRoutes
    // } else {
    //   return Promise.reject(err)
    // }

    const asyncRoutes = filterAsyncRoutes([])
    routes.value = asyncRoutes
    generateMenus()
    generatePermissions([])
    return asyncRoutes
  }

  const reset = () => {
    routes.value = []
    menus.value = []
  }

  return {
    routes,
    menus,
    permissions,
    generateMenus,
    generateRoutes,
    reset
  }
})

function loadView(view) {
  let res
  for (const path in modules) {
    const dir = path.split('views')[1].split('.vue')[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

export default useMenuStore
