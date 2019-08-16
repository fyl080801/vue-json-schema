import {
  EVENT_FIELD_MODEL_CLEAR_HIDDEN,
  EVENT_FIELD_MODEL_UPDATE,
  EVENT_FIELD_MODEL_VALIDATE,
  EVENT_FIELD_STATE_UPDATE,
  EVENT_MODEL_UPDATE,
  EVENT_MODEL_UPDATED,
  EVENT_MODEL_VALIDATE,
  EVENT_STATE_UPDATE,
  EVENT_STATE_UPDATED,
  EVENT_UI_FIELDS_UPDATE
} from '../../constants'

const data = () => ({
  vjsBus: {},
  vjsEvents: [
    EVENT_FIELD_MODEL_CLEAR_HIDDEN,
    EVENT_FIELD_MODEL_UPDATE,
    EVENT_FIELD_MODEL_VALIDATE,
    EVENT_FIELD_STATE_UPDATE,
    EVENT_MODEL_UPDATE,
    EVENT_MODEL_UPDATED,
    EVENT_MODEL_VALIDATE,
    EVENT_STATE_UPDATE,
    EVENT_STATE_UPDATED,
    EVENT_UI_FIELDS_UPDATE
  ],
  vjsFields: [],
  vjsFieldsActive: [],
  vjsFieldsRequired: [],
  vjsModel: {},
  vjsOptions: {
    allowInvalidModel: true,
    ajv: {
      keywords: {},
      locale: null,
      options: {
        allErrors: true
      }
    },
    castToSchemaType: false,
    showValidationErrors: false,
    validate: true,
    validateOnLoad: true,
    validateOnChange: true,
    valueProp: 'value'
  },
  vjsSchema: {},
  vjsState: {},
  vjsUiSchema: []
})

export default data
