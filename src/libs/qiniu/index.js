import { genUpToken } from './token'
import { dayjs } from 'element-plus'
export const AK = 'jBs-KkX6p28ANYt1B_Rmcbw5T_fV-97zayA0nVgZ'
export const SK = 'DruqdkFMq0VbyCTgTJ7bbbURClTzlqGqllW4zAQb'
export const IMAGE_BUCKET_NAME = 'dyktimages'
export const VIDEO_BUCKET_NAME = 'dyktvoives'
export const EXCEL_BUCKET_NAME = 'xlys-micro-execl'
export const UPLOAD_URL = import.meta.env.VITE_APP_UPLOAD_URL
export const IMAGE_URL = import.meta.env.VITE_APP_QN_IMAGE_URL
export const VIDEO_URL = import.meta.env.VITE_APP_QN_VIDEO_URL

export function getToken(type = 'image') {
  let token
  let policy = {}
  let bucketName = type === 'image' ? IMAGE_BUCKET_NAME : VIDEO_BUCKET_NAME
  switch (type) {
    case 'image':
      bucketName = IMAGE_BUCKET_NAME
      break
    case 'video':
      bucketName = VIDEO_BUCKET_NAME
      break
    case 'excel':
      bucketName = EXCEL_BUCKET_NAME
      break
    default:
      bucketName = ''
  }
  let deadline = Math.round(new Date().getTime() / 1000) + 3600
  policy.scope = bucketName
  policy.deadline = deadline
  token = genUpToken(AK, SK, policy)
  return token
}

export function guid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export function getFileName(file, type) {
  const name = file.name
  const point = name.lastIndexOf('.')
  const suffix = name.substr(point)

  const date = dayjs().format('YYYYMMDD')
  let key = `live_backend/${type}_${date}_${guid()}${suffix}`
  if (type === 'excel') {
    const line = name.lastIndexOf('_')
    const prefix = name.substr(0,line)
    key = `${prefix}_${date}-${guid()}${suffix}`
  }
  return key
}
