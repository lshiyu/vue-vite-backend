import router from '@/router'
import usePageStore from '@/store/modules/page'

export default {
  closePage({ id, redirect }) {
    let routerId = id || router.currentRoute.value.meta.id
    usePageStore().close({ id: routerId, redirect })
  }
}
