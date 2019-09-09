import { cloneDeep, isEqual } from 'lodash-es'

const vjsSchemaSetters = {
  setVjsSchema(value) {
    if (!isEqual(value, this.vjsSchema)) {
      this.vjsSchema = cloneDeep(value)
    }
  }
}

export default vjsSchemaSetters
