<script name="MenuSide" setup>
import MenuSideItem from './menu-item'
import MenuSideSubmenu from './menu-submenu'
import useAppStore from '@/store/modules/app'
import useMenuStore from '@/store/modules/menu'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const menuStore = useMenuStore()

const opendNames = ref([])
const menuCollapse = computed(() => appStore.menuCollapse)
const menuList = computed(() => menuStore.menus)
const activeMenu = computed(() => {
  const { name, meta } = route
  if (meta.activeMenu) return meta.activeMenu
  return name
})

function handleSelect(name) {
  router.push({ name })
}
</script>

<template>
	<div class="layout-menu-side">
		<el-scrollbar wrap-class="scrollbar">
			<el-menu
				class="el-menu-vertical"
				unique-opened
				:collapse="menuCollapse"
				:default-active="activeMenu"
				:default-openeds="opendNames"
				@select="handleSelect"
			>
				<template v-for="menu in menuList">
					<menu-side-item
						v-if="menu.children === undefined || menu.children.length === 0"
						:key="`item-${menu.name}`"
						:menu="menu"
					/>
					<menu-side-submenu v-else :key="`sub-${menu.name}`" :menu="menu" />
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<style lang="scss" scoped>
.el-menu {
	border-right: none;
}

.layout-menu-side {
	margin-top: 64px;
	height: calc(100vh - 64px);

	.scrollbar {
		overflow-x: hidden;
	}
}

.el-menu-vertical:not(.el-menu--collapse) {
	width: 200px;
  height: calc(100vh - 64px);
}
</style>
