<script name="Role" setup>
import { to } from 'await-to-js'
import AttachPermissions from './components/AttachPermissions'
import * as roleApi from '@/api/auth/role'

const searchForm = ref({
  name: '',
  content: '',
  status: '',
  current_page: 1,
  per_page: 10
})

const loading = ref(false)
const list = ref([])
const total = ref(0)

const dialog = reactive({
  visible: false,
  title: '新增角色'
})
const isShow = computed(() => dialog.title === '查看角色')

const formData = ref({
  name: '',
  content: ''
})
const formRules = ref({
  name: [{ required: true, message: '请输入角色名称' }]
})
const submitLoading = ref(false)

const searchFormRef = ref(null)
const formRef = ref(null)
const attachPermissionsRef = ref(null)

onMounted(getList)

const getList = async () => {
  loading.value = true
  const [err, res] = await to(roleApi.getRoleList(searchForm.value))
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
const pageChange = page => {
  searchForm.value.current_page = page
  getList()
}
const pageSizeChange = size => {
  searchForm.value.per_page = size
  getList()
}
const handleAdd = () => {
  dialog.title = '新增角色'
  dialog.visible = true
}
const handleShow = id => {
  dialog.title = '查看角色'
  dialog.visible = true
  nextTick(async () => {
    const { data } = await roleApi.getRoleDetail({ id })
    Object.assign(formData.value, data)
  })
}
const handleUpdate = id => {
  dialog.title = '编辑角色'
  dialog.visible = true
  nextTick(async () => {
    const { data } = await roleApi.getRoleDetail({ id })
    Object.assign(formData.value, data)
  })
}
const handleToggle = async (id, status) => {
  const statusEnum = { ON: 1, OFF: 2 }
  const newStatus = status === statusEnum.ON ? statusEnum.OFF : statusEnum.ON
  const message = newStatus === statusEnum.ON ? '启用' : '停用'

  if (newStatus === statusEnum.OFF) {
    const [err] = await to(ElMessageBox.confirm('确定停用该角色？', '提示', { type: 'warning' }))
    if (err) return
  }

  const [err] = await to(roleApi.toggleRoleStatus({ id, status: newStatus }))
  if (!err) {
    ElMessage.success(`${message}成功`)
    getList()
  }
}
const handleAuth = row => {
  attachPermissionsRef.value.open({
    roleId: row.id,
    roleName: row.name
  })
}
const handleCancel = () => {
  dialog.visible = false
  formData.value = { name: '', content: '' }
  formRef.value.resetFields()
}
const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return
    submitLoading.value = true
    const [err] = await to(formData.value.id ? roleApi.updateRole(formData.value) : roleApi.addRole(formData.value))
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入角色名称" clearable class="input" />
        </el-form-item>
        <el-form-item label="角色描述" prop="content">
          <el-input v-model="searchForm.content" placeholder="请输入角色描述" clearable class="input" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable class="input">
            <el-option label="启用" :value="1" />
            <el-option label="停用" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">筛选</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
        <div class="float-right">
          <el-button v-auth="['Role:add']" type="success" @click="handleAdd">新增</el-button>
        </div>
      </el-form>
    </div>

    <el-table v-loading="loading" :data="list" size="large">
      <el-table-column prop="id" label="ID" width="100px" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="content" label="角色描述" show-overflow-tooltip />
      <el-table-column prop="users_count" label="角色人数" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" effect="plain">启用</el-tag>
          <el-tag v-else type="danger" effect="plain">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="action" label="操作" width="260px">
        <template #default="{ row }">
          <div class="table-actions">
            <el-button v-auth="['Role:show']" type="primary" link @click="handleShow(row.id)">查看</el-button>
            <el-button v-auth="['Role:edit']" type="primary" link @click="handleUpdate(row.id)">编辑</el-button>
            <el-button
              v-auth="['Role:toggle']"
              :type="row.status === 1 ? 'danger' : 'primary'"
              link
              @click="handleToggle(row.id, row.status)"
            >
              {{ row.status === 1 ? '停用' : '启用' }}
            </el-button>
            <el-button v-auth="['Role:auth']" type="primary" link @click="handleAuth(row)">权限设置</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="searchForm.current_page"
      v-model:page-size="searchForm.per_page"
      :total="total"
      background
      layout="total, prev, pager, next, sizes, jumper"
      class="text-center"
      @size-change="pageSizeChange"
      @current-change="pageChange"
    />

    <!-- 新增修改角色 -->
    <el-dialog v-model="dialog.visible" :title="dialog.title" append-to-body @close="handleCancel">
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        :hide-required-asterisk="isShow"
        label-suffix=":"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <template v-if="isShow">{{ formData.name }}</template>
          <template v-else>
            <el-input v-model="formData.name" placeholder="请输入角色名称" clearable maxlength="50" show-word-limit />
          </template>
        </el-form-item>
        <el-form-item label="角色描述" prop="content">
          <template v-if="isShow">{{ formData.content }}</template>
          <template v-else>
            <el-input
              v-model="formData.content"
              type="textarea"
              placeholder="请输入角色描述"
              clearable
              maxlength="500"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 6 }"
            />
          </template>
        </el-form-item>
      </el-form>
      <template v-if="!isShow" #footer>
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>

    <!-- 分配权限 -->
    <AttachPermissions ref="attachPermissionsRef" />
  </div>
</template>

<style lang="scss" scoped>
.input {
  width: 200px;
}
</style>
