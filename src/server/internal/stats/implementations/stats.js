function Stats() {

    const store = {}

    function registerIncomingRequest(url, params, time) {
        if (store[url]) {
            store[url] += 1;
        } else {
            store[url] = 1
        }
    }

    function getStatistic() {
        return {
            totalIncomingRequests: Object.values(store).reduce((m, value) => m + value, 0)
        }
    }

    return Object.freeze({
        registerIncomingRequest,
        getStatistic
    })

}

module.exports = Stats;
