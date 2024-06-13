<script name="Layout" setup>
import HeaderLogo from './components/header-logo'
import HeaderCollapse from './components/header-collapse'
import HeaderReload from './components/header-reload'
import HeaderBreadCrumb from './components/header-breadcrumb'
import HeaderUser from './components/header-user'
import HeaderFullscreen from './components/header-fullscreen'
import HeaderNotice from './components/header-notice'
import HeaderLogout from './components/header-logout'
import MenuTabs from './components/menu-tabs'
import MenuSide from './components/menu-side'
// import CacheView from './components/cache-view'
import useAppStore from '@/store/modules/app'
import { computed } from 'vue'

import usePageStore from '@/store/modules/page'

const loadRouter = ref(true)
const cacheViewRef = ref(null)

const include = computed(() => usePageStore().keepAlive)

const siderStyle = computed(() => {
  return {
    width: useAppStore().menuCollapse ? '80px' : '200px'
  }
})
const insideClass = computed(() => {
  return {
    'is-collapse': useAppStore().menuCollapse
  }
})

function handleReload() {
  cacheViewRef.value.onReload()
  loadRouter.value = false
  nextTick(() => {
    loadRouter.value = true
  })
}
</script>

<template>
  <div class="layout">
    <div class="layout-sider" :style="siderStyle">
      <MenuSide />
    </div>
    <div class="layout-inside" :class="insideClass">
      <div id="layoutHeader" class="layout-header">
        <HeaderLogo />
        <HeaderCollapse />
        <HeaderReload @on-reload="handleReload" />
        <HeaderBreadCrumb />
        <div class="layout-header-right">
          <HeaderUser />
          <HeaderFullscreen />
          <HeaderNotice />
          <HeaderLogout />
        </div>
      </div>
      <div class="layout-content">
        <MenuTabs />
        <div class="layout-content-main">
          <router-view v-slot="{ Component, route }">
            <keep-alive :include="include">
              <component :is="Component" :key="route.meta.id" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    min-height: 100vh;
    background: #fff;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
    user-select: none;
    transition: width 0.2s ease-in-out;
  }
  .layout-inside {
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
    padding-left: 200px;
    &.is-collapse {
      padding-left: 80px;
    }
  }
  .layout-header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
    background: linear-gradient(to right, #1d42ab, #2173dc, #1e93ff);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    transition: width 0.2s ease-in-out;
    color: #fff;
    overflow: hidden;
    z-index: 998;
    .layout-header-trigger {
      display: inline-block;
      height: 64px;
      line-height: 64px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      &.layout-header-trigger-min {
        width: auto;
        padding: 0 12px;
        i {
          font-size: 18px;
        }
      }
    }
    .layout-header-right {
      display: flex;
      margin-left: auto;
      padding-right: 10px;
      height: 64px;
    }
  }
  .layout-content {
    padding-top: 64px;
    &-main {
      margin: 44px 10px 10px 10px;
    }
  }
}
</style>
