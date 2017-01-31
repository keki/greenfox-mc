function Stats() {

    function registerIncomingRequest(url, params, time) { }
    function getStatistic() {
        return {
            totalIncomingRequests: 1
        }
    }

    return {
        registerIncomingRequest,
        getStatistic
    }

}

module.exports = Stats;
