import request from '@/utils/request'

// 获取违禁词列表
export function getList(data) {
  return request({
    url: '/live/api/violation/home',
    method: 'post',
    data
  })
}

// 获取违禁词详情
export function getDetail(data) {
  return request({
    url: '/live/api/violation/show',
    method: 'post',
    data
  })
}

// 新增违禁词
export function create(data) {
  return request({
    url: '/live/api/violation/insert',
    method: 'post',
    data
  })
}

// 修改违禁词
export function update(data) {
  return request({
    url: '/live/api/violation/update',
    method: 'post',
    data
  })
}
