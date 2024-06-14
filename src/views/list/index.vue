<script name="List" setup>
import {
  jobsList,
  departmentList,
  provinces
 } from './data'

onMounted(() => {
  console.log('onmounted')
})
const formData = ref({
  name: '',
  sex: ''
})
const formColumn = ref([
  {
    fType: 'Input',
    label: '姓名',
    prop: 'name',
    clearable: true,
    span: 8,
    offset: 0
  },
  {
    fType: "Radio",
    label: "性别",
    prop: "sex",
    span: 8,
    options: [
      {
        value: "1",
        label: "男",
      },
      {
        value: "2",
        label: "女",
      },
    ]
  },
  {
    fType: "InputNumber",
    label: "年龄",
    prop: "age",
    min: 1,
    max: 120,
    "controls-position": "right",
    step: 1,
    span: 8,
  },
  {
    fType: "Select",
    label: "岗位",
    prop: "jobs",
    span: 8,
    options: jobsList,
  },
  {
    fType: "Select",
    label: "部门",
    prop: "department",
    span: 8,
    clearable: true,
    valueFiled: "id",
    labelFiled: "name",
    multiple: true,
    "collapse-tags": true,
    options: departmentList,
  },
  {
    fType: "DatePicker",
    label: "出生日期",
    type: "datetimerange",
    prop: "birthday",
    span: 8,
  },
  {
    fType: "TimePicker",
    label: "出生时间",
    prop: "birthTime",
    placeholder: "请选择时间",
    span: 8,
  },
  {
    fType: "TimeSelect",
    label: "起床时间",
    prop: "getupTime",
    placeholder: "请选择时间",
    start: "08:30",
    step: "00:15",
    end: "18:30",
    span: 8,
  },
  {
    fType: "Checkbox",
    label: "办公地区",
    prop: "officeArea",
    span: 8,
    options: provinces,
  },
  {
    slotName: "Actions",
  }
])
const formRules = ref({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur', type: 'string' }]
})

const baseForm = ref()

function handleSubmit() {
  baseForm.value.formRef.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>
<template>
  <div class="page">test xrform {{ formData.name }}
    <xr-form ref="baseForm" :formData="formData" :formColumns="formColumn" :formRules="formRules" label-width="120px">
      <template #Actions>
        <div class="text-align-center">
          <el-button @click="handleSubmit">保存</el-button>
        </div>
      </template>
    </xr-form>
  </div>
</template>
