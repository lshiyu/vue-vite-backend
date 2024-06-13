
<script name="Checkbox" setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
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
  type: {
    type: String,
    default: ''
  },
  change: {
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
  <el-checkbox-group
    v-model="Val"
    v-bind="$attrs"
    @change="props.change ? props.change($event) : false"
  >
    <template v-if="props.type === 'button'">
      <el-checkbox-button
        v-for="item in options"
        :key="item[valueFiled]"
        :label="item[valueFiled]"
      >
        {{ item[labelFiled] }}
      </el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
        v-for="item in options"
        :key="item[valueFiled]"
        :label="item[valueFiled]"
        :border="props.type === 'border'"
        >
        {{ item[labelFiled] }}
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>
