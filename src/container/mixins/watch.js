import { merge } from 'lodash'

const watch = {
  components(value) {
    this.vjsComponents = Object.assign({}, value)
  },
  model(value) {
    this.setVjsModel(value)
  },
  schema(value) {
    this.setVjsSchema(value)
  },
  uiSchema(value) {
    this.setVjsUiSchema(value)
  },
  options(value) {
    this.vjsOptions = merge({}, this.vjsOptions, value)

    if (this.vjsOptions.showValidationErrors) {
      this.setVjsValidationErrors()
    }
  }
}

export default watch
