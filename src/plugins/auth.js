import useMenuStore from '@/store/modules/menu'
/**
 * @description 鉴权方法
 * 当传入的权限当前用户没有时，返回 false
 * 用例：hasAuth('userList:create')
 * */

export default function (name) {
  const { permissions } = useMenuStore()
  return permissions.includes(name)
}
