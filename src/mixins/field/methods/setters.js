import {
  EVENT_FIELD_MODEL_UPDATE,
  EVENT_FIELD_STATE_UPDATE
} from '../../../constants'

const setters = {
  setState(value) {
    this.setVjsFieldState(value)
  },
  setModel(value) {
    this.setVjsFieldModel(value)
  },
  setVjsFieldState(value, key) {
    this.vjsBus.emit(EVENT_FIELD_STATE_UPDATE, {
      key: key || this.vjsFieldModelKey,
      value
    })
  },
  setVjsFieldModel(value, key) {
    this.vjsBus.emit(EVENT_FIELD_MODEL_UPDATE, {
      key: key || this.vjsFieldModelKey,
      value
    })
  }
}

export default setters
