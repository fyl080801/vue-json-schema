import { get } from 'lodash-es'

const vjsStateGetters = {
  getVjsState(key) {
    if (key) {
      return get(this.vjsState, key)
    }

    return this.vjsState
  },
  getVjsFieldState(key) {
    if (key) {
      return this.getVjsState(key)
    }

    return this.vjsFieldModelKey
      ? this.getVjsState(this.vjsFieldModelKey)
      : null
  }
}

export default vjsStateGetters
