import { set, cloneDeep } from 'lodash-es'
import vjsFieldComponent from '../../../field'

const vjsHelpers = {
  vjsHelperCreateField(vjsFieldUiSchema) {
    // 触发一个事件，供组件外部操作属性的值
    this.$emit('componentCreating', vjsFieldUiSchema)

    const {
      id: vjsFieldId,
      children = [],
      component,
      errorHandler: vjsFieldErrorHandler,
      errorOptions: vjsFieldErrorOptions = {},
      fieldOptions: vjsFieldOptions = {},
      model: vjsFieldModelKey = '',
      required: vjsFieldRequired = false,
      valueProp: vjsFieldValueProp = this.vjsOptions.valueProp
    } = vjsFieldUiSchema

    const vjsFieldSchema = this.getVjsFieldSchema(vjsFieldModelKey) || {}
    const vjsFieldSchemas = this.schemas
    const vjsFieldModel = this.getVjsFieldModel(vjsFieldModelKey)
    const vjsFieldState = this.getVjsFieldState(vjsFieldModelKey) || {}

    const vjsModel = this.getVjsModel()
    const vjsState = this.getVjsState()

    const { vjsFieldErrors = [] } = vjsFieldState

    const { domProps } = vjsFieldOptions
    const generateErrorsAsChildren =
      vjsFieldErrorHandler &&
      vjsFieldErrors.length > 0 &&
      (!domProps || !domProps.innerHTML) &&
      children.length === 0

    const vjsChildren = generateErrorsAsChildren
      ? this.vjsHelperGetErrors(vjsFieldErrors, vjsFieldId)
      : children.map(this.vjsHelperCreateField)

    const props = {
      ...vjsFieldOptions,
      vjsBus: this.vjsBus,
      vjsChildrenUiSchema: children,
      vjsOptions: this.vjsOptions,
      vjsChildren,
      vjsFieldErrorHandler,
      vjsFieldErrorOptions,
      vjsFieldErrors,
      vjsFieldId,
      vjsFieldModel,
      vjsFieldModelKey,
      vjsFieldOptions,
      vjsFieldRequired,
      vjsFieldSchema,
      vjsFieldSchemas,
      vjsFieldState,
      vjsFieldUiSchema,
      vjsFieldValueProp,
      vjsModel,
      vjsState
    }

    return this.vjsHelperCreateComponent({
      children: vjsChildren,
      component,
      props
    })
  },
  vjsHelperGetErrors(errors = [], id) {
    return errors.map((error, index) =>
      this.vjsHelperCreateField({
        id: `${id}-error-${index}`,
        component: 'div',
        fieldOptions: {
          class: ['vjs-error', 'vjs-default-error-handler'],
          domProps: {
            innerHTML: error.message
          }
        }
      })
    )
  },
  vjsHelperHashString(string, binary = 62) {
    let integer = 0

    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i)
      integer = (integer * 33) ^ char // eslint-disable-line no-bitwise
    }

    integer >>>= 0 // eslint-disable-line no-bitwise

    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const array = []

    while (integer >= binary) {
      const char = integer % binary
      array.push(chars[char])
      integer = Math.floor(integer / binary)
    }

    return array.join('')
  },
  vjsHelperCreateComponent({ children = [], component, props }) {
    const localComponent = this.vjsComponents[component]

    return !props.vjsFieldModelKey
      ? this.$createElement(
          localComponent || component,
          {
            key: props.vjsFieldId,
            ...props.vjsFieldOptions
          },
          children
        )
      : this.$createElement(
          vjsFieldComponent,
          {
            key: `${props.key || props.vjsFieldId}-wrapper`,
            props: {
              ...props,
              vjsComponent: localComponent || component
            }
          },
          children
        )
  },
  vjsHelperApplyFieldModel(key, value) {
    const newVjsModel = cloneDeep(this.getVjsModel())
    set(newVjsModel, key, value)
    return newVjsModel
  },
  vjsHelperGenerateField(field, level = 0) {
    if (!field) {
      return false
    }

    this.$emit('componentGenerating', field)

    const { children = [], ...fieldWithoutChildren } = field
    const objString = JSON.stringify({ fieldWithoutChildren, level })
    const id = this.vjsHelperHashString(objString)

    return {
      ...field,
      id,
      children: (children || []).map((child, i) =>
        this.vjsHelperGenerateField(child, (i + 1) * (level + 1))
      )
    }
  },
  vjsHelperChildArrayMapper(
    { model, children = [], ...child },
    parentModel,
    index
  ) {
    return {
      ...child,
      model: this.vjsHelperGetChildArrayModelAtIndex(model, parentModel, index),
      children: this.vjsHelperChildArrayReducerMapper(
        parentModel,
        children,
        index
      )
    }
  },
  vjsHelperChildArrayReducerMapper(model, children = [], index) {
    return children.reduce(
      (allChildren, child) => [
        ...allChildren,
        this.vjsHelperChildArrayMapper(child, model, index)
      ],
      []
    )
  },
  vjsHelperGetChildArrayModelAtIndex(model, parentModel, index) {
    const relativeModel = this.vjsHelperGetRelativeModel(model, parentModel)
    return relativeModel ? `${parentModel}.${index}.${relativeModel}` : model
  },
  vjsHelperGetRelativeModel(model, parentModel) {
    return model ? String(model).substr(parentModel.length + 1) : model
  },
  vjsHelperGetParentModel(model) {
    const parentIndex = String(model).lastIndexOf('.')
    return String(model).substr(0, parentIndex)
  },
  vjsHelperFieldIsRequired(model) {
    if (model) {
      const parentModel = this.vjsHelperGetParentModel(model)
      if (parentModel) {
        return this.vjsFieldsRequired.indexOf(parentModel) !== -1
      }

      return this.vjsFieldsRequired.indexOf(model) !== -1
    }

    return false
  },
  vjsHelperFieldIsArray(key) {
    if (!key) {
      return false
    }

    const schema = this.getVjsFieldSchema(key)
    return schema ? Array.isArray(schema.items) : false
  },
  vjsHelperGetFieldsWithClearOnHide(fields = []) {
    return fields.reduce(
      (models, { children = [], displayOptions = {}, model }) => {
        if (displayOptions.clearOnHide) {
          if (model) {
            // eslint-disable-next-line no-param-reassign
            models[model] = displayOptions.clearOnHide
          } else if (!model && typeof displayOptions.clearOnHide === 'string') {
            // eslint-disable-next-line no-param-reassign
            models[displayOptions.clearOnHide] = displayOptions.clearOnHide
          }
        }

        return {
          ...models,
          ...this.vjsHelperGetFieldsWithClearOnHide(children)
        }
      },
      {}
    )
  },
  vjsHelperCastValueToSchemaType(key, value) {
    if (typeof value !== 'undefined') {
      const { type } = this.getVjsSchema(key)

      if (type === 'number') {
        return Number(value)
      }

      if (type === 'integer') {
        return parseInt(value)
      }

      if (type === 'boolean' && (value === 'true' || value === 'false')) {
        return value === 'true'
      }
    }

    return value
  },
  getVjsFieldsModels(fields) {
    return fields.reduce(
      (models, { children = [], model }) => [
        ...models,
        ...(model && models.indexOf(model) === -1 ? [model] : []),
        ...this.getVjsFieldsModels(children)
      ],
      []
    )
  }
}

export default vjsHelpers
