<script setup>
import { throttle } from 'lodash'

const route = useRoute()

const breadcrumbRef = ref(null)
const isLimit = ref(true)
const maxWidth = ref(560)
const breadcrumbWidth = ref(0)
const breadcrumbList = ref(['首页'])
const handleResize = ref(() => { })

onMounted(() => {
  handleResize.value = throttle(handleCheckWidth, 100, { leading: false })
  window.addEventListener('resize', handleResize.value)
  handleGetWidth()
  handleCheckWidth()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize.value)
})

function handleGetWidth() {
  isLimit.value = false
  nextTick(() => {
    const $breadcrumb = breadcrumbRef.value
    if ($breadcrumb)
      breadcrumbWidth.value = Number.parseInt($breadcrumb.offsetWidth)
  })
}

function handleCheckWidth() {
  const $header = document.getElementById('layoutHeader')
  if ($header) {
    const headerWidth = Number.parseInt($header.offsetWidth)
    nextTick(() => {
      isLimit.value = headerWidth - maxWidth.value <= breadcrumbWidth.value
    })
  }
}

watch(route, (to) => {
  const list = []
  if (to.matched) {
    to.matched.forEach((item) => {
      if (item.meta.title)
        list.push(item.meta.title)
    })
  }
  breadcrumbList.value = list
  handleGetWidth()
  handleCheckWidth()
}, { immediate: true })
</script>

<template>
  <div v-if="!isLimit" ref="breadcrumbRef" class="layout-header-breadcrumb">
    <template v-for="(item, index) in breadcrumbList" :key="index">
      <div class="breadcrumb-separator">/</div>
      <div class="breadcrumb-item">{{ item }}</div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.layout-header-breadcrumb {
  display: inline-flex;
  padding-left: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;

  .breadcrumb-separator {
    padding: 0 8px;
  }
}
</style>
