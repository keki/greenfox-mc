'use strict';

import { expect } from 'chai';

export default function () {
  this.When('the system get an Incoming request', async function () {
    const monitor = this.container.get('requestmonitor');
    await monitor.registerIncomingRequest('url');
  });

  this.When('the system get an Incoming request with an url "$url"', async function (url) {
    const monitor = this.container.get('requestmonitor');
    await monitor.registerIncomingRequest(url);
  });

 this.Then('I see "$value" request in the database', async function(value) {
    const monitor = this.container.get('requestmonitor');
    const result = await monitor.getRequests();
    expect(result.length).to.eql(parseInt(value));
  });

}
