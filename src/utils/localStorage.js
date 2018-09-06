import isPlainObject from './isPlainObject'

function getKey(key) {
  if (typeof key === 'symbol') {
    return key.toString()
  }
  return key
}

export const saveStr = (key, value) => {
  if (!key) {
    throw new Error('key can not be undefined')
  }
  localStorage.setItem(getKey(key), value)
}

export const saveObject = (key, obj) => {
  if (!isPlainObject(obj)) {
    throw new Error('value must be a plain object')
  }
  this.saveStr(getKey(key), JSON.stringify(obj))
}

export const getStr = key => {
  if (!key) {
    throw new Error('key can not be undefined')
  }

  return localStorage.getItem(getKey(key))
}

export const getObject = key => {
  const objStr = this.getStr(getKey(key))
  return JSON.parse(objStr)
}
