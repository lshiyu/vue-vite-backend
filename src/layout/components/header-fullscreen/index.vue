<script setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <span class="layout-header-trigger layout-header-trigger-min ml-18px" @click="toggle">
    <i v-show="!isFullscreen" class="i-icon i-icon-full-screen" />
		<i v-show="isFullscreen" class="i-icon i-icon-exit-full-screen" />
	</span>
</template>

<style lang="scss" scoped>
.i-icon {
  font-size: 18px;
  vertical-align: -0.125em;
}
</style>
