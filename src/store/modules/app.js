import { defineStore } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export const useAppStore = defineStore('app', () => {
  const locale = ref(zhCn)
  const menuCollapse = ref(false)

  const toggleMenuCollapse = () => {
    menuCollapse.value = !menuCollapse.value
  }

  return {
    locale,
    menuCollapse,
    toggleMenuCollapse
  }
})

export default useAppStore
