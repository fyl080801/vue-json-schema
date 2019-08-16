import computed from './computed'
import methods from '../methods'
import props from './props'

const vjsFieldMixin = {
  computed,
  props,
  methods,
  mounted() {
    this.vjsFieldHelperAddListener(this.$el, 'blur')
  },
  beforeDestroy() {
    this.vjsFieldHelperRemoveListener(this.$el, 'blur')
  }
}

export default vjsFieldMixin
