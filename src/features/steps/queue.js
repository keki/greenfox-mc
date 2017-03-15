'use strict';

import { expect } from 'chai';

export default function () {
  this.When('I publish "$message" message to queue "$queueName"', async function (message, queueName) {
    const queue = this.container.get('queue');
    await queue.publishToQueue(queueName, message);
  });

  this.Then('"$queueName" queue contains "$count" message', async function(queueName, count) {
    const queue = this.container.get('queue');
    const size = await queue.getMessageCount(queueName);
    expect(size).to.be.eql(parseInt(count));
  });

  this.When('A process consume the queue "$queueName"', async function (queueName) {
    const queue = this.container.get('queue');
    this.context.promise = this.tools.getConsumePromise(queue, queueName, ()=>{});
  });

  this.Then('I see "$count" processed message', async function(count) {
    const messageCount = await this.context.promise;
    expect(messageCount).to.be.eql(parseInt(count));
  });

  this.Given('I bind "$queueName" to exchange "$exchangeName"', async function (queueName, exchangeName) {
    const queue = this.container.get('queue');
    await queue.bind(exchangeName, queueName);
  });

  this.When('I publish "$message" message to exchange "$exchangeName"', async function (message, exchangeName) {
    const queue = this.container.get('queue');
    await queue.publish(exchangeName, message);
  });

}
