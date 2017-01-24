/*global describe,beforeAll,expect,it */
"use strict";

import MemoryCache from './memory'

describe('cache-memory', function() {

	let memory;

	beforeAll (function() {
		memory = new MemoryCache();
	});

	it('should get null if cache is empty', function() {
		expect(memory.get("foo")).toBe(null);
	});

	it('should set value', function() {
		expect(memory.set("foo", "bar")).toBe("bar");
	});

	it('should get value previously set', function() {
		memory.set("foo", "bar");
		expect(memory.get("foo")).toBe("bar");
	});

	it('should update pre-existing value with new value', function() {
		memory.set("foo", "bar");
		memory.set("foo", "baz");
		expect(memory.get("foo")).toBe("baz");
	});

	it('should be able to increment numeric values', function() {
		memory.set("foo", 1);
		memory.increment("foo", 2);
		expect(memory.get("foo")).toBe(3);
	});

	it('should not be able to increment non-numeric values', function() {
		memory.set("foo", "bar");
		expect(() => {
			memory.increment("foo", 2)
		}).toThrowError("foo is not a number");
	});
});
