'use strict';

function Stats(container) {
  return container.getImplementation(Stats.serviceName, 'stats');
}

Stats.type = 'factory';
module.exports = Stats;
