const CACHE_KEY_NAME = 'maliciousRequests';

function Security(cache, queue) {

  //This can go to an executing task but no idea where it is supposed to live
  async function reportIfMalicious(url, logger) {
    if (url == "/iamahacker") { await logger(url); }
  }

  function processMessage(message) {
    reportIfMalicious(message, (url) => {
      cache.increment(CACHE_KEY_NAME, 1);
    });
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
