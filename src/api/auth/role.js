import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/live/api/role/page',
    method: 'get',
    params
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/live/api/role/create',
    method: 'post',
    data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/live/api/role/update',
    method: 'post',
    data
  })
}

// 角色详情
export function getRoleDetail(params) {
  return request({
    url: '/live/api/role/show',
    method: 'get',
    params
  })
}

// 启用/停用
export function toggleRoleStatus(data) {
  return request({
    url: '/live/api/role/status',
    method: 'post',
    data
  })
}

// 角色分配权限
export function roleAttachPermission(data) {
  return request({
    url: '/live/api/role/attach_permission',
    method: 'post',
    data
  })
}

// 角色权限详情
export function getRolePermissionDetail(data) {
  return request({
    url: '/live/api/role/role_permission',
    method: 'post',
    data
  })
}

// 角色下拉列表
export function getRoleDropdownList(params) {
  return request({
    url: '/live/api/role/list',
    method: 'get',
    params
  })
}




