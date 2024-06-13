<script name="Autocomplete" setup>
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: String,
    default: () => ''
  },
  select: {
    type: Function,
    default: () => () => {}
  },
  change: {
    type: Function,
    default: () => () => {}
  }
})

const Val = computed({
  get: () => props.modelValue,
  set: (v) => {
    emit("update:modelValue", v)
  }
})
</script>

<template>
    <el-autocomplete
      v-bind="$attrs"
      v-model="Val"
      style="width:100%"
      @select="props.select ? props.select($event) : false"
      @change="props.change ? props.change($event) : false"
    />
</template>
