import request from '@/utils/request'

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/live/api/user/page',
    method: 'get',
    params
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/live/api/user/create',
    method: 'post',
    data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/live/api/user/update',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteUser(params) {
  return request({
    url: '/live/api/user/delete',
    method: 'get',
    params
  })
}

// 用户详情
export function getUserDetail(params) {
  return request({
    url: '/live/api/user/show',
    method: 'get',
    params
  })
}

// 获取工作人员列表
export function getStaffsList(params) {
  return request({
    url: '/live/api/user/staffs',
    method: 'get',
    params
  })
}

// 获取主播列表
export function getAnchorList(params) {
  return request({
    url: '/live/api/user/anchors',
    method: 'get',
    params
  })
}
