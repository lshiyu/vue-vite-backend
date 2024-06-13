import useMenuStore from '@/store/modules/menu'

/**
 * @description 鉴权指令
 * 当传入的权限当前用户没有时，会移除该组件
 * 用例：<Tag v-auth="['Node:add']">text</Tag>
 * */

export default {
  mounted(el, binding) {
    const { permissions } = useMenuStore()
    const { value } = binding
    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = permissions.some(permi => value.includes(permi))

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
        return false
      }
    }
  }
}
