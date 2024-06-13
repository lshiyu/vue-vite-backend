<script name="CountDown" setup>
import { dayjs } from 'element-plus'
import { cancelRaf, isSameSecond, parseFormat, parseTimeData, raf } from './utils'

const props = defineProps({
  time: {
    type: [Number, String],
    default: 0
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emit = defineEmits(['finish'])

const remain = ref(0)
const endTime = ref(0)
const counting = ref(false)
const refId = ref(null)

const timeData = computed(() => parseTimeData(remain.value))
const formattedTime = computed(() => parseFormat(props.format, timeData.value))

const start = () => {
  if (counting.value) return
  counting.value = true
  endTime.value = Date.now() + remain.value
  tick()
}

const pause = () => {
  counting.value = false
  if (refId.value) cancelRaf(refId.value)
}

const reset = () => {
  pause()
  remain.value = dayjs(props.time).valueOf() - Date.now()
  start()
}

const tick = () => {
  refId.value = raf(() => {
    if (!counting.value) return
    const value = getRemain()
    if (!isSameSecond(value, remain.value) || value === 0) {
      setReamin(value)
    }
    if (remain.value > 0) {
      tick()
    }
  })
}

const getRemain = () => {
  return Math.max(endTime.value - Date.now(), 0)
}

const setReamin = value => {
  remain.value = value
  if (value === 0) {
    pause()
    emit('finish')
  }
}

watch(() => props.time, reset, { immediate: true })
onBeforeUnmount(pause)
</script>

<template>
  <slot :timeData="timeData">
    <span>{{ formattedTime }}</span>
  </slot>
</template>
