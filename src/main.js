import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '@/styles/index.scss'
import '@/assets/iconfont/custom-icon-font/iconfont'

import App from './App.vue'
import router from '@/router'
import store from '@/store'
import plugins from '@/plugins'
import directives from '@/directives'
import { setupGlobComponents } from '@/components'

import './permission'

const app = createApp(App)

setupGlobComponents(app)

app.use(router)
app.use(store)
app.use(plugins)
app.use(directives)

app.mount('#app')
