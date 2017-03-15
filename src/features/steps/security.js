'use strict';

import { expect } from 'chai';

const EXCHANGE_NAME = 'requests';
const QUEUE_NAME = 'security-log';

export default function () {

  this.Given('security monitoring is initialized', function () {
    const queue = this.container.get('queue');
    queue.bind(EXCHANGE_NAME, QUEUE_NAME);
  });

  this.When('the security check is performed', async function () {
    const queue = this.container.get('queue');
    const security = this.container.get('security');

    const messageHandler = async (message) => {
      await security.processMessage(message);
    }

    this.context.promise = this.tools.getConsumePromise(queue, QUEUE_NAME, messageHandler);
  });

  this.Then('I see "$value" for key "$key" in security statistics', async function (value, key) {
    const security = this.container.get('security');
    const result = await security.getStatistics();
    expect(result[key]).to.eql(parseInt(value));
  });

 }


