import { merge } from 'lodash-es'
import events from './events'

const props = merge(
  {
    components: {
      type: Object,
      default: () => ({})
    },
    model: {
      type: Object,
      default: () => ({})
    },
    schema: {
      type: Object,
      required: true,
      default: () => ({})
    },
    schemas: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    },
    tag: {
      type: String,
      default: 'div'
    },
    uiSchema: {
      type: Array,
      required: true,
      default: () => ({})
    }
  },
  events
)

export default props
