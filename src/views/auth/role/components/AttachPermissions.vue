<script name="AttachPermissions" setup>
import { to } from 'await-to-js'
import { getRolePermissionDetail, roleAttachPermission } from '@/api/auth/role'
import { ElMessage } from 'element-plus'

const visible = ref(false)
const roleId = ref('')
const roleName = ref('')
const nodes = ref([])
const checkeds = ref([])
const loading = ref(false)
const submitLoading = ref(false)
const checkStrictly = ref(true)

const treeRef = ref(null)

const open = async role => {
  roleId.value = role.roleId
  roleName.value = role.roleName
  visible.value = true
  loading.value = true
  const [err, res] = await to(getRolePermissionDetail({ id: role.roleId }))
  if (!err) {
    const permissions = res.data.permission
    const ids = []
    const push = data => {
      data.forEach(item => {
        if (item.checked) ids.push(item.id)
        if (item.children) push(item.children)
      })
    }
    push(permissions)
    checkeds.value = ids
    nodes.value = permissions
    checkStrictly.value = true
  }
  loading.value = false
}

const handleCancel = () => {
  nodes.value = []
  checkeds.value = []
}
const handleSubmit = async () => {
  const nodes = treeRef.value.getCheckedNodes(false, true)
  const params = {
    id: roleId.value,
    permission_ids: nodes.map(x => x.id)
  }
  submitLoading.value = true
  const [err] = await to(roleAttachPermission(params))
  if (!err) {
    ElMessage.success('保存成功')
    visible.value = false
  }
  submitLoading.value = false
}

defineExpose({ open })
</script>

<template>
  <el-dialog v-model="visible" title="权限配置" :close-on-click-modal="false" @close="handleCancel">
    <el-form v-loading="loading" label-width="100px">
      <el-form-item label="当前角色:">{{ roleName }}</el-form-item>
      <el-form-item label="权限节点:">
        <el-tree
          ref="treeRef"
          :data="nodes"
          :check-strictly="checkStrictly"
          :default-checked-keys="checkeds"
          show-checkbox
          node-key="id"
          class="w-full"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="submitLoading" @click="handleSubmit">保存</el-button>
    </template>
  </el-dialog>
</template>
