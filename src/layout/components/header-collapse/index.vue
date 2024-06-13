<script setup>
import useAppStore from '@/store/modules/app'

const appStore = useAppStore()
const menuCollapse = computed(() => appStore.menuCollapse)
</script>

<template>
  <span class="layout-header-trigger layout-header-trigger-min" @click="appStore.toggleMenuCollapse">
    <i v-if="menuCollapse" class="i-icon i-icon-menu-unfold"></i>
		<i v-else class="i-icon i-icon-menu-fold"></i>
	</span>
</template>

<style lang="scss" scoped>
.i-icon {
	font-size: 18px;
	vertical-align: -0.125em;
}
</style>
