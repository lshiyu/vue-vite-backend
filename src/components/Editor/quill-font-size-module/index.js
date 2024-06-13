import { Quill } from '@vueup/vue-quill'

const fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px']

export default fontSizeStyle
