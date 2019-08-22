import { merge } from 'lodash'

const watch = {
  components(value) {
    this.vjsComponents = Object.assign({}, value)
  },
  model(value) {
    this.$emit('modelChanging')
    this.setVjsModel(value)
    this.$emit('modelChanged')
  },
  schema(value) {
    this.$emit('schemaChanging')
    this.setVjsSchema(value)
    this.$emit('schemaChanged')
  },
  uiSchema(value) {
    this.$emit('uiChanging')
    this.setVjsUiSchema(value)
    this.$emit('uiChanged')
  },
  options(value) {
    this.$emit('optionChanging')
    this.vjsOptions = merge({}, this.vjsOptions, value)

    if (this.vjsOptions.showValidationErrors) {
      this.setVjsValidationErrors()
    }
    this.$emit('optionChanged')
  }
}

export default watch
