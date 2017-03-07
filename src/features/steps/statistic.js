'use strict';

import { expect } from 'chai';

export default function () {
  this.When('the request statistic is calculated', async function () {
    const queue = this.container.get('queue');
    const requestStatistic = this.container.get('requeststatistic');
    const queueName = 'request-statistic';

    this.context.promise = new Promise((resolve, reject) => {
      let messageCount = 0;
      const messageHandler = async (message) => {
        await requestStatistic.processMessage(message);
        messageCount += 1;
        const size = await queue.getMessageCount(queueName);
        if (size === 0) {
          resolve(messageCount);
        }
      }
      queue.consume(queueName, messageHandler);
    });

  });
}


