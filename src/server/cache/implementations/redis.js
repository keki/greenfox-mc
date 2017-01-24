const Redis = require('ioredis');

const port = process.env.npm_package_config_redis_port
const path = process.env.npm_package_config_redis_path

class RedisCache {
    constructor() {
        this.cache = new Redis(port, path);
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

    // redis has an internal increment command but where??? simple values are stringish
    async increment(key, amount) {
        var value = parseInt(await this.get(key), 10);
        if (isNaN(value)) {
            return `${key} is not a number`;
        }
        const newValue = value + amount;
        this.set(key, newValue);
        return newValue;
    }

}

module.exports = RedisCache;
