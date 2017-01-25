import 'babel-polyfill';
import register from 'ignore-styles'

register(['.scss']);
const tools = require('./tools');

export default function() {
  this.World = World;
};

function World() {
  this.context = {};
  this.tools = tools;
  this.container = require('../../client/container');
  this.server = require('../../server/container');
  extendContainer.call(this);
  setupConfig(this.container.get('config'));
}

function setupConfig(config) {
  config.update('cache', 'cache-memory');
}

function extendContainer() {
  this.container.extend(this.server.default);
}
