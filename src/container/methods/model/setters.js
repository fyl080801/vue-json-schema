import { cloneDeep, isEqual } from 'lodash-es'
import {
  EVENT_FIELD_MODEL_UPDATE,
  EVENT_MODEL_UPDATED
} from '../../../constants'

const vjsModelSetters = {
  setVjsFieldModel(value, key) {
    this.vjsBus.emit(EVENT_FIELD_MODEL_UPDATE, {
      key: key || this.vjsFieldModelKey,
      value
    })
  },
  setVjsModel(model, silent = false) {
    if (!isEqual(model, this.vjsModel)) {
      this.vjsModel = cloneDeep(model)
      if (!silent) {
        this.vjsBus.emit(EVENT_MODEL_UPDATED, this.getVjsModel())
      }
    }
  }
}

export default vjsModelSetters
