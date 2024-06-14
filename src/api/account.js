import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'get'
  })
}

// 获取用户权限
export function getPermissions() {
  return request({
    url: '/api/user/user_permission_list',
    method: 'get'
  })
}


