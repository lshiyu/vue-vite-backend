<script name="UploadImage" setup>
import { UPLOAD_URL, getToken, getFileName, IMAGE_URL, VIDEO_URL } from '@/libs/qiniu'
import { isImage, isVideo } from '@/utils'
import { ElMessage } from 'element-plus'
const props = defineProps({
  maxCount: {
    type: Number,
    defaulte: 1
  },
  modelValue: {
    type: [String, Array],
    default: () => ([])
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  tips: {
    type: String,
    default: ''
  },
  method: {
    type: String,
    default: 'post'
  },
  size: {
    type: Number,
    default: 1024
  },
  multiple: {
    type: Boolean,
    default: false
  },
  customStyle: {
    type: Object,
    default: () => ({
      width: '150px',
      height: '150px'
    })
  },
  imgTip: {
    type: Boolean,
    default: false
  },
  imgTipTxt: {
    type: String,
    default: ''
  },
  videoTip: {
    type: Boolean,
    default: false
  },
  videoTipTxt: {
    type: String,
    default: ''
  }
})
const fileType = ref('')
const uploadFileList = ref([])
const upload_url = ref(UPLOAD_URL)
const emits = defineEmits(['update:modelValue'])
const uploadData = reactive({
  key: '',
  token: '',
})
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

watch(() => props.modelValue, () => {

  if (props.modelValue) {
    if (Array.isArray(props.modelValue)) {
      uploadFileList.value = [...props.modelValue]
    } else {
      uploadFileList.value = [{url: props.modelValue, name: props.modelValue}]
    }
  } else {
    uploadFileList.value = []
  }
}, { immediate: true, deep: true })
const previewList = computed(() => {
  return uploadFileList.value.filter(x => x.status === 'success').map(x => x.url)
})

const imageUrl = computed(() => {
  return (url) => {
    return isImage(url)
  }
})

const videoUrl = computed(() => {
  return (url) => {
    return isVideo(url)
  }
})

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles, 'remove')
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const handleSuccess = (res, file) => {
  let url = fileType.value === 'video' ? VIDEO_URL : IMAGE_URL
  file.url = `${url}/${res.key}`
  file.name = res.hash
  let imgArr = null
  if (props.multiple) {
    imgArr = uploadFileList.value.map(x => x.url)
  } else {
    if (uploadFileList.value.length) {
      imgArr = uploadFileList.value[0].url
    } else {
      imgArr = ''
    }
  }
  emits('update:modelValue', imgArr)
}

const handleError = (err, file, files) => {
  console.log(err, 'err-res')
  console.log(file, 'err-file')
  console.log(files, 'err-files')
}

const onBeforeRemove = (file, files) => {
  console.log(file, 'remove-be')
  console.log(files, 'remove-bes')
}

const onBeforeUpload = (uploadFile) => {
  try {
    const isLt = uploadFile.size / 1024 / 1024
    const type = uploadFile.type
    fileType.value = type.includes('video') ? 'video' : 'image'
    let size = type.includes('image') ? 5 : type.includes('video') ? 5 * 1024 : props.size
    if (isLt > size) {
      let msg = type.includes('image') ? '图片' : type.includes('video') ? '视频' : '文件'
      msg = `${msg}大小不超过`
      if (size === 5) {
        msg = `${msg}${size}MB`
      } else {
        msg = `${msg}${parseInt(size / 1024)}G`
      }
      ElMessage.error(msg)
      return false
    }
    if (props.multiple && uploadFileList.value.length >= props.maxCount) {
      ElMessage.error(`最多只能上传 ${props.maxCount} 张`)
      return false
    }
    uploadData.key = getFileName(uploadFile, fileType.value)
    uploadData.token = getToken(fileType.value)
  } catch (error) {
    let msg = error.message || error
    ElMessage.error(msg)
  }
}

const onRemove = (index) => {
  uploadFileList.value.splice(index, 1)
}
</script>

<template>
  <div class="flex justify-start items-start flex-wrap">
    <div
      v-for="(item, index) in uploadFileList"
      :key="index"
      class="image-wrapper relative flex justify-center items-center"
      :style="customStyle"
    >
    <template v-if="item.status === 'success'">
      <el-image v-if="imageUrl(item.url)" :src="item.url" fit="contain" :preview-src-list="previewList" class="image"></el-image>
      <video controls v-if="videoUrl(item.url)" :src="item.url" class="video"></video>
      <i-ep-remove class="icon-del absolute" color="#ff444a" @click.stop="onRemove(index)" />
    </template>
    <template v-else>
      <el-icon :size="30" class="animation">
        <i-ep-loading></i-ep-loading>
      </el-icon>
    </template>
  </div>
  <el-upload
    v-show="uploadFileList.length < props.maxCount"
    v-model:file-list="uploadFileList"
    :accept="props.accept"
    :action="upload_url"
    :data="uploadData"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :before-remove="onBeforeRemove"
    :before-upload="onBeforeUpload"
  >
    <el-icon>
      <i-ep-plus></i-ep-plus>
    </el-icon>
  </el-upload>
  <div class="file-tip-container ml-15">
    <div v-if="props.imgTip" class="file-tip-list">
      <div class="file-tip-title mb-5">图片文件</div>
      <div class="file-tip-desc">*{{ props.imgTipTxt }}</div>
    </div>
    <div v-if="props.videoTip" class="file-tip-list mt-15">
      <div class="file-tip-title mb-5">视频文件</div>
      <div class="file-tip-desc">*{{ props.videoTipTxt }}</div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.image-wrapper {
	width: 150px;
	height: 150px;
	margin-right: 20px;
	margin-bottom: 10px;
	cursor: pointer;
	border: 1px dashed #d9d9d9;
	box-sizing: content-box;
  .cover {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    background-color: rgba(3, 3, 3, 0.61);
    .text {
      color: #fff;
      font-size: 12px;
    }
    .icon-zoomin {
      width: 12px;
      height: 12px;
      margin-left: 4px;
    }
  }
  .image,.video {
    width: 100%;
    height: 100%;
  }
  .image {
    object-fit: contain;
  }
  .icon-del {
    width: 16px;
    height: 16px;
    top:-8px;
    right: -8px;
    background: $color-white;
  }
}
.file-tip-container {
  width: 133px;
  height: auto;
  .file-tip-list {
    width: 100%;
    height: auto;
    .file-tip-title {
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: $color-85;
      font-weight: bold;
    }
    .file-tip-desc {
      width: 100%;
      line-height: 20px;
      font-size: 14px;
      color: $color-primary;
    }
  }
}
.animation {
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
