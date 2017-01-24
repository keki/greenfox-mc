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
    async increment(key, amount = 1) {
        return this.cache.incrby(key, amount).then(function (error) {
            if (error) {
                return 'type mismatch'
            } else {
                key + 1
            }
        });
    }

}

module.exports = RedisCache;
