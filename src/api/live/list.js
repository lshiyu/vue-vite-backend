import request from '@/utils/request'

// 获取直播间列表
export function liveList(params) {
  return request({
    url: '/live/api/broadcast/page',
    method: 'get',
    params
  })
}

// 新增直播间
export function liveCreate(data) {
  return request({
    url: '/live/api/broadcast/create',
    method: 'post',
    data
  })
}

// 修改直播间
export function liveUpdate(data) {
  return request({
    url: '/live/api/broadcast/update',
    method: 'post',
    data
  })
}

// 删除直播间
export function liveDelete(params) {
  return request({
    url: '/live/api/broadcast/delete',
    method: 'get',
    params
  })
}

// 直播间详情
export function liveDetail(params) {
  return request({
    url: '/live/api/broadcast/show',
    method: 'get',
    params
  })
}

// 直播列表枚举值
export function liveEnum() {
  return request({
    url: '/live/api/broadcast/enum',
    method: 'get'
  })
}

// 直播间开启关闭回放

export function liveReplay(data) {
  return request({
    url: '/live/api/broadcast/updateStatus',
    method: 'post',
    data
  })
}

// 暂停直播
export function liveStop(data) {
  return request({
    url: '/live/api/broadcast/stop',
    method: 'post',
    data
  })
}

// 恢复直播
export function liveRecover(data) {
  return request({
    url: '/live/api/broadcast/recover',
    method: 'post',
    data
  })
}

// 结束直播
export function liveEnd(data) {
  return request({
    url: '/live/api/broadcast/end',
    method: 'post',
    data
  })
}

// 直播分享
export function liveShare(params) {
  return request({
    url: '/live/api/broadcast/share',
    method: 'get',
    params
  })
}

// 创建渠道二维码
export function createChannel(data) {
  return request({
    url: '/live/api/broadcast/createLiveChannel',
    method: 'post',
    data
  })
}
