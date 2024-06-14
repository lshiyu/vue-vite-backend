<script name="XrForm" setup>
import Autocomplete from './components/Autocomplete'
import Cascader from './components/Cascader'
import Checkbox from './components/Checkbox'
import DatePicker from './components/DatePicker'
import Input from './components/Input'
import InputNumber from './components/InputNumber'
import Radio  from './components/Radio'
import Select from './components/Select'
import TimePicker from './components/TimePicker'
import TimeSelect from './components/TimeSelect'

const props = defineProps({
  // 表单数据
  formData: {
    type: Object,
    default: () => ({})
  },
  // 表单配置项
  formColumns: {
    type: Array,
    default: () => []
  },
  // 表单验证规则
  formRules: {
    type: Object,
    default: () => ({})
  }
})

const componentsTypes = markRaw({
  Input,
  Radio,
  Checkbox,
  Select,
  Cascader,
  DatePicker,
  TimePicker,
  TimeSelect,
  InputNumber,
  Autocomplete
})

// 将表单绑定的ref暴露给父组件
const formRef = ref(null)
defineExpose({
  formRef
})
</script>

<template>
  <el-form
    ref="formRef"
    :model="props.formData"
    :rules="props.formRules"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in props.formColumns" :key="index">
      <!-- 自定义插槽 start -->
      <template v-if="item.slotName">
        <slot :name="item.slotName"></slot>
      </template>
      <!-- 自定义插槽 end -->
      <el-form-item
        v-else
        :label="item.label"
        :prop="item.prop"
        v-bind="item.formItemOpts"
      >

        <component
          :is="componentsTypes[item.fType]"
          v-bind="item"
          v-model="props.formData[item.prop]"
        />
      </el-form-item>
    </template>
  </el-form>
</template>
