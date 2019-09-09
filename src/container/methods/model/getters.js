import { get } from 'lodash-es'

const vjsModelGetters = {
  getVjsFieldModel(key) {
    if (key) {
      return this.getVjsModel(key)
    }

    return this.vjsFieldModelKey
      ? this.getVjsModel(this.vjsFieldModelKey)
      : null
  },
  getVjsModel(key) {
    if (!key || key === true) {
      return this.vjsModel
    }

    return get(this.vjsModel, key)
  }
}

export default vjsModelGetters
