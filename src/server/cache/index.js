function cache(container) {
    const implementation = container.get('config').get(cache.serviceName);
    return container.getImplementation(cache.serviceName, implementation);
}

cache.type = 'factory';
module.exports = cache;