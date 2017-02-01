const KEY = 'totalIncomingRequests';

function Stats(cache) {

    function registerIncomingRequest(/*url, params, time*/) {
        cache.increment(KEY, 1)
    }

    function getStatistic() {
        return {
            [KEY]: cache.get(KEY, 0)
        }
    }

    return Object.freeze({
        registerIncomingRequest,
        getStatistic
    })

}

Stats.deps = ['cache'];
module.exports = Stats;
