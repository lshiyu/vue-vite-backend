<script name="TimeSelect" setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  change: {
    type: Function,
    default: () => () => {}
  },
  blur: {
    type: Function,
    default: () => () => {}
  },
  focus: {
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
  <el-time-select
    v-model="Val"
    v-bind="$attrs"
    style="width: 100%"
    @change="props.change ? props.change($event) : false"
    @blur="props.blur ? props.blur($event) : false"
    @focus="props.focus ? props.focus($event) : false"
  ></el-time-select>
</template>
