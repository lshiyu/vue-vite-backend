<script setup>
import { useVModels } from '@vueuse/core'
const emit = defineEmits(['update:page', 'update:size', 'change'])
const props = defineProps(['page', 'size', 'total'])
const { page, size } = useVModels(props, emit)
</script>

<template>
  <el-pagination
    v-model:current-page="page"
    v-model:page-size="size"
    :total="total"
    background
    layout="total, prev, pager, next, sizes, jumper"
    class="text-center"
    @size-change="emit('change')"
    @current-change="emit('change')"
  />
</template>
