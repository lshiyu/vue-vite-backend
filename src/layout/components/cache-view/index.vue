<script>
function matches(include, key) {
	return !!include.find(x => x === key)
}
export default {
	name: 'CacheView',
	abstract: false,
	props: {
		include: {
			type: Array,
			default: function () {
				return []
			}
		}
	},
	data() {
		return {
			cache: {}
		}
	},
	watch: {
		include(val) {
			for (const key in this.cache) {
				const cachedNode = this.cache[key]
				if (cachedNode) {
					if (!matches(val, key)) {
						cachedNode.type.$destroy()
						delete this.cache[key]
					}
				}
			}
		}
	},
  beforeUnmount() {
		for (const key in this.cache) {
			const vnode = this.cache[key]
			vnode && vnode.componentInstance.$destroy()
		}
	},
	methods: {
		onReload() {
			const id = this.$route.meta.id
			if (id) this.cache[id] && this.$delete(this.cache, id)
		}
	},
	render() {
		const vnode = this.$slots.default ? this.$slots.default()[0] : null
		if (vnode) {
			if (this.include && this.include.length > 0 && (!vnode.key || !matches(this.include, vnode.key))) {
				return vnode
			}
			const key = vnode.key
			if (this.cache[key]) {
				vnode.type = this.cache[key].type
			} else {
				this.cache[key] = vnode
			}
			vnode.__isKeepAlive = true
		}
		return vnode
	}
}
</script>
