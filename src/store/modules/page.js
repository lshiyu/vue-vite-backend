import { defineStore } from 'pinia'
import { dayjs } from 'element-plus'
import { isEqual } from 'lodash'
import { useStorage } from '@vueuse/core'
import router from '@/router'
import StorageEnums from '@/enums/StorageEnums'
import Setting from '@/setting'

export const usePageStore = defineStore('page', () => {
  const opened = useStorage(StorageEnums.OPENED, Setting.page.opened)
  const current = ref(Setting.page.current)
  const keepAlive = ref([])
  const pool = ref([])

  /* mutitions */
  const init = routes => {
    const res = []
    const push = function (routes) {
      routes.forEach(route => {
        if (route.children && route.children.length) {
          push(route.children)
        } else {
          const { name, path, meta } = route
          res.push({ name, path, meta })
        }
      })
    }
    push(routes)
    pool.value = res
  }
  const keepAliveRefresh = () => {
    keepAlive.value = opened.value.filter(x => x.keepAlive).map(x => x.id)
  }
  const keepAlivePush = id => {
    const keep = [...keepAlive.value]
    keep.push(id)
    keepAlive.value = keep
  }
  const keepAliveRemove = id => {
    const keep = [...keepAlive.value]
    const index = keep.findIndex(x => x === id)
    if (index !== -1) {
      keep.splice(index, 1)
      keepAlive.value = keep
    }
  }
  const setCurrent = value => {
    current.value = value
  }

  /* actions */
  const update = ({ index, params, query, path, id, keepAlive }) => {
    const page = opened.value[index]
    page.params = params
    page.query = query
    page.path = path
    page.id = id
    page.keepAlive = keepAlive
    opened.value.splice(index, 1, page)
  }

  const add = options => {
    const { id, name, title, params, query, path, keepAlive, beforeClose, beforeCloseMessage } = options
    const newPage = {
      name,
      title,
      params,
      query,
      path,
      id,
      keepAlive,
      beforeClose,
      beforeCloseMessage
    }
    opened.value.push(newPage)
    if (keepAlive) keepAlivePush(id)
  }

  const open = to => {
    let openedPageIndex = 0
    const openedPage = opened.value.find((page, index) => {
      let same = false
      if (to.meta.multiple) {
        same = page.name === to.name && isEqual(page.params, to.params) && isEqual(page.query, to.query)
      } else {
        same = page.name === to.name
      }
      openedPageIndex = same ? index : openedPageIndex
      return same
    })
    if (openedPage) {
      update({
        index: openedPageIndex,
        params: to.params,
        query: to.query,
        path: to.path,
        keepAlive: to.meta.keepAlive,
        id: openedPage.id
      })
      to.meta.id = openedPage.id
      setCurrent(openedPage.id)
    } else {
      const kpa = to.name + '_$kpa_' + dayjs().valueOf()
      to.meta.id = to.meta.multiple ? kpa : to.name
      const page = pool.value.find(x => x.name === to.name)
      if (page) {
        add({
          name: to.name,
          title: page.meta.title,
          params: to.params,
          query: to.query,
          path: to.path,
          keepAlive: to.meta.keepAlive,
          id: to.meta.id,
          beforeClose: !!to.meta.beforeClose,
          beforeCloseMessage: to.meta.beforeCloseMessage
        })
      }
      setCurrent(to.meta.id)
    }
  }

  const close = ({ id, redirect }) => {
    let newPage = opened.value[0]
    const isCurrent = current.value === id
    if (isCurrent) {
      const len = opened.value.length
      for (let i = 0; i < len; i++) {
        if (opened.value[i].id === id) {
          if (len > 1) {
            if (i === len - 1) {
              newPage = opened.value[i - 1]
            } else {
              newPage = opened.value[i + 1]
            }
          } else {
            newPage = {}
          }
          break
        }
      }
    }
    const index = opened.value.findIndex(p => p.id === id)
    if (index >= 0) {
      keepAliveRemove(id)
      opened.value.splice(index, 1)
    }
    if (isCurrent) {
      if (redirect) {
        const { name = 'Home', params = {}, query = {} } = redirect
        router.push({ name, params, query })
      } else {
        const { name = 'Home', params = {}, query = {} } = newPage
        router.push({ name, params, query })
      }
    }
  }

  const closeLeft = () => {
    const index = opened.value.findIndex(item => item.id === current.value)
    opened.value.splice(1, index - 1).forEach(id => keepAliveRemove(id))
  }

  const closeRight = () => {
    const index = opened.value.findIndex(item => item.id === current.value)
    opened.value.splice(index + 1).forEach(id => keepAliveRemove(id))
  }

  const closeOther = () => {
    const index = opened.value.findIndex(item => item.id === current.value)
    if (index === 0) {
      opened.value.splice(1).forEach(id => keepAliveRemove(id))
    } else {
      opened.value.splice(index + 1).forEach(id => keepAliveRemove(id))
      opened.value.splice(1, index - 1).forEach(id => keepAliveRemove(id))
    }
  }

  const closeAll = (redirect = true) => {
    opened.value.splice(1).forEach(id => keepAliveRemove(id))
    if (!redirect) return
    if (current.value !== 'Home') {
      router.push({
        name: 'Home'
      })
    }
  }

  return {
    opened,
    current,
    keepAlive,
    pool,
    init,
    keepAliveRefresh,
    add,
    open,
    close,
    closeLeft,
    closeRight,
    closeOther,
    closeAll
  }
})

export default usePageStore
