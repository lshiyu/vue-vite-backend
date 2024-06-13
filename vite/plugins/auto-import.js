import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default () => {
  return AutoImport({
    // 自动引入Vue相关函数
    imports: ['vue', 'vue-router', 'pinia'],
    resolvers: [
      ElementPlusResolver(),
      // 自动导入图标组件
      IconsResolver({
        prefix: 'icon'
      })
    ],
    vueTemplate: true,
    cache: true,
    eslintrc: {
      enabled: true
    }
  })
}
