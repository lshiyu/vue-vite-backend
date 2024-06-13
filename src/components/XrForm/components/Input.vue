<script name="Input" setup>
  const emit = defineEmits(['update:modelValue'])

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    blur: {
      type: Function,
      default: () => {}
    },
    focus: {
      type: Function,
      default: () => {}
    },
    change: {
      type: Function,
      default: () => {}
    },
    input: {
      type: Function,
      default: () => {}
    },
    clear: {
      type: Function,
      default: () => {}
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
  <el-input
    v-bind="$attrs"
    v-model="Val"
    @blur="props.blur ? props.blur($event) : false"
    @focus="props.focus ? props.focus($event) : false"
    @input="props.input ? props.input($event) : false"
    @change="props.change ? props.change($event) : false"
    @clear="props.clear ? props.clear($event) : false"
  ></el-input>
</template>
