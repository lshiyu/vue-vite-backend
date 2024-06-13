import { useClipboard } from '@vueuse/core'

export default async function useCopy(source) {
  const { copy, copied, isSupported } = useClipboard({ source })
  if (isSupported) {
    await copy()
    if (unref(copied)) {
      ElMessage.success('复制成功')
    }
  } else {
    ElMessage.success('复制失败')
  }
}
