
function RequestStatistic(cache, queue, requestmonitor) {

  async function processMessage(message) {
    await cache.increment('totalIncomingRequests', 1);
  }

  async function getStatistics() {
    return {
      totalIncomingRequests: await cache.get('totalIncomingRequests')
    }
  }

  async function recalculate() {
    await cache.flushAll();
    const requests = await requestmonitor.getRequests();
    await Promise.all(
      requests.map(async () => {
        await processMessage();
      })
    );
  }

  return Object.freeze({
    processMessage,
    getStatistics,
    recalculate
  });
}

RequestStatistic.deps = ['cache', 'queue', 'requestmonitor'];

module.exports = RequestStatistic;
