import { Quill } from '@vueup/vue-quill'

const Align = Quill.import('attributors/style/align')
Align.whitelist = ['right', 'center', 'justify']

export default Align
