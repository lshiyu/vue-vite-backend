<script name="Cascader" setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  change: {
    type: Function,
    default: () => () => {}
  },
  expandChange: {
    type: Function,
    default: () => () => {}
  }
})

const Val = computed({
  get: () => props.modelValue,
  set: (v) => {
    emit('update:modelValue', v)
  }
})
</script>

<template>
  <el-cascader
    v-bind="$attrs"
    v-model="Val"
    style="width: 100%"
    @change="props.change ? props.change($event) : false"
    @expand-change="props.expandChange ? props.expandChange($event) : false"
  />
</template>
