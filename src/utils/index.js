export const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout))

/**
 * @description 数字转中文
 * @param {*} num
 * @returns
 */
export function convertToChinaNum(num) {
  var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九')
  var arr2 = new Array(
    '',
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
    '亿',
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
    '亿'
  ) // 可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return '零'
  }
  var english = num.toString().split('')
  var result = ''
  for (var i = 0; i < english.length; i++) {
    var des_i = english.length - 1 - i // 倒序排列设值
    result = arr2[i] + result
    var arr1_index = english[des_i]
    result = arr1[arr1_index] + result
  }
  // 将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
  // 合并中间多个零为一个零
  result = result.replace(/零+/g, '零')
  // 将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
  // 将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿')
  // 移除末尾的零
  result = result.replace(/零+$/, '')
  // 将【零一十】换成【零十】
  // result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  // 将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}

/**
 * 判断是否为对象
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export const downLoadQrcode = (url, title = '二维码') => {
  urlToBase64(url, 'png', _baseUrl => {
    const eleLink = document.createElement('a')
    eleLink.download = title
    eleLink.style.display = 'none'
    eleLink.href = _baseUrl
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
  })
}

export const urlToBase64 = (url, fileType = 'png', callback) => {
  return new Promise(resolve => {
    if (!url) resolve(url)
    const img = new Image()
    img.src = url
    img.setAttribute('crossOrigin', 'Anonymous')
    img.onload = function () {
      const canvas = document.createElement('canvas')
      const width = img.width
      const height = img.height
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      const base64 = canvas.toDataURL(`image/${fileType}`)
      typeof callback === 'function' && callback(base64)
      resolve(base64)
    }
  })
}

export function addZero(val) {
  let num = val > 9 ? val : '0' + val
  return num
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}/{m}/{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time, 10)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 聊天时间处理
 * @param {(Object|string|number)} time
 * @param {string} option 时间格式
 */
export function chatTimes(time, option) {
  // time = +time * 1000
  time = parseInt(time)
  if (time && time !== undefined) {
    const d = new Date(time)
    const dtime = d.getTime() //传入的时间戳
    const nowTime = new Date().getTime() //当前时间戳
    const todaytime = new Date(new Date().toLocaleDateString()).getTime() //今天零点时间戳
    const yesterdaytime = new Date(new Date().toLocaleDateString()).getTime() - 24 * 3600 * 1000 //昨天零点的时间戳
    const diff = (nowTime - dtime) / 1000

    if (diff < 30) {
      return '刚刚'
    } else if (dtime >= todaytime) {
      // less 1 hour
      return addZero(d.getHours()) + ':' + addZero(d.getMinutes())
    } else if (dtime > yesterdaytime && dtime < todaytime) {
      //现在时间戳大于昨天零点时间戳
      return '昨天 ' + addZero(d.getHours()) + ':' + addZero(d.getMinutes())
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return (
        d.getFullYear() +
        '-' +
        addZero(d.getMonth() + 1) +
        '-' +
        addZero(d.getDate()) +
        ' ' +
        addZero(d.getHours()) +
        ':' +
        addZero(d.getMinutes())
      )
    }
  } else {
    return ''
  }
}

/**
 * 获取当前url的后缀
 * @param {*} url
 * @returns
 */
export function getFileExtension(url) {
  return url.split('.').pop()
}

/**
 * 当前url是否是图片
 * @param {*} url
 * @returns
 */
export function isImage(url) {
  const extension = getFileExtension(url)
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif']
  return imageExtensions.includes(extension.toLowerCase())
}

/**
 * 当前url是否是视频
 * @param {*} url
 * @returns
 */
export function isVideo(url) {
  const extension = getFileExtension(url)
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv']
  return videoExtensions.includes(extension.toLowerCase())
}
