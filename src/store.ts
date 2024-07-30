interface StoreParams {
  expiry: number
}
export class Store {
  static prefix = '_storage'
  key: string
  expiry: number
  constructor(key: string, { expiry = -1 }: StoreParams = { expiry: -1 }) {
    this.key = key
    this.expiry = Number(expiry)
  }

  get storageKey() {
    return this.key + Store.prefix
  }

  get expiryKey() {
    return `_expiry${Store.prefix}`
  }

  get value() {
    const value = localStorage.getItem(this.storageKey)
    let data
    if (value === null) {
      data = value
    } else {
      data = JSON.parse(value)
    }
    // 过期时间为-1
    if (
      data?.[this.expiryKey] &&
      data?.[this.expiryKey] !== -1 &&
      Date.now() > data?.[this.expiryKey]
    ) {
      this.remove()
      return null
    } else {
      return data?.value !== undefined ? data.value : data
    }
  }

  set value(value) {
    let _value
    try {
      _value = JSON.stringify({
        value,
        [this.expiryKey]: this.expiry === -1 ? -1 : Date.now() + this.expiry,
      })
    } catch {
      _value = value
    }
    localStorage.setItem(this.storageKey, _value)
  }

  remove() {
    localStorage.removeItem(this.storageKey)
    return this
  }
}
