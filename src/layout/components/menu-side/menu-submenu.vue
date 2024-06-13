<script name="MenuSideSubmenu" setup>
import MenuSideItem from './menu-item'

const props = defineProps({
	menu: {
		type: Object,
		default: () => ({})
	}
})
</script>

<template>
	<div>
		<el-sub-menu :index="props.menu.name">
			<template #title>
				<i v-if="props.menu.meta.icon" class="iconfont" :class="[props.menu.meta.icon]"></i>
				<span>{{ props.menu.meta.title }}</span>
			</template>
			<template v-for="(item, index) in props.menu.children">
				<MenuSideItem v-if="item.children === undefined || !item.children.length" :key="`item-${index}`" :menu="item" />
				<MenuSideSubmenu v-else :key="`sub-${index}`" :menu="item" />
			</template>
		</el-sub-menu>
	</div>
</template>

<style lang="scss" scoped>
.iconfont {
	margin-right: 12px;
	text-align: center;
	font-size: 14px;
}
</style>
