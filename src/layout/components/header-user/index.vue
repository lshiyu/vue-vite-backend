<script setup>
import useUserStore from '@/store/modules/user'

const userInfo = computed(() => useUserStore().userInfo)
</script>

<template>
  <div class="user-wrapper">
    <el-avatar :size="30" class="avatar">
      <el-icon :size="16" color="#999">
        <i-ep-user-filled />
      </el-icon>
    </el-avatar>
    <span class="name">{{ userInfo?.name || '' }}</span>
  </div>
</template>

<style lang="scss" scoped>
.user-wrapper {
  display: flex;
  align-items: center;
	line-height: 64px;

	.avatar {
    background: #eee;
	}

	.name {
		padding-left: 10px;
    font-size: 14px;
	}
}
</style>
