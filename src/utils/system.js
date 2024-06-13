// 检查路由重复
export const checkRouter = (arr, notip, duptip) => {
  let routerchecks = {}
  arr.forEach(item => {
    if (!item.name) {
      console.warn(notip + '：', item)
      throw new Error(notip)
    }
    if (routerchecks[item.name]) {
      console.warn(duptip, [item, routerchecks[item.name]])
      throw new Error(duptip)
    }
    routerchecks[item.name] = item
    if (item.children && item.children.length > 0) {
      checkRouter(item.children, '路由name未定义，系统启动失败', '路由name重名，系统启动失败，上面2项name冲突:')
    }
  })
}

// 是否有子路由
export const hasChild = item => {
  return item.children && item.children.length !== 0
}

// 获取侧边菜单
export const getMenuByRouter = routes => {
  let res = []
  routes.forEach(item => {
    if (!item.meta || (item.meta && !item.meta.hidden)) {
      let route = {
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item)) {
        const child = item.children.filter(x => !x.meta.hidden)
        if (item.meta && item.meta.alwaysShow) {
          route.name = child[0].name
          route.meta = child[0].meta
        } else {
          route.children = getMenuByRouter(item.children)
        }
      }
      res.push(route)
    }
  })
  return res
}
