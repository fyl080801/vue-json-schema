import { set } from 'lodash'

const vjsValidationGetters = {
  /** getVjsPropertiesRequired
    @function
    @description Get all errors of type required
    @param [errors] array
    @return
      An array of the properties in the errors array
      were the error property 'keyword' was 'required'.
  */
  getVjsPropertiesRequired(errors) {
    if (!errors) {
      return []
    }

    return errors.reduce((required, error) => {
      if (error.keyword === 'required') {
        if (error.params && error.params.missingProperty) {
          const key = error.params.missingProperty
          const parent = String(error.dataPath).substr(1)
          const propertyPath = parent ? `${parent}.${key}` : key

          if (required.indexOf(propertyPath) === -1) {
            required.push(propertyPath)
          }
        }
      }

      return required
    }, [])
  },
  getVjsChildPropertiesRequired(parentFields = [], excludeProperties = []) {
    const uniqueProperties = parentFields.filter(
      property => excludeProperties.indexOf(property) === -1
    )

    return uniqueProperties.reduce((properties, property) => {
      // Add current property to array
      properties.push(property)

      // Validate schema with this property being an empty object
      const value = {}
      set(value, property, {})
      this.ajv.validate(this.getVjsSchema(), value)
      const propertiesRequired = this.getVjsPropertiesRequired(this.ajv.errors)

      // If there were required properties below this property (i.e. this property is an object)
      if (propertiesRequired.length > 0) {
        const excludePropertiesChildren = [
          ...excludeProperties,
          ...uniqueProperties
        ]

        const childFieldsRequired = this.getVjsChildPropertiesRequired(
          propertiesRequired,
          excludePropertiesChildren
        )

        properties.push(...childFieldsRequired)
      }

      return properties
    }, [])
  },
  getVjsFieldModelValid(key, value) {
    const errors = this.getVjsFieldModelValidationErrors(key, value)
    return errors.length === 0
  },
  getVjsFieldModelValidationErrors(key, value) {
    return this.getVjsValidationErrors(value, this.getVjsSchema(key))
  },
  getVjsModelValidationErrorsLocalized() {
    const { ajv = {} } = this.vjsOptions
    const { locale } = ajv

    if (typeof locale === 'function') {
      locale(this.ajv.errors)
    }
  },
  getVjsValid() {
    const errors = this.getVjsValidationErrors()
    return errors.length === 0
  },
  getVjsValidationErrors(model, schema) {
    const ajvSchema = schema || this.getVjsSchema()
    const ajvModel = model || this.getVjsModel()

    const valid = this.ajv.validate(ajvSchema, ajvModel)
    this.getVjsModelValidationErrorsLocalized()
    return !valid ? this.ajv.errors : []
  }
}

export default vjsValidationGetters
