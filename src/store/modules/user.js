import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { to } from 'await-to-js'
import router from '@/router'
import usePageStore from './page'
import useMenuStore from './menu'
import { StorageEnums } from '@/enums'
import { login as loginApi, logout as logoutApi } from '@/api/account'

const useUserStore = defineStore('user', () => {
  const userInfo = useStorage(StorageEnums.USERINFO, {})
  const token = useStorage(StorageEnums.TOKEN, null)

  const isAnchor = computed(() => userInfo.value.is_anchor === 1)

  // mutations
  const getToken = () => token.value
  const setToken = value => (token.value = value)
  const setUserInfo = value => (userInfo.value = value)

  // actions
  const login = async params => {
    const [err, res] = await to(loginApi(params))
    if (!err) {
      setToken(res.data.token)
      setUserInfo(res.data)
    } else {
      return Promise.reject(err)
    }
  }
  const logout = () => {
    usePageStore().closeAll()
    useMenuStore().reset()
    setToken(null)
    setUserInfo({})
    router.replace('/login')
  }
  const userLogout = async () => {
    const [err] = await to(logoutApi())
    if (!err) logout()
  }

  return {
    userInfo,
    isAnchor,
    getToken,
    setToken,
    setUserInfo,
    login,
    logout,
    userLogout
  }
})

export default useUserStore
