
function RequestStatistic(cache, queue) {

  async function processMessage(message) {
    await cache.increment('totalIncomingRequests', 1);
  }

  return Object.freeze({
    processMessage
  });
}

RequestStatistic.deps = ['cache', 'queue'];

module.exports = RequestStatistic;
