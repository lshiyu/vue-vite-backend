import request from '@/utils/request'

// 全时段数据
export function getAllTimeCount(params) {
  return request({
    url: '/live/api/detail/all_time_count',
    method: 'get',
    params
  })
}

// 开播后数据
export function getAfterLiveCount(params) {
  return request({
    url: '/live/api/detail/after_live_count',
    method: 'get',
    params
  })
}

// 在线人数趋势图
export function getOnlineUserCount(params) {
  return request({
    url: '/live/api/detail/online_user_count',
    method: 'get',
    params
  })
}

// 在线用户列表
export function getOnlineUser(params) {
  return request({
    url: '/live/api/detail/user_list',
    method: 'get',
    params
  })
}


