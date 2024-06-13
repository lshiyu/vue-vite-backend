import { useScroll, useElementBounding } from '@vueuse/core'

export default function useScrollToBottom(scrollWrapper, scrollContent) {
  const { y } = useScroll(scrollWrapper, { behavior: 'smooth' })

  const scroll = () => {
    nextTick(() => {
      const { height } = useElementBounding(scrollContent)
      y.value = height.value
    })
  }

  return {
    scroll
  }
}
