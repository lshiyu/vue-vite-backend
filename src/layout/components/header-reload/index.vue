<script setup>
const emit = defineEmits(['on-reload'])
const route = useRoute()

async function handleReload() {
	const meta = route.meta
	if (meta && meta.beforeClose) {
		return ElMessageBox.confirm(meta.beforeCloseMessage || '您确定刷新吗？', '系统提示', { type: 'warning' })
			.then(() => emit('on-reload'))
			.catch(() => {})
	}
	emit('on-reload')
}
</script>

<template>
	<span class="layout-header-trigger layout-header-trigger-min" @click="handleReload">
		<i class="i-icon i-icon-refresh" />
	</span>
</template>

<style lang="scss" scoped>
.i-icon {
	font-size: 18px;
	vertical-align: -0.125em;
}
</style>
