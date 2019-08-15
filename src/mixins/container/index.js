import computed from './computed'
import data from './data'
import methods from './methods'
import props from './props'
import watch from './watch'
import { EXTERNAL_MODEL_PROP, EXTERNAL_EVENT_CHANGE } from '../../constants'

const vjsContainerMixin = {
  model: {
    prop: EXTERNAL_MODEL_PROP,
    event: EXTERNAL_EVENT_CHANGE
  },
  created() {
    this.vjsInitialize()
  },
  beforeDestroy() {
    this.vjsDestroy()
  },
  computed,
  data,
  props,
  methods,
  watch
}

export default vjsContainerMixin
