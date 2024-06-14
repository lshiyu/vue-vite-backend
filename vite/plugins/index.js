import vue from '@vitejs/plugin-vue'
import createUnoCss from './unocss'
import createAutoImport from './auto-import'
import createComponents from './components'
import createIcons from './icons'
import createVueSetupExtend from './vue-setup-extend'

export default () => {
  const plugins = []
  plugins.push(vue())
  plugins.push(createUnoCss())
  plugins.push(createAutoImport())
  plugins.push(createComponents())
  plugins.push(createIcons())
  plugins.push(createVueSetupExtend())
  return plugins
}
