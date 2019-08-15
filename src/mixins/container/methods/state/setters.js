import { isEqual } from 'lodash'
import {
  EVENT_FIELD_STATE_UPDATE,
  EVENT_STATE_UPDATED
} from '../../../../constants'

const vjsStateSetters = {
  setVjsFieldState(value, key) {
    this.vjsBus.emit(EVENT_FIELD_STATE_UPDATE, {
      key: key || this.vjsFieldModelKey,
      value
    })
  },
  setVjsState(state) {
    if (!isEqual(state, this.getVjsState())) {
      this.vjsState = Object.assign({}, this.getVjsState(), state)
      this.vjsBus.emit(EVENT_STATE_UPDATED, () => {
        this.setVjsFields()
      })
    }
  }
}

export default vjsStateSetters
