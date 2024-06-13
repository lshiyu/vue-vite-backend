<script name="Radio" setup>
  const emit = defineEmits(['update:modelValue'])

  const props = defineProps({
    modelValue: {
      type: [String, Number, Boolean],
      default: ''
    },
    change: {
      type: Function,
      default: () => () => {}
    },
    type: {
      type: String,
      default: ''
    },
    labelFiled: {
      type: String,
      default: 'label'
    },
    valueFiled: {
      type: String,
      default: 'value'
    },
    options: {
      type: Array,
      default: () => []
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
  <el-radio-group
    v-bind="$attrs"
    v-model="Val"
    @change="props.change ? props.change($event) : false"
  >
    <template v-if="props.type === 'button'">
      <el-radio-button
        v-for="item in props.options"
        :key="item[props.valueFiled]"
        :label="item[props.labelFiled]"
      ></el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="item in props.options"
        :key="item[props.valueFiled]"
        :label="item[props.valueFiled]"
        :border="props.type === 'border'"
      >
        {{ item[props.labelFiled] }}
      </el-radio>
    </template>
  </el-radio-group>
</template>
