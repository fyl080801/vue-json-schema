import { get } from 'lodash'

const vjsUiGetters = {
  getVjsFields(fields = []) {
    return fields.reduce(
      (vjsFields, field) => [...vjsFields, this.vjsHelperCreateField(field)],
      []
    )
  },
  // 根据 model 条件设定是否显示控件
  getFieldCondition(field) {
    if (field.condition === null || field.condition === undefined) {
      return true
    }

    if (typeof field.condition === 'boolean') {
      return field.condition
    }

    if (typeof field.condition === 'string') {
      return this.getVjsFieldModel(field.condition)
    }

    if (typeof field.condition === 'function') {
      return field.condition(this.getVjsModel())
    }

    if (typeof field.condition === 'object' && field.condition.type) {
      if (field.condition.type === 'boolean') {
        return field.condition.value
      }

      if (field.condition.type === 'string') {
        return this.getVjsFieldModel(field.condition.value)
      }

      if (field.condition.type === 'function') {
        const Fn = Function
        return new Fn(`return ${field.condition.value}`)()(this.getVjsModel())
      }

      return true
    }

    return true
  },
  getVjsUiFieldVisible(field) {
    if (field.errorHandler) {
      if (!this.vjsOptions.showValidationErrors) {
        const state = this.getVjsFieldState(field.model)
        if (
          !state ||
          (state && (!state.vjsFieldBlur || !state.vjsFieldDirty))
        ) {
          return false
        }
      }

      const value = this.getVjsFieldModel(field.model)
      const schema = this.getVjsFieldSchema(field.model)

      this.ajv.validate(schema, value)
      const oldErrors = this.ajv.errors ? this.ajv.errors : []

      if (oldErrors.length === 0) {
        return false
      }
    }

    if (!field.displayOptions) {
      return true
    }

    const { model, schema = {} } = field.displayOptions

    const value =
      typeof model === 'undefined'
        ? this.getVjsModel()
        : this.getVjsFieldModel(model)

    // Validate and check if we got any errors
    // const errors = model
    //   ? this.getVjsValidationErrors(value, schema)
    //   : this.getVjsModelValidationErrors(model, value, schema);

    // TODO: There's something wrong with the evaluation done in getVjsValidationErrors
    // Temporarily revert back to old behaviour with validating in this function
    this.ajv.validate(schema, value)
    const oldErrors = this.ajv.errors ? this.ajv.errors : []

    return oldErrors.length === 0
  },
  getVjsUiFieldArrayChildrenActive(model, children) {
    const vjsFieldModel = this.getVjsFieldModel(model) || []

    return vjsFieldModel
      .map((v, i) => this.vjsHelperChildArrayReducerMapper(model, children, i))
      .map(this.getVjsUiFieldsActive)
  },
  getVjsUiField({ children = [], model, ...field }) {
    if (
      this.getVjsUiFieldVisible({ ...field, model }) &&
      this.getFieldCondition({ ...field, model })
    ) {
      const isArray = this.vjsHelperFieldIsArray(model)
      const required = this.vjsHelperFieldIsRequired(model)

      if (isArray) {
        return {
          ...field,
          model,
          required,
          children: this.getVjsUiFieldArrayChildrenActive(model, children)
        }
      }

      return {
        ...field,
        model,
        required,
        children: this.getVjsUiFieldsActive(children)
      }
    }

    return false
  },
  getVjsUiFieldsActive(fields) {
    return fields.reduce((newFields, field, index) => {
      if (field) {
        const newField = this.getVjsUiField(field)
        if (newField) {
          newFields.push(newField)
        }
      }

      return newFields
    }, [])
  },
  getVjsFieldUiSchema(key) {
    return this.getVjsUiSchema(key)
  },
  getVjsUiSchema(key) {
    if (key) {
      return get(this.vjsUiSchema, key)
    }

    return this.vjsUiSchema
  }
}

export default vjsUiGetters
