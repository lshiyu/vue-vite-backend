import UnoCSS from 'unocss/vite'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export default () => {
  return UnoCSS({
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons(),
      // 将rem转为px 1rem=4px
      presetRemToPx({
        baseFontSize: 4
      })
    ]
  })
}
