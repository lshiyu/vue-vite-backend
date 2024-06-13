<script name="User" setup>
import { to } from 'await-to-js'
import { cloneDeep } from 'lodash'
import * as userApi from '@/api/auth/user'
import { getRoleDropdownList } from '@/api/auth/role'
import { mobileReg } from '@/utils/regs'

const searchFormRef = ref(null)
const searchForm = ref({
  name: '',
  role_id: '',
  current_page: 1,
  per_page: 10
})

const loading = ref(false)
const list = ref([])
const total = ref(0)
const roleList = ref([])

const dialog = reactive({
  visible: false,
  title: '新增用户'
})
const isShow = computed(() => dialog.title === '查看用户')

const formRef = ref(null)
const formData = ref({
  name: '',
  mobile: '',
  password: '',
  role_id: null,
  is_anchor: ''
})
const formRules = ref({
  name: [{ required: true, message: '请输入姓名' }],
  mobile: [
    { required: true, message: '请输入手机号' },
    { pattern: mobileReg, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  password: [{ required: true, message: '请输入用户密码' }],
  role_id: [{ required: true, message: '请选择所属角色', trigger: 'change' }],
  is_anchor: [{ required: true, message: '请选择是否主播' }]
})
const submitLoading = ref(false)

onMounted(() => {
  initRoleList()
  getList()
})

const initRoleList = async () => {
  const [err, res] = await to(getRoleDropdownList())
  if (!err) {
    roleList.value = res.data
  }
}
const getList = async () => {
  loading.value = true
  const [err, res] = await to(userApi.getUserList(searchForm.value))
  if (!err) {
    list.value = res.data.data
    total.value = res.data.total_number
  }
  loading.value = false
}
const handleSearch = () => {
  searchForm.value.current_page = 1
  getList()
}
const handleReset = () => {
  searchFormRef.value.resetFields()
  getList()
}
const handleAdd = () => {
  dialog.title = '新增用户'
  dialog.visible = true
}
const handleShow = id => {
  dialog.title = '查看用户'
  dialog.visible = true
  nextTick(async () => {
    const { data } = await userApi.getUserDetail({ id })
    const role = data.role_ids[0]
    Object.assign(formData.value, data, { role_name: role?.name, role_id: role?.id })
  })
}
const handleUpdate = id => {
  dialog.title = '编辑用户'
  dialog.visible = true
  nextTick(async () => {
    const { data } = await userApi.getUserDetail({ id })
    const role = data.role_ids[0]
    Object.assign(formData.value, data, { role_name: role?.name, role_id: role?.id })
  })
}
const handleRemove = id => {
  ElMessageBox.confirm('删除后，该用户将无法使用系统，确认删除该用户？', '提示', { type: 'warning' })
    .then(async () => {
      const [err] = await to(userApi.deleteUser({ id }))
      if (!err) {
        ElMessage.success('删除成功')
        getList()
      }
    })
    .catch(() => {})
}
const handleCancel = () => {
  dialog.visible = false
  formData.value = {
    name: '',
    mobile: '',
    password: '',
    role_id: null,
    is_anchor: ''
  }
  formRef.value.resetFields()
}
const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return
    submitLoading.value = true
    const params = cloneDeep(formData.value)
    params.role_ids = [params.role_id]
    delete params.role_id
    const [err] = await to(params.id ? userApi.updateUser(params) : userApi.addUser(params))
    if (!err) {
      dialog.visible = false
      ElMessage.success('保存成功')
      getList()
    }
    submitLoading.value = false
  })
}
</script>

<template>
  <div class="page">
    <div class="search">
      <el-form ref="searchFormRef" :model="searchForm" inline>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入姓名" clearable class="input" />
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="searchForm.role_id" placeholder="请选择所属角色" clearable class="input">
            <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">筛选</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
        <div class="float-right">
          <el-button v-auth="['User:add']" type="success" @click="handleAdd">新增</el-button>
        </div>
      </el-form>
    </div>

    <el-table v-loading="loading" :data="list" size="large">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="roles" label="所属角色">
        <template #default="{ row }">{{ row.roles[0]?.name }}</template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" />
      <el-table-column prop="action" label="操作" width="180px">
        <template #default="{ row }">
          <div class="table-actions">
            <el-button v-auth="['User:show']" type="primary" link @click="handleShow(row.id)">查看</el-button>
            <el-button v-auth="['User:edit']" type="primary" link @click="handleUpdate(row.id)">编辑</el-button>
            <el-button v-auth="['User:remove']" type="danger" link @click="handleRemove(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-model:page="searchForm.current_page"
      v-model:size="searchForm.per_page"
      :total="total"
      @change="getList"
    />

    <el-dialog v-model="dialog.visible" :title="dialog.title" append-to-body @close="handleCancel">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        :hide-required-asterisk="isShow"
        label-suffix=":"
        label-width="100px"
      >
        <el-form-item label="姓名" prop="name">
          <template v-if="isShow">{{ formData.name }}</template>
          <template v-else>
            <el-input v-model="formData.name" placeholder="请输入姓名" maxlength="50" show-word-limit clearable />
          </template>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <template v-if="isShow">{{ formData.mobile }}</template>
          <template v-else>
            <el-input v-model="formData.mobile" placeholder="请输入手机号" clearable maxlength="11" autocomplete="new-password" />
          </template>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <template v-if="isShow">{{ formData.password }}</template>
          <template v-else>
            <el-input v-model="formData.password" type="password" show-password autocomplete="new-password" placeholder="请输入用户密码" />
          </template>
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <template v-if="isShow">{{ formData.role_name }}</template>
          <template v-else>
            <el-select v-model="formData.role_id" placeholder="请选择所属角色" clearable class="w-full">
              <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id" />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="是否主播" prop="is_anchor">
          <template v-if="isShow">{{ formData.is_anchor === 1 ? '是' : '否' }}</template>
          <template v-else>
            <el-radio-group v-model="formData.is_anchor">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
      </el-form>
      <template v-if="!isShow" #footer>
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.input {
  width: 200px;
}
</style>
