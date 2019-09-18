const events = {
  onComponentCreating: {
    type: Function,
    default: () => ({})
  },
  onComponentGenerating: {
    type: Function,
    default: () => ({})
  },
  onInit: {
    type: Function,
    default: () => ({})
  },
  onModelChanging: {
    type: Function,
    default: () => ({})
  },
  onModelChanged: {
    type: Function,
    default: () => ({})
  },
  onSchemaChanging: {
    type: Function,
    default: () => ({})
  },
  onSchemaChanged: {
    type: Function,
    default: () => ({})
  },
  onUiChanging: {
    type: Function,
    default: () => ({})
  },
  onUiChanged: { type: Function, default: () => ({}) },
  onOptionChanging: {
    type: Function,
    default: () => ({})
  },
  onOptionChanged: { type: Function, default: () => ({}) }
}

export default events
