import { isNumber } from 'lodash'

const Redis = require('ioredis');

class RedisCache {
    constructor() {
        this.cache = new Redis(6379, '127.0.0.1');
    }

    async get(key) {
        return this.cache.get(key);
    }

    async set(key, value) {
        return this.cache.set(key, value).then(function (result) {
            if (result === 'OK') {
                return value;
            }
        });
    }

    // redis has an internal increment command but where??? everything is stringish
    async increment(key, amount) {
        var value = parseInt(await this.get(key), 10);
        if (!isNumber(value)) {
            throw new Error(`${value} is not a number`)
        }
        const newValue = value + amount;
        this.set(key, newValue);
        return newValue;
    }

}

module.exports = RedisCache;
