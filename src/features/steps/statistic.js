'use strict';

import { expect } from 'chai';

const EXCHANGE_NAME = 'requests';
const QUEUE_NAME = 'request-statistic';

export default function () {

  this.Given('request statistics is initialized', function () {
    const queue = this.container.get('queue');
    queue.bind(EXCHANGE_NAME, QUEUE_NAME);
  });

  this.When('the request statistic is calculated', async function () {
    const queue = this.container.get('queue');
    const requestStatistic = this.container.get('requeststatistic');

    const messageHandler = async (message) => {
      await requestStatistic.processMessage(message);
    }

    this.context.promise = this.tools.getConsumePromise(queue, QUEUE_NAME, messageHandler);
  });

  this.When('the system recalculate the requests', async function () {
    const requestStatistic = this.container.get('requeststatistic');
    await requestStatistic.recalculate();
  });

  this.Then('I see "$value" for "$key" in the statistics', async function(value, key) {
    const requestStatistic = this.container.get('requeststatistic');
    const result = await requestStatistic.getStatistics();
    expect(result[key]).to.eql(parseInt(value));
  });

 }


