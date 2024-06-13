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
    xType: 'Input',
    label: '姓名',
    prop: 'name',
    clearable: true,
    span: 8,
    offset: 0
  },
  {
    xType: "Radio",
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
    xType: "InputNumber",
    label: "年龄",
    prop: "age",
    min: 1,
    max: 120,
    "controls-position": "right",
    step: 2,
    span: 8,
  },
  {
    xType: "Select",
    label: "岗位",
    prop: "jobs",
    span: 8,
    options: jobsList,
  },
  {
    xType: "Select",
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
    xType: "DatePicker",
    label: "出生日期",
    type: "date",
    prop: "birthday",
    span: 8,
  },
  {
    xType: "TimePicker",
    label: "出生时间",
    prop: "birthTime",
    placeholder: "请选择时间",
    span: 8,
  },
  {
    xType: "TimeSelect",
    label: "起床时间",
    prop: "getupTime",
    placeholder: "请选择时间",
    start: "08:30",
    step: "00:15",
    end: "18:30",
    span: 8,
  },
  {
    xType: "Checkbox",
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
    console.log(valid, '3333')
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
