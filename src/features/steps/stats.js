'use strict';

import { expect } from 'chai';

export default function () {
    this.When('I make a request', async function () {
        const stats = this.container.get('stats');
        let url, params, time;
        await stats.registerIncomingRequest(url, params, time);
    });

    this.Then('I see totalIncomingRequests increases to "$value"', async function (total) {
        const stats = this.container.get('stats');
        let statistics = await stats.getStatistic();
        expect(parseInt(total, 10)).to.eql(statistics.totalIncomingRequests);
    });

};
