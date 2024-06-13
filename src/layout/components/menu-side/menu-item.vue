<script name="MenuSideItem" setup>
const props = defineProps({
	menu: {
		type: Object,
		default: () => ({})
	}
})
</script>

<template>
	<el-menu-item :index="props.menu.name">
		<i v-if="props.menu.meta.icon" class="iconfont" :class="[props.menu.meta.icon]"></i>
		<template #title>{{ props.menu.meta.title }}</template>
	</el-menu-item>
</template>

<style lang="scss" scoped>
.iconfont {
	margin-right: 12px;
	text-align: center;
	font-size: 14px;
}
</style>
