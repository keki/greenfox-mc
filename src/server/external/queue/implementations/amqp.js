'use strict';
import VError from 'verror';
import {first} from '../../../lib/async';
import {handleMessage, encode} from '../lib/message';

function AMQP() {
  const open = require('amqplib').connect('amqp://localhost');
  let channel;

  async function createChannel() {
    const conn = await open.then((conn)=> conn);
    return await conn.createChannel();
  }

  async function getChannel() {
    const create = async () => await createChannel();
    return await first([() => channel, create]);
  }

  async function getMessageCount(queueName) {
    const channel = await getChannel();
    const info = await channel.assertQueue(queueName);
    return info.messageCount;
  }

  async function remove(queueName) {
    const channel = await getChannel();
    await channel.assertQueue(queueName);
    return channel.deleteQueue(queueName);
  }

  async function publishToQueue(queueName, message) {
    const channel = await getChannel();
    await channel.assertQueue(queueName);
    return channel.sendToQueue(queueName, encode(message));
  }

  async function publish(exchangeName, message) {
    const channel = await getChannel();
    await channel.assertExchange(exchangeName, 'fanout', {durable: false});
    return channel.publish(exchangeName, '', message);
  }

  async function consume(queueName, callback) {
    const channel = await getChannel();
    await channel.assertQueue(queueName);
    channel.prefetch(1);
    return channel.consume(queueName, handleMessage(channel, callback));
  }

  async function bind(exchangeName, queueName) {
    const channel = await getChannel();
    await channel.assertExchange(exchangeName, 'fanout', {durable: false});
    return channel.assertQueue(queueName, {exclusive: true}, function (error, q) {
      channel.bindQueue(q.queue, exchangeName, '');
    });
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

module.exports = AMQP;
