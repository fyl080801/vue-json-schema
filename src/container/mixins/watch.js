import { merge } from 'lodash'

const watch = {
  components(value) {
    this.vjsComponents = Object.assign({}, value)
  },
  model: {
    handler: function(value) {
      this.$emit('modelChanging')
      this.setVjsModel(value)
      this.$emit('modelChanged', this.vjsModel)
    },
    deep: true
  },
  schema: {
    handler: function(value) {
      this.$emit('schemaChanging')
      this.setVjsSchema(value)
      this.$emit('schemaChanged')
    },
    deep: true
  },
  uiSchema: {
    handler: function(value) {
      this.$emit('uiChanging')
      this.setVjsUiSchema(value)
      this.$emit('uiChanged')
    },
    deep: true
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
