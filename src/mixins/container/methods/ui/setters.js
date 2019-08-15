import { cloneDeep, isEqual } from 'lodash'
import { EVENT_STATE_UPDATED } from '../../../../constants'

const vjsUiSetters = {
  setVjsUiSchema(uiSchema = []) {
    const newVjsUiSchema = uiSchema.reduce(
      (fields, field, index) => [
        ...fields,
        this.vjsHelperGenerateField(field, index)
      ],
      []
    )

    if (!isEqual(newVjsUiSchema, this.vjsUiSchema)) {
      this.vjsUiSchema = cloneDeep(newVjsUiSchema)
      this.setVjsUiFieldsActive()
    }
  },
  setVjsUiFieldsActive() {
    this.vjsFieldsActive = this.getVjsUiFieldsActive(this.vjsUiSchema)
    this.vjsFieldsActiveModels = this.getVjsFieldsModels(this.vjsFieldsActive)

    this.vjsBus.emit(EVENT_STATE_UPDATED, () => {
      this.setVjsFields()
    })
  },
  setVjsFields() {
    this.vjsFields = this.getVjsFields(this.vjsFieldsActive)
  }
}

export default vjsUiSetters
