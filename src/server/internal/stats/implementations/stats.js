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


       let totalIncomingRequests = Object.values(store).reduce((m, value) => m + value, 0)

        return {
            totalIncomingRequests: totalIncomingRequests
        }
    }

    return {
        registerIncomingRequest,
        getStatistic
    }

}

module.exports = Stats;
