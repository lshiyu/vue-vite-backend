import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export default () => {
  return UnoCSS({
    presets: [presetUno(), presetAttributify(), presetIcons()]
  })
}
