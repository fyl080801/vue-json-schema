const props = {
  vjsBus: {
    type: Object,
    required: true
  },
  vjsChildren: {
    type: Array,
    default: () => []
  },
  vjsChildrenUiSchema: {
    type: Array,
    default: () => []
  },
  vjsComponent: {
    type: [String, Object, Function]
  },
  vjsFieldErrorHandler: {
    type: Boolean
  },
  vjsFieldErrorOptions: {
    type: Object
  },
  vjsFieldErrors: {
    type: Array
  },
  vjsFieldId: {
    type: String,
    required: true
  },
  vjsFieldModel: {
    type: null
  },
  vjsFieldModelKey: {
    type: [String, Boolean],
    required: true
  },
  vjsFieldOptions: {
    type: Object,
    required: true
  },
  vjsFieldRequired: {
    type: Boolean,
    required: true
  },
  vjsFieldSchema: {
    type: Object,
    required: true
  },
  vjsFieldSchemas: {
    type: Object
  },
  vjsFieldState: {
    type: Object,
    required: true
  },
  vjsFieldTag: {
    type: String,
    default: 'div'
  },
  vjsFieldUiSchema: {
    type: Object,
    required: true
  },
  vjsFieldValueProp: {
    type: String
  },
  vjsOptions: {
    type: Object,
    required: true
  },
  vjsModel: {
    type: Object,
    required: true
  },
  vjsState: {
    type: Object,
    required: true
  }
}

export default props
