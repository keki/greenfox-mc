'use strict'

import _ from 'lodash';
import validate from '../../../lib/validate';
import VError from 'verror';

function MemoryQueue () {
  let queue = {};
  let exchanges = {};

  function getMessageCount(queueName) {
    return Promise.resolve(queue[queueName].length);
  }

  function remove(queueName) {
    delete queue[queueName];
  }

  function publishToQueue(queueName, message) {
    if (!queue.hasOwnProperty(queueName)) {
      queue[queueName] = [];
    }
    queue[queueName].push(message);
  }

  function publish(exchangeName, message) {
    if (!exchanges.hasOwnProperty(exchangeName)) {
      exchanges[exchangeName] = [];
    }
    exchanges[exchangeName].forEach((queueName) => {
      publishToQueue(queueName, message);
    });
  }

  function consume(queueName, callback) {
    async function handleMessages() {
      const message = queue[queueName].shift();
      if (!message) {
        return false;
      }
      await callback(message);
      handleMessages();
    }
    process.nextTick(()=>handleMessages(queueName, callback));
    return true;
  }

  function bind(exchangeName, queueName) {
    if (!exchanges.hasOwnProperty(exchangeName)) {
      exchanges[exchangeName] = [];
    }
    if (!exchanges[exchangeName].includes(queueName)) {
      exchanges[exchangeName].push(queueName);
    }
  }

  return Object.freeze({
    publish,
    publishToQueue,
    consume,
    bind,
    remove,
    getMessageCount
  });
}

module.exports = MemoryQueue;
