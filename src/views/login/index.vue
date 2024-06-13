<script name="Login" setup>
import Cookies from 'js-cookie'
import { to } from 'await-to-js'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import useUserStore from '@/store/modules/user'
import '@/assets/js/canvas-nest.min.js'

const router = useRouter()
const rotue = useRoute()

const formRef = ref(null)
const form = reactive({
  mobile: '',
  password: ''
})
const rules = reactive({
  mobile: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }]
})
const rememberPwd = ref(false)
const loading = ref(false)

onMounted(() => {
  getCookies()
  document.getElementsByTagName('canvas')[0].className = 'index_bg'
})
onBeforeUnmount(() => {
  document.getElementsByTagName('canvas')[0].removeAttribute('class')
})

const getCookies = () => {
  const mobile = Cookies.get('mobile')
  const password = Cookies.get('password')
  const remember = Cookies.get('rememberPwd')
  form.mobile = mobile === undefined ? '' : mobile
  form.password = password === undefined ? '' : decrypt(password)
  rememberPwd.value = remember === undefined ? false : Boolean(rememberPwd)
}

const handleRemember = () => {
  if (!rememberPwd.value) {
    Cookies.remove('mobile')
    Cookies.remove('password')
    Cookies.remove('rememberPwd')
    return
  }
  Cookies.set('mobile', form.mobile, { expires: 30 })
  Cookies.set('password', String(encrypt(form.password)), { expires: 30 })
  Cookies.set('rememberPwd', String(rememberPwd.value), { expires: 30 })
}

const handleLogin = () => {
  formRef.value.validate(async valid => {
    if (!valid) return
    loading.value = true
    const [err] = await to(useUserStore().login({ ...form }))
    if (!err) {
      handleRemember()
      router.replace(rotue.query.redirect || '/')
    }
    loading.value = false
  })
}
</script>

<template>
  <div class="login-page">
    <div class="login-wrapper">
      <div class="left-image"></div>
      <div class="right-box">
        <div class="title">后台登录</div>
        <el-form ref="formRef" :model="form" :rules="rules">
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" show-password auto-complete="new-password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="rememberPwd">记住密码</el-checkbox>
          </el-form-item>
          <el-button type="primary" :loading="loading" class="w-full" @click="handleLogin">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style>
.index_bg {
  width: 100%;
  background: rgba(0, 0, 0, 0.3) !important;
  z-index: 0 !important;
}
</style>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url('../../assets/images/login/bg.jpg');

  .login-wrapper {
    display: flex;
    height: 400px;
    z-index: 1;

    .left-image {
      border-radius: 6px 0px 0px 6px;
      width: 510px;
      height: 100%;
      background: #1890ff;
    }

    .right-box {
      padding: 55px 40px 32px;
      width: 384px;
      height: 400px;
      border-radius: 0px 6px 6px 0px;
      background: #f7f7f7;

      .title {
        padding-bottom: 32px;
        text-align: center;
        color: #133676;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>
