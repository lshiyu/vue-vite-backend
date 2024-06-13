import tab from './tab'
import hasAuth from './auth'
import loading from './loading'

export default function installPlugin(app) {
  app.config.globalProperties.$tab = tab
  app.config.globalProperties.$hasAuth = hasAuth
  app.config.globalProperties.$loading = loading
}
