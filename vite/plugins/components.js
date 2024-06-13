import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default () => {
  return Components({
    resolvers: [
      // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep']
      }),
      // 自动导入 Element Plus 组件
      ElementPlusResolver()
    ]
  })
}
