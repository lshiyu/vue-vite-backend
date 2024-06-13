/**
 * @description 基于ELMessage的loading
 */

const getTemplate = loadingText => {
  return `
    <div class="el-message-loading">
      <div class="el-loading-parent--relative">
        <div class="el-loading-spinner">
          <svg class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none"></circle></svg>
        </div>
      </div>
      <div>${loadingText}</div>
    </div>
  `
}

export default function loading(loadingText = '加载中...') {
  return ElMessage({
    dangerouslyUseHTMLString: true,
    message: getTemplate(loadingText),
    duration: 0,
    customClass: 'el-message-loading-wrap'
  })
}
