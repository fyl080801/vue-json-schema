import { get } from 'lodash-es'

const vjsSchemaGetters = {
  getVjsFieldSchema(key) {
    if (key) {
      return this.getVjsSchema(key)
    }

    return this.vjsFieldModelKey
      ? this.getVjsSchema(this.vjsFieldModelKey)
      : null
  },
  getVjsSchema(key) {
    if (key) {
      return (
        get(this.vjsSchema.properties, key) || this.getVjsSchemaFallback(key)
      )
    }

    return this.vjsSchema
  },
  getVjsSchemaPath(path, key) {
    const vjsSchema = this.getVjsSchema()

    if (!path) {
      if (vjsSchema.items) {
        return this.getVjsSchemaPath('items')
      }

      return `properties.${key}`
    }

    const schema = get(vjsSchema, path)
    if (schema) {
      if (schema.items instanceof Array) {
        // FIXME: The same schema is used regardless of item's index in the array
        // This limitation is due to that schema prop must be an object and can not be an array

        const arrayPath = this.getVjsSchemaPath(`${path}.items`)
        return this.getVjsSchemaPath(`${arrayPath}.0`)
      } else if (schema.properties instanceof Object) {
        return this.getVjsSchemaPath(`${path}.properties`, key)
      }
    }

    if (!key) {
      return path
    }

    return `${path}.${key}`
  },
  getVjsSchemaFallback(key) {
    const keys = String(key).split('.')
    const schema = keys.reduce(this.getVjsSchemaPath, '')
    return get(this.getVjsSchema(), schema)
  }
}

export default vjsSchemaGetters
