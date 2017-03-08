'use strict';

import { expect } from 'chai';

export default function () {
  this.When('the request statistic is calculated', async function () {
    const queue = this.container.get('queue');
    const requestStatistic = this.container.get('requeststatistic');
    const queueName = 'request-statistic';

    const messageHandler = async (message) => {
      await requestStatistic.processMessage(message);
    }

    this.context.promise = this.tools.getConsumePromise(queue, queueName, messageHandler);
  });
}


