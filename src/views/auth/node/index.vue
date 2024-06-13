<script name="Node" setup>
import { to } from 'await-to-js'
import { cloneDeep } from 'lodash'
import * as nodeApi from '@/api/auth/node'

const loading = ref(false)
const list = ref([])

const dialog = reactive({
  visible: false,
  title: '新增节点'
})

const initForm = {
  name: '',
  remark: '',
  sort: undefined,
  is_menu: 1,
  is_hidden: 2,
  keep_alive: 2,
  multipage: 2,
  always_show: 2,
  hide_in_breadcrumb: 2,
  before_close: 2,
  icon: '',
  perm_identifier: '',
  active_menu: '',
  href: '',
  route: '',
  file_url: '',
  parent_id: ''
}
const formRef = ref(null)
const formData = ref({ ...initForm })
const formRules = ref({
  name: [{ required: true, message: '请输入节点名称' }],
  remark: [{ required: true, message: '请输入节点描述' }],
  sort: [{ required: true, message: '请输入节点排序' }],
  perm_identifier: [{ required: true, message: '请输入权限标识' }],
  route: [{ required: true, message: '请输入菜单路由' }],
  file_url: [{ required: true, message: '请输入组件地址' }]
})
const submitLoading = ref(false)

onMounted(getList)

const handleAdd = () => {
  dialog.title = '新增节点'
  dialog.visible = true
}
const handleUpdate = id => {
  dialog.title = '编辑节点'
  dialog.visible = true
  nextTick(async () => {
    const { data } = await nodeApi.getNodeDetail({ id })
    data.parent_id = data.parent_id || ''
    Object.assign(formData.value, data)
  })
}
const handleRemove = async id => {
  const [err] = await to(ElMessageBox.confirm('确认删除该节点？', '提示', { type: 'warning' }))
  if (!err) {
    const [err] = await to(nodeApi.deleteNode({ id }))
    if (!err) {
      ElMessage.success('删除成功')
      getList()
    }
  }
}
const handleCancel = () => {
  dialog.visible = false
  formData.value = { ...initForm }
  formRef.value.resetFields()
}
const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return false

    const params = cloneDeep(formData.value)
    params.parent_id = params.parent_id || 0

    submitLoading.value = true
    const [err] = await to(params.id ? nodeApi.updateNode(params) : nodeApi.addNode(params))
    if (!err) {
      ElMessage.success('保存成功')
      dialog.visible = false
      getList()
    }
    submitLoading.value = false
  })
}
const getList = async () => {
  loading.value = true
  const [err, res] = await to(nodeApi.getNodeList())
  if (!err) {
    const push = data => {
      const nodes = []
      data.forEach(item => {
        const node = {
          id: item.id,
          value: item.id,
          label: item.label,
          parent_id: item.parent_id,
          children: []
        }
        if (item.children) {
          node.children = push(item.children)
        }
        nodes.push(node)
      })

      return nodes
    }
    const nodes = push(res.data)
    list.value = nodes
  }
  loading.value = false
}
</script>

<template>
  <div class="page">
    <div class="overflow-hidden mb-10px">
      <el-button v-auth="['Node:add']" type="success" class="float-right" @click="handleAdd">新增</el-button>
    </div>
    <el-table v-loading="loading" :data="list" border row-key="id">
      <el-table-column prop="label" label="节点名称" />
      <el-table-column prop="action" label="操作" width="130" align="center">
        <template #default="{ row }">
          <div class="table-actions">
            <el-button v-auth="['Node:edit']" type="primary" link @click="handleUpdate(row.id)">编辑</el-button>
            <el-button v-auth="['Node:remove']" type="danger" link @click="handleRemove(row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialog.visible" :title="dialog.title" append-to-body @close="handleCancel">
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入节点名称" clearable maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="节点描述" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入节点描述" clearable maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="节点排序" prop="sort">
          <el-input-number
            v-model="formData.sort"
            placeholder="请输入节点排序"
            :min="0"
            :precision="0"
            :controls="false"
          />
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否菜单项" prop="is_menu">
              <el-radio-group v-model="formData.is_menu">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <template v-if="formData.is_menu === 1">
            <el-col :span="8">
              <el-form-item label="是否隐藏" prop="is_hidden">
                <el-radio-group v-model="formData.is_hidden">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否缓存" prop="keep_alive">
                <el-radio-group v-model="formData.keep_alive">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否多开" prop="multipage">
                <el-radio-group v-model="formData.multipage">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="显示根路由" prop="always_show">
                <el-radio-group v-model="formData.always_show">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关闭确认" prop="before_close">
                <el-radio-group v-model="formData.before_close">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="2">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <template v-if="formData.is_menu === 1">
          <el-form-item label="节点图标" prop="icon">
            <el-input v-model="formData.icon" placeholder="请输入节点图标" clearable />
          </el-form-item>
          <el-form-item label="高亮菜单" prop="active_menu">
            <el-input v-model="formData.active_menu" placeholder="请输入高亮菜单" clearable />
          </el-form-item>
          <el-form-item label="外链地址" prop="href">
            <el-input v-model="formData.href" placeholder="请输入外链地址" clearable />
          </el-form-item>
          <el-form-item label="菜单路由" prop="route">
            <el-input v-model="formData.route" placeholder="请输入菜单路由" clearable />
          </el-form-item>
          <el-form-item label="组件地址" prop="file_url">
            <el-input v-model="formData.file_url" placeholder="请输入组件地址" clearable />
          </el-form-item>
        </template>
        <el-form-item label="权限标识" prop="perm_identifier">
          <el-input v-model="formData.perm_identifier" placeholder="请输入权限标识" clearable />
        </el-form-item>
        <el-form-item label="上级节点" prop="parent_id">
          <el-tree-select
            v-model="formData.parent_id"
            :data="list"
            check-strictly
            clearable
            placeholder="请选择上级节点"
            class="w-full"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
