import request from '@/utils/request'

// 直播间详情
export function liveDetail(params) {
  return request({
    url: '/live/api/broadcast/show',
    method: 'get',
    params
  })
}

// 开始直播
export function liveStart(data) {
  return request({
    url: '/live/api/broadcast/start',
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

// 继续直播
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

// 获取推流状态
export function liveStreamState(params) {
  return request({
    url: '/live/api/broadcast/streamState',
    method: 'get',
    params
  })
}

// 开始混流
export function startMixedFlow(data) {
  return request({
    url: '/live/api/broadcast/startMixedFlow',
    method: 'post',
    data
  })
}

// 获取连麦状态
export function lianmaiUser(params) {
  return request({
    url: '/live/api/broadcast/lianmaiUser',
    method: 'get',
    params
  })
}

/**
 * 聊天室相关
 */

// 获取聊天室聊天记录
export function getChatRoomMessageList(params) {
  return request({
    url: '/live/api/detail/private_letter',
    method: 'get',
    params
  })
}

// 消息撤回
export function msgRecall(data) {
  return request({
    url: '/live/api/detail/msg_recall',
    method: 'post',
    data
  })
}

// 消息隐藏/消息展示
export function msgHide(data) {
  return request({
    url: '/live/api/detail/hidden_info',
    method: 'post',
    data
  })
}

// 禁言列表
export function getForbidList(params) {
  return request({
    url: '/live/api/detail/forbid_list',
    method: 'get',
    params
  })
}

// 获取用户禁言状态
export function getForbidStatus(data) {
  return request({
    url: '/live/api/broadcast/forbidStatus',
    method: 'post',
    data
  })
}


// 禁言用户
export function forbidUser(data) {
  return request({
    url: '/live/api/detail/forbid_user',
    method: 'post',
    data
  })
}

// 解除禁言
export function unForbidUser(data) {
  return request({
    url: '/live/api/detail/un_forbid_user',
    method: 'post',
    data
  })
}

// 移除房间
export function removeUser(data) {
  return request({
    url: '/live/api/detail/remove_user',
    method: 'post',
    data
  })
}

// 评论上墙/下墙
export function commentOnline(data) {
  return request({
    url: '/live/api/detail/comment_online',
    method: 'post',
    data
  })
}

// 上墙历史列表
export function getCommentHistoryList(params) {
  return request({
    url: '/live/api/detail/comment_history',
    method: 'get',
    params
  })
}

// 创建删除滚动消息
export function rollMessage(data) {
  return request({
    url: '/live/api/detail/roll_message',
    method: 'post',
    data
  })
}

// 获取滚动消息
export function getRollMessage(params) {
  return request({
    url: '/live/api/detail/get_roll_message',
    method: 'get',
    params
  })
}

// 卡片列表
export function cardList(params) {
  return request({
    url: '/live/api/live_cards/index',
    method: 'get',
    params
  })
}

// 互动卡片新增
export function cardAdd(data) {
  return request({
    url: '/live/api/live_cards/create',
    method: 'post',
    data
  })
}

// 互动卡片编辑
export function cardUpdate(data) {
  return request({
    url: '/live/api/live_cards/update',
    method: 'post',
    data
  })
}

// 互动卡片删除
export function cardRemove(data) {
  return request({
    url: '/live/api/live_cards/delete',
    method: 'post',
    data
  })
}

// 互动卡片上架下架
export function cardStatus(data) {
  return request({
    url: '/live/api/live_cards/status',
    method: 'post',
    data
  })
}

// 互动卡片上架推送
export function cardPush(data) {
  return request({
    url: '/live/api/live_cards/push',
    method: 'post',
    data
  })
}

// 获取在线用户
export function getOnlineUsers(params) {
  return request({
    url: '/live/api/detail/online_user',
    method: 'get',
    params
  })
}


/**
 * 私信相关
 */

// 获取私信列表
export function getGroupList(params) {
  return request({
    url: '/live/api/detail/group_list',
    method: 'get',
    params
  })
}

// 发起私信
export function sendLetter(data) {
  return request({
    url: '/live/api/detail/send_letter',
    method: 'post',
    data
  })
}

// 私信聊天记录
export function getLetterList(params) {
  return request({
    url: '/live/api/detail/letter_list',
    method: 'get',
    params
  })
}

// 验证群组是否本直播间
export function checkGroupInLive(data) {
  return request({
    url: '/live/api/detail/check_group',
    method: 'post',
    data
  })
}

// 认领用户
export function claimUser(data) {
  return request({
    url: '/live/api/detail/check_comment_claim',
    method: 'post',
    data
  })
}

// 获取已认领用户消息
export function getClaimUserMessageList(data) {
  return request({
    url: '/live/api/detail/comment_all_list',
    method: 'post',
    data
  })
}

// 已领取未回复
export function getNotReplyMessageList(params) {
  return request({
    url: '/live/api/detail/comment_claim_auto',
    method: 'get',
    params
  })
}

// 导出全部评论
export function exportMessages(params) {
  return request({
    url: '/live/api/detail/export_chat_list',
    method: 'get',
    params
  })
}

// 获取直播间最高在线人数
export function getLiveTotalNumber(data) {
  return request({
    url: '/live/api/detail/live_total_number',
    method: 'post',
    data
  })
}

// 获取自动分配状态
export function getClaimStatus(data) {
  return request({
    url: '/live/api/broadcast/online_status',
    method: 'post',
    data
  })
}

// 切换自动分配状态
export function toggleClaimStatus(data) {
  return request({
    url: '/live/api/broadcast/online_up',
    method: 'post',
    data
  })
}
