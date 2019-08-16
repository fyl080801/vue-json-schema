import { callbackify } from 'util'

export const toInt = val => {
  return parseInt(val.toString())
}

export const toStr = val => {
  return val.toString()
}

export default (val, type) => {
  switch (type) {
    case 'number':
      return toInt(val)
    case 'string':
    default:
      return toStr(val)
  }
}
