<script setup>
import useUserStore from '@/store/modules/user'

function handleLogout() {
  ElMessageBox.confirm('您确定退出登录吗?', '系统提示', { type: 'warning' })
    .then(() => {
      useUserStore().userLogout()
    })
    .catch(() => {})
}
</script>

<template>
  <span class="layout-header-trigger layout-header-trigger-min" @click="handleLogout">
		<i class="iconfont icon-tubiaozhizuomoban-" />
	</span>
</template>

<style lang="scss" scoped>
.iconfont {
	font-size: 20px;
	vertical-align: -0.125em;
}
</style>
