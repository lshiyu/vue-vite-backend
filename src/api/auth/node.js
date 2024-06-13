import request from '@/utils/request'

// 获取节点列表
export function getNodeList(params) {
  return request({
    url: '/live/api/permission/list',
    method: 'get',
    params
  })
}

// 新增节点
export function addNode(data) {
  return request({
    url: '/live/api/permission/create',
    method: 'post',
    data
  })
}

// 修改节点
export function updateNode(data) {
  return request({
    url: '/live/api/permission/update',
    method: 'post',
    data
  })
}

// 删除节点
export function deleteNode(data) {
  return request({
    url: '/live/api/permission/destroy',
    method: 'post',
    data
  })
}

// 节点详情
export function getNodeDetail(params) {
  return request({
    url: '/live/api/permission/show',
    method: 'get',
    params
  })
}
