import {
  EVENT_FIELD_MODEL_VALIDATE,
  EVENT_FIELD_STATE_UPDATE,
  EVENT_MODEL_VALIDATE,
  EVENT_UI_FIELDS_UPDATE
} from '../../../constants'

const vjsValidationSetters = {
  setVjsValidationErrors() {
    this.vjsBus.emit(EVENT_MODEL_VALIDATE, {
      vjsModel: this.getVjsModel(),
      cb: () => {
        const validateRequired = key =>
          new Promise((resolve, reject) => {
            this.vjsBus.emit(EVENT_FIELD_MODEL_VALIDATE, {
              key,
              value: this.getVjsFieldModel(key),
              cb: vjsFieldErrors => {
                const fieldState = this.getVjsFieldState(key)
                this.vjsBus.emit(EVENT_FIELD_STATE_UPDATE, {
                  key,
                  value: {
                    ...fieldState,
                    vjsFieldErrors
                  },
                  cb: () => {
                    resolve()
                  }
                })
              }
            })
          })

        const operations = this.vjsFieldsRequired.map(validateRequired)
        return Promise.all(operations).then(() =>
          this.vjsBus.emit(EVENT_UI_FIELDS_UPDATE)
        )
      }
    })
  }
}

export default vjsValidationSetters
