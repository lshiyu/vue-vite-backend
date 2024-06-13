<script name="Tabs" setup>
import BScroll from '@better-scroll/core'
import usePageStore from '@/store/modules/page'

const route = useRoute()
const props = defineProps({
  opened: {
    type: Array,
    default: () => []
  },
  current: {
    type: String,
    default: 'Home'
  }
})
const emit = defineEmits(['on-close', 'on-change'])

const scrollable = ref(false)
const bs = ref(null)
const navScrollRef = ref(null)
const navRef = ref(null)

const tabClasses = computed(() => {
  return item => ['tabs-nav-scroll-content-item', { active: props.current === item.id }]
})

onMounted(() => {
  bs.value = new BScroll(navScrollRef.value, {
    scrollX: true
  })
  updateNavScroll()
})
onBeforeUnmount(() => {
  bs.value && bs.value.destroy()
})

const updateNavScroll = async () => {
  await nextTick()
  const navContainerWidth = navScrollRef.value.offsetWidth
  const navWidth = navRef.value.offsetWidth
  scrollable.value = navWidth > navContainerWidth
  bs.value.refresh()
}

const handleClick = item => {
  if (item.id === props.current) return
  scrollToActiveTab()
  emit('on-change', item)
}

const handleRemove = item => {
  updateNavScroll()
  emit('on-close', item)
}

const scrollPrev = () => {
  const currentX = Math.abs(bs.value.x)

  if (currentX <= 0) return

  const x = currentX > 300 ? 300 : currentX
  bs.value.scrollBy(x)
}

const scrollNext = () => {
  const currentX = Math.abs(bs.value.x)
  const maxScrollX = Math.abs(bs.value.maxScrollX)

  if (currentX >= maxScrollX) return

  const x = maxScrollX - currentX > 300 ? -300 : -(maxScrollX - currentX)
  bs.value.scrollBy(x)
}

const scrollToActiveTab = async () => {
  if (!scrollable.value) return
  await nextTick()

  const active = document.querySelector('.active')
  const navScroll = navScrollRef.value
  const navScrollWidth = navScroll.offsetWidth
  const navContainer = navRef.value
  const x = bs.value.x

  // 左边被遮住
  if (x + active.offsetLeft < 0) {
    // 是否第一个
    if (active.offsetLeft === 0) {
      bs.value.scrollTo(0)
    } else {
      let offset = 80 // 滚动时多给点偏移量让前面的标签也漏出来
      bs.value.scrollTo(-active.offsetLeft + offset)
    }
  }

  // 右边被遮住
  if (active.offsetLeft + active.offsetWidth + x > navScrollWidth) {
    let value = active.offsetLeft + active.offsetWidth - navScrollWidth
    // 是否最后一个
    if (navContainer.offsetWidth - active.offsetLeft - active.offsetWidth < 10) {
      bs.value.scrollTo(-(active.offsetLeft + active.offsetWidth))
    } else {
      let offset = 50 // 滚动时多给点偏移量让后面的标签也漏出来
      bs.value.scrollBy(-(value + offset) - x)
    }
  }
}

watch(() => props.opened, updateNavScroll)
watch(() => props.current, scrollToActiveTab)
watch(route, to => usePageStore().open(to), { immediate: true })
</script>

<template>
  <div class="tabs">
    <div :class="['tabs-nav', { 'tabs-nav-scrollable': scrollable }]">
      <span :class="['tabs-nav-prev', { 'tabs-nav-scroll-disabled': !scrollable }]" @click="scrollPrev">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span :class="['tabs-nav-next', { 'tabs-nav-scroll-disabled': !scrollable }]" @click="scrollNext">
        <i class="el-icon-arrow-right"></i>
      </span>
      <div ref="navScrollRef" class="tabs-nav-scroll">
        <div ref="navRef" class="tabs-nav-scroll-content">
          <div v-for="item in opened" :key="item.id" :class="tabClasses(item)" @click="handleClick(item)">
            {{ item.title }}
            <el-icon v-if="item.id !== 'Home'" class="close" @click.stop="handleRemove(item)">
              <i-ep-close />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 14px;
  line-height: 1.5;

  &-nav-scrollable {
    padding: 0 32px;
  }

  &-nav-scroll-disabled {
    display: none;
  }

  &-nav {
    position: relative;

    &-prev,
    &-next {
      position: absolute;
      width: 32px;
      text-align: center;
      line-height: 32px;
      cursor: pointer;

      i {
        font-size: 14px;
        font-weight: bold;
      }
    }

    &-prev {
      left: 0;
    }

    &-next {
      right: 0;
    }

    &-scroll {
      white-space: nowrap;
      overflow: hidden;

      &-content {
        display: inline-block;

        &-item {
          display: inline-block;
          height: 32px;
          padding: 5px 16px 4px;
          margin-right: 6px;
          box-sizing: border-box;
          cursor: pointer;
          position: relative;
          border-radius: 3px;
          background: #fff;
          color: #808695;

          &:last-child {
            margin-right: 0;
          }

          &:hover {
            color: #515a6e;
          }

          &.active {
            height: 32px;
            padding-bottom: 5px;
            background: #fff;
            border-color: #dcdee2;
            color: #2d8cf0;
          }

          .close {
            color: #808695;

            &:hover {
              color: #444;
            }
          }
        }
      }
    }
  }
}
</style>
