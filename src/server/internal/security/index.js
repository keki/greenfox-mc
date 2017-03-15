const CACHE_KEY_NAME = 'maliciousRequests';

function Security(cache, queue) {

  async function processMessage(message) {
    if (message == "/iamahacker") {
      await cache.increment(CACHE_KEY_NAME, 1);
    }
  }

  async function getStatistics() {
    return {
      maliciousRequests: await cache.get(CACHE_KEY_NAME)
    }
  }

  return Object.freeze({
    processMessage,
    getStatistics
  });
}

Security.deps = ['cache', 'queue'];

module.exports = Security;
