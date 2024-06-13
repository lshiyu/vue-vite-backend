<script name="Timer" setup>
import { dayjs } from 'element-plus'

const props = defineProps({
  autoStart: {
    type: Boolean,
    default: true
  },
  startTime: {
    type: [String, Number],
    default: 0
  }
})

const timer = ref(null)
const count = ref(0)
const time = ref('00:00')
const counting = ref(false)

onMounted(reset)
onBeforeUnmount(pause)

const padZero = (num, targetLength = 2) => {
  let str = num + ''
  while (str.length < targetLength) {
    str = '0' + str
  }
  return str
}

const setTime = () => {
  count.value++
  let s = padZero(count.value % 60, 2)
  let m = padZero(parseInt(count.value / 60) % 60, 2)
  time.value = `${m}:${s}`
}

const start = () => {
  if (counting.value) return
  counting.value = true
  setTime()
  tick()
}

const pause = () => {
  counting.value = false
  timer.value && clearTimeout(timer.value)
}

const reset = () => {
  count.value = dayjs().unix() - props.startTime

  pause()
  props.autoStart && start()
}

const tick = () => {
  timer.value = setTimeout(() => {
    setTime()
    tick()
  }, 1000)
}


</script>

<template>
  <span>{{ time }}</span>
</template>

<style lang="scss" scoped></style>
