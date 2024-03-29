import Ajv from 'ajv'
import getters from './getters'
import setters from './setters'
import { EVENT_MODEL_VALIDATE } from '../../../constants'

const vjsValidation = {
  vjsValidationInitialize() {
    const { ajv = {} } = this.vjsOptions
    const { options = {}, keywords = {}, plugins = {} } = ajv

    // Set up Ajv
    this.ajv = new Ajv({
      ...options,
      // The `allErrors` option is required for validation to work
      allErrors: true
    })

    // Allow Ajv to be extended by other functions
    // such as ajv-merge-patch, ajv-async etc.
    Object.keys(plugins).forEach(name => {
      if (typeof plugins[name] === 'function') {
        plugins[name](this.ajv)
      }
    })

    // Add custom keywords
    Object.keys(keywords).forEach(key => {
      this.ajv.addKeyword(key, keywords[key])
    })

    // Add additional schemas
    Object.keys(this.schemas).forEach(key => {
      this.ajv.addSchema(this.schemas[key], key)
    })

    // TODO: Move this to a method so we can call it when the schema/ui-schema/model is updated

    // This is somewhat of a hack...
    //
    // To find out if a property is required
    // we get the schema and use an empty object
    // as the data, with allErrors option in Ajv
    // we can get all the required properties
    // and check if the model key is found in the errors
    this.ajv.validate(this.getVjsSchema(), {})

    if (this.ajv.errors) {
      const propertiesRequired = this.getVjsPropertiesRequired(this.ajv.errors)
      this.vjsFieldsRequired = this.getVjsChildPropertiesRequired(
        propertiesRequired
      )
    }

    // Check if validation is enabled and set to run on load
    if (this.vjsOptions.validate && this.vjsOptions.validateOnLoad) {
      this.vjsBus.emit(EVENT_MODEL_VALIDATE, { vjsModel: this.getVjsModel() })
    }
  },
  ...getters,
  ...setters
}

export default vjsValidation
