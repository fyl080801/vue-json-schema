import { merge } from 'lodash-es'

const watch = {
  components(value) {
    this.vjsComponents = Object.assign({}, value)
  },
  model: {
    handler: function(value) {
      this.setVjsModel(value)
    },
    deep: true
  },
  schema: {
    handler: function(value) {
      this.setVjsSchema(value)
    },
    deep: true
  },
  uiSchema: {
    handler: function(value) {
      this.setVjsUiSchema(value)
    },
    deep: true
  },
  options(value) {
    this.vjsOptions = merge({}, this.vjsOptions, value)

    if (this.vjsOptions.showValidationErrors) {
      this.setVjsValidationErrors()
    }
  }
}

export default watch
