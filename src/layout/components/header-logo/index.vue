<script name="HeaderLogo" setup>
import useAppStore from '@/store/modules/app'

const menuCollapse = computed(() => useAppStore().menuCollapse)
</script>

<template>
	<router-link to="/" class="layout-header-logo" :class="{ 'is-collapse': useAppStore().menuCollapse }">
    <div v-if="menuCollapse">系统</div>
    <div v-else>管理系统</div>
	</router-link>
</template>

<style lang="scss" scoped>
.layout-header-logo {
  display: flex;
  align-items: center;
  justify-content: center;
	width: 200px;
	height: 64px;
	&.is-collapse {
		width: 80px;
	}
	img {
		height: 80%;
	}
}
</style>
