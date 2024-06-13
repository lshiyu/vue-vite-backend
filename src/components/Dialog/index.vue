<script name="Dialog" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '650px'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  footerHide: {
    type: Boolean,
    default: false
  },
  showCancel: {
    type: Boolean,
    default: true
  },
  cancelTxt: {
    type: String,
    default: '取消'
  },
  successTxt: {
    type: String,
    default: '去顶'
  }
})
const emits = defineEmits(['update:modelValue', 'on-submit'])
const is_show = ref(false)

watch(() => props.modelValue, () => {
  is_show.value = props.modelValue
}, { immediate: true })

const handleSubmit = () => {

}
const handleCancel = () => {
  is_show.value = false
  emits('update:modelValue', false)
}

</script>

<template>
  <el-dialog class="card-dialog" :show-close="false" v-model="is_show" append-to-body :title="props.title" :width="props.width" :destroy-on-close="destroyOnClose" @close="handleCancel">
    <template #header="{close, titleId, titleClass}">
      <div class="card-header flex justify-start items-center">
        <div class="ch-title" :id="titleId" :class="titleClass">{{ props.title }}</div>
        <i-ep-close class="ch-icon absolute cursor-pointer" color="#000" size="20" @click="close" />
      </div>
    </template>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
    <template #footer v-if="!footerHide">
        <div class="card-footer pt-30 pb-30 flex justify-center items-center">
          <el-button type="default" v-if="showCancel" @click="is_show = false">{{ cancelTxt }}</el-button>
          <el-button type="primary" class="ml-15" @click="handleSubmit">{{ successTxt }}</el-button>
        </div>
      </template>
  </el-dialog>
</template>

<style lang="scss">
.card-dialog {
  .el-dialog__header, .el-dialog__body, .el-dialog__footer {
    padding: 0;
    margin: 0;
  }
  .input {
    width: 100%;
  }
  .card-header {
    height: 56px;
    background: $color-f5;
    box-sizing: border-box;
    padding: 0 20px;
    .ch-title {
      font-size: 16px;
      color: $color-85;
    }
    .ch-icon {
      top: 20px;
      right: 20px;
    }
  }
  .card-content {
    width: auto;
    height: auto;
    padding: 10px 20px 0;
    .card-content-tag-box {
      width: 100%;
      .cctb-tag {
        width: auto;
        height: 32px;
        border-radius: 5px;
        padding: 0 20px;
        margin-bottom: 20px;
        border: 1px solid $color-primary;
        background: $color-white;
        color: $color-primary;
        &.active {
          border: 1px solid $color-primary;
          background: $color-primary;
          color: $color-white;
        }
        &.cctb-tag-last {
          font-size: 13px;
        }
      }
      .cctb-tag + .cctb-tag {
        margin-left: 15px;
      }
    }
  }
  .card-footer {
    width: 100%;
    height: auto;
  }
}
</style>
