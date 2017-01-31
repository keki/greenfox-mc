'use strict';

function Stats(container) {
  const implementation = container.get('config').get(Stats.serviceName);
  return container.getImplementation(Stats.serviceName, 'stats');
}

Stats.type = 'factory';
module.exports = Stats;
