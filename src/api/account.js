import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/live/api/auth/login',
    method: 'post',
    data
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/live/api/user/logout',
    method: 'get'
  })
}

// 获取用户权限
export function getPermissions() {
  return request({
    url: '/live/api/user/user_permission_list',
    method: 'get'
  })
}


