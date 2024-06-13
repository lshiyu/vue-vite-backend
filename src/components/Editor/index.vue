<template>
  <div class="quill-editor">
    <QuillEditor
      ref="editorRef"
      v-model:content="content"
      contentType="html"
      :toolbar="toolbar"
      :modules="modules"
      :placeholder="props.placeholder"
      theme="snow"
    />
  </div>
</template>

<script setup>
import { useVModels } from '@vueuse/core'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import FontSizeModule from './quill-font-size-module'
import TextAlignModule from './quill-text-align-module'

Quill.register(FontSizeModule, true)
Quill.register(TextAlignModule, true)

import ImageUploader from 'quill-image-uploader'

import { UPLOAD_URL, getToken, getFileName } from '@/libs/qiniu'
import axios from 'axios'

const emit = defineEmits(['update:content'])
const props = defineProps(['content', 'placeholder'])
const { content } = useVModels(props, emit)

const editorRef = shallowRef()

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: FontSizeModule.whitelist }],
  [{ color: [] }, { background: [] }],
  ['image']
]
const modules = {
  name: 'imageUploader',
  module: ImageUploader,
  options: {
    upload: file => {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('key', getFileName(file, 'image'))
        formData.append('token', getToken('image'))
        axios({
          url: UPLOAD_URL,
          method: 'post',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: formData
        })
          .then(res => {
            const url = `https://images.dayiketang.com/${res.data.key}`
            resolve(url)
          })
          .catch(err => {
            reject('上传失败', err)
            this.$message.error('上传失败，请重试!')
          })
      })
    }
  }
}
</script>

<style lang="scss">
@import './quill-font-size-module/index.scss';

.quill-editor {
  line-height: 1.2;
  .ql-container {
    height: 300px;
  }
}
</style>
