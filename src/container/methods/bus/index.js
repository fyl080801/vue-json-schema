import Minibus from 'minibus'
import { isEqual, set } from 'lodash-es'
import {
  EVENT_FIELD_MODEL_CLEAR_HIDDEN,
  EVENT_FIELD_MODEL_UPDATE,
  EVENT_FIELD_MODEL_VALIDATE,
  EVENT_FIELD_STATE_UPDATE,
  EVENT_MODEL_UPDATED,
  EVENT_MODEL_VALIDATE,
  EVENT_STATE_UPDATE,
  EVENT_STATE_UPDATED,
  EVENT_UI_FIELDS_UPDATE,
  EXTERNAL_EVENT_CHANGE,
  EXTERNAL_EVENT_STATE_CHANGE,
  EXTERNAL_EVENT_VALIDATED
} from '../../../constants'

const vjsBus = {
  addVjsListener(event, callback) {
    this.vjsBus.on(event, value => callback(event, value))
  },
  addVjsListeners(events = [], callback) {
    events.forEach(event => this.addVjsListener(event, callback))
  },
  removeVjsListener(event) {
    this.vjsBus.off(event)
  },
  removeVjsListeners(events = []) {
    events.forEach(this.removeVjsListener)
  },
  removeVjsListenersAll() {
    this.vjsBus.off()
  },
  vjsBusEventHandler(event, payload) {
    const eventActions = {
      [EVENT_FIELD_MODEL_CLEAR_HIDDEN]: () => {
        const allModels = this.vjsHelperGetFieldsWithClearOnHide(this.uiSchema)
        const activeModels = this.vjsHelperGetFieldsWithClearOnHide(
          this.vjsFieldsActive
        )

        const inactiveModels = Object.keys(allModels).reduce((models, key) => {
          if (!(key in activeModels)) {
            // eslint-disable-next-line no-param-reassign
            models[key] = allModels[key]
          }

          return models
        }, {})

        Object.keys(inactiveModels).forEach(key => {
          const clearModels = inactiveModels[key]
          if (Array.isArray(clearModels)) {
            clearModels.forEach(clearModel => {
              const newModel = this.vjsHelperApplyFieldModel(
                typeof clearModel === 'string' ? clearModel : key,
                undefined
              )
              this.setVjsModel(newModel, true)
            })
          } else {
            const newModel = this.vjsHelperApplyFieldModel(
              typeof clearModels === 'string' ? clearModels : key,
              undefined
            )
            this.setVjsModel(newModel, true)
          }
        })
      },
      [EVENT_FIELD_MODEL_VALIDATE]: ({ key, value, cb }) => {
        const vjsModel = this.vjsHelperApplyFieldModel(key, value)

        this.vjsBus.emit(EVENT_MODEL_VALIDATE, {
          vjsModel,
          cb: () => {
            const model = {}
            set(model, key, value)

            const schema = {
              type: 'object',
              required: this.vjsHelperFieldIsRequired(key) ? [key] : [],
              properties: {
                [key]: this.getVjsSchema(key) || {}
              }
            }

            const errors = this.getVjsValidationErrors(model, schema)

            if (cb && typeof cb === 'function') {
              cb(errors)
            }
          }
        })
      },
      [EVENT_FIELD_MODEL_UPDATE]: ({ key, value: originalValue, cb }) => {
        let value = originalValue

        const { castToSchemaType = false } = this.vjsOptions
        if (castToSchemaType) {
          value = this.vjsHelperCastValueToSchemaType(key, value)
        }

        this.vjsBus.emit(EVENT_FIELD_MODEL_VALIDATE, {
          key,
          value,
          cb: errors => {
            const vjsFieldModel = this.getVjsFieldModel(key)
            const newFieldState = Object.assign(
              {},
              this.getVjsFieldState(key),
              {
                vjsFieldDirty: !isEqual(vjsFieldModel, value),
                vjsFieldErrors: errors
              }
            )
            this.setVjsFieldState(newFieldState, key)

            if (
              !errors ||
              (errors && errors.length === 0) ||
              this.vjsOptions.allowInvalidModel
            ) {
              const newModel = this.vjsHelperApplyFieldModel(key, value)
              this.setVjsModel(newModel)
            }

            if (cb && typeof cb === 'function') {
              cb(errors)
            }
          }
        })
      },
      [EVENT_FIELD_STATE_UPDATE]: ({ key, value, cb }) => {
        this.vjsBus.emit(EVENT_STATE_UPDATE, {
          key,
          value,
          cb
        })
      },
      [EVENT_MODEL_VALIDATE]: ({ vjsModel, cb }) => {
        const vjsErrors = this.getVjsValidationErrors(vjsModel)

        this.vjsBus.emit(EVENT_STATE_UPDATE, {
          key: 'vjsErrors',
          value: vjsErrors,
          cb: () => {
            const vjsState = this.getVjsState()
            this.$emit(
              EXTERNAL_EVENT_VALIDATED,
              vjsState.vjsErrors.length === 0
            )

            if (cb && typeof cb === 'function') {
              cb(vjsErrors)
            }
          }
        })
      },
      [EVENT_UI_FIELDS_UPDATE]: () => {
        this.setVjsUiFieldsActive()
      },
      [EVENT_MODEL_UPDATED]: () => {
        this.vjsBus.emit(EVENT_UI_FIELDS_UPDATE)

        this.vjsBus.emit(EVENT_FIELD_MODEL_CLEAR_HIDDEN)

        this.$emit(EXTERNAL_EVENT_CHANGE, this.getVjsModel())
      },
      [EVENT_STATE_UPDATE]: ({ key, value, cb }) => {
        const newVjsState = Object.assign({}, this.getVjsState(), {
          [key]: value
        })

        this.setVjsState(newVjsState)

        if (cb && typeof cb === 'function') {
          cb()
        }
      },
      [EVENT_STATE_UPDATED]: cb => {
        const vjsState = {
          vjsErrors: [],
          vjsFieldsActive: this.vjsFieldsActive,
          vjsFieldsActiveModels: this.vjsFieldsActiveModels,
          ...this.getVjsState()
        }

        this.$emit(EXTERNAL_EVENT_STATE_CHANGE, vjsState)

        if (cb && typeof cb === 'function') {
          cb()
        }
      }
    }

    if (event && event in eventActions) {
      eventActions[event](payload)
    }
  },
  vjsBusInitialize() {
    this.vjsBus = Minibus.create()
  }
}

export default vjsBus
