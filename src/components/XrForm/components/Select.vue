<script name="Select" setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: () => ''
  },
  options: {
    type: Array,
    default: () => []
  },
  valueFiled: {
    type: String,
    default: 'value'
  },
  labelFiled: {
    type: String,
    default: 'label'
  },
  change: {
    type: Function,
    default: () => () => {}
  },
  visibleChange: {
    type: Function,
    default: () => () => {}
  },
  removeTag: {
    type: Function,
    default: () => () => {}
  },
  clear: {
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
  },
  remoteMethod: {
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
  <el-select
    v-model="Val"
    v-bind="$attrs"
    style="width: 100%"
    @change="props.change ? props.change($event) : false"
    @visible-change="props.visibleChange ? props.visibleChange($event) : false"
    @remove-tag="props.removeTag ? props.removeTag($event) : false"
    @clear="props.clear ? props.clear() : false"
    @blur="props.blur ? props.blur($event) : false"
    @focus="props.focus ? props.focus($event) : false"
    @remote-method="props.remoteMethod ? props.remoteMethod($event) : false"
  >
    <el-option
      v-for="item in options"
      :key="item[valueFiled]"
      :label="item[labelFiled]"
      :value="item[valueFiled]"
    ></el-option>
  </el-select>
</template>
