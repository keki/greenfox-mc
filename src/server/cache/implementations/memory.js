import { isNumber } from 'lodash'

class MemoryCache {
    constructor() {
        this.cache = {};
    }

    get(key) {
        const exists = this.cache.hasOwnProperty(key);
        return exists ? this.cache[key] : null;
    }

    set(key, value) {
        this.cache[key] = value;
        return value;
    }

    increment(key, amount) {
        const value = this.get(key);
        if (!isNumber(value)) {
            throw new Error(`${key} is not a number`)
        }
        const newValue = value + amount;
        this.set(key, newValue);
        return newValue;
    }
}

module.exports = MemoryCache;
