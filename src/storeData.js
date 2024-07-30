import { Store } from './store'

export class StoreData {
  constructor(key, { expiry = -1 } = { expiry: -1 }) {
    this.expiry = Number(expiry)
    this.storage = new Store(`${key}_storeData`, {
      expiry,
    })
    this.getValue()
  }

  getValue() {
    const data = this.storage.value
    if (!isPlainObject(data)) {
      this.storage.value = {}
    }
    return data
  }

  getItem(key) {
    const data = this.getValue()
    return key ? data[key] : data
  }

  setItem(key, value) {
    let data = this.getValue()
    if (key && value !== undefined) {
      data[key] = value
    } else if (isPlainObject(key)) {
      data = key
    }
    this.storage.value = data
  }

  removeItem(key) {
    if (key === undefined) {
      this.storage.value = {}
    } else {
      const data = this.getValue()
      delete data[key]
      this.storage.value = data
    }
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
