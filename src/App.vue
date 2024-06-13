<script setup>
import useAppStore from '@/store/modules/app'

onMounted(() => {})
</script>

<template>
  <el-config-provider :locale="useAppStore().locale">
    <router-view />
  </el-config-provider>
</template>
