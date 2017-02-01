function Stats(cache) {

    function registerIncomingRequest(url, /*params, time*/) {
        cache.increment(url, 1)
    }

    function getStatistic() {
        return {
            totalIncomingRequests: cache.reduce((result, value) => result + value, 0)
        }
    }

    return Object.freeze({
        registerIncomingRequest,
        getStatistic
    })

}

Stats.deps = ['cache'];
module.exports = Stats;
