<script name="MenuTabs" setup>
import Tabs from './Tabs'
import useAppStore from '@/store/modules/app'
import usePageStore from '@/store/modules/page'

const router = useRouter()

const appStore = useAppStore()
const pageStore = usePageStore()

const menuCollapse = computed(() => appStore.menuCollapse)
const opened = computed(() => pageStore.opened)
const current = computed(() => pageStore.current)
const tabsStyle = computed(() => {
  const menuWidth = menuCollapse.value ? 80 : 200
  return {
    width: `calc(100% - ${menuWidth}px)`,
    top: '64px',
    left: `${menuWidth}px`
  }
})

const handleClickTab = route => {
  router.push(route)
}

const handleClickClose = async route => {
  if (route?.beforeClose) {
    return ElMessageBox.confirm(route?.beforeCloseMessage || '您确定关闭吗？', '系统提示', { type: 'warning' })
      .then(() => pageStore.close({ id: route.id }))
      .catch(() => { })
  } else {
    pageStore.close({ id: route.id })
  }
}

const handleClose = (name) => {
  switch (name) {
    case 'left':
      pageStore.closeLeft(current.value)
      break
    case 'right':
      pageStore.closeRight(current.value)
      break
    case 'other':
      pageStore.closeOther(current.value)
      break
    case 'all':
      pageStore.closeAll({ redirect: true })
      break
    default:
  }
}
</script>

<template>
  <div class="layout-tabs" :style="tabsStyle">
    <div class="layout-tabs-main">
      <Tabs :opened="opened" :current="current" @on-change="handleClickTab" @on-close="handleClickClose" />
      <el-dropdown class="layout-tabs-close" @command="handleClose">
        <div class="layout-tabs-close-main">
          <el-icon :size="16">
            <i-ep-arrow-down />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="left">
              <el-icon :size="18">
                <i-ep-back />
              </el-icon>
              关闭左侧
            </el-dropdown-item>
            <el-dropdown-item command="right">
              <el-icon :size="18">
                <i-ep-right />
              </el-icon>
              关闭右侧
            </el-dropdown-item>
            <el-dropdown-item command="other">
              <el-icon :size="18">
                <i-ep-close />
              </el-icon>
              关闭其他
            </el-dropdown-item>
            <el-dropdown-item command="all">
              <el-icon :size="18">
                <i-ep-circle-close-filled />
              </el-icon>
              关闭全部
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-tabs {
  position: fixed;
  width: 100%;
  transition: all 0.2s ease-in-out;
  z-index: 998;

  .layout-tabs-main {
    display: flex;
    padding: 6px 0;
    margin: 0 10px;
    background: #f5f7f9;

    .layout-tabs-close {
      flex-grow: 0;
      flex-shrink: 0;

      .layout-tabs-close-main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        background-color: #fff;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>
