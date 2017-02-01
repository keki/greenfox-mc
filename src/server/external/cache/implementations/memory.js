'use strict'

import _ from 'lodash';
import validate from '../../../lib/validate';
import VError from 'verror';

function MemoryCache () {
  let cache = {};

  function get(key, defaultValue) {
    return _.isUndefined(cache[key]) ? defaultValue : cache[key];
  }

  function increment(key, amount) {
    validate.string(
      key,
      new VError(`[Cache] You have to use string as a key, got "${key}" (${typeof key})`)
    );
    validate.number(
      amount,
      new VError(
        `[Cache] Can not increment key "${key}" with not a number value: ${amount}`
      )
    );
    cache[key] = get(key, 0) + amount;
  }

  function flushAll() {
    cache = {};
  }

  function reduce(callback, accumulator) {
    return _.reduce(cache, callback, accumulator);
  }

  return Object.freeze({
    get: get,
    increment,
    flushAll,
    reduce
  });
}

module.exports = MemoryCache;
