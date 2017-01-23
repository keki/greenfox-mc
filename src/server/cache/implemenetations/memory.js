class MemoryCache {
    constructor(config) {
        this.cache = {};
    }

    static get deps() {
        return ['config'];
    }

    get(key) {
        const item = this.cache.hasOwnProperty(key);
        return item ? this.cache[item] : null;
    }

    set(key) {

    }

    increment(key, amount) {
        const item = this.get(key);

    }
}

module.exports = MemoryCache;