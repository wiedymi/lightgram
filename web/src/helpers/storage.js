class Storage {
  constructor (storage) {
    this.storage = storage
  }

  get (key) {
    return this.storage.getItem(key)
  }

  set (key, value) {
    return this.storage.setItem(key, value)
  }

  remove (key) {
    return this.storage.removeItem(key)
  }

  clear () {
    this.storage.clear()
  }

  key (index) {
    return this.storage.key(index)
  }

  get length () {
    return this.storage.length
  }
}

export const storage = new Storage(localStorage)
