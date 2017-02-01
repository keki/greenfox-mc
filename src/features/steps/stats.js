'use strict';

import { expect } from 'chai';

export default function () {
    this.When('I make "$num" requests', async function (num) {
        const stats = this.container.get('stats');
        const requests = parseInt(num, 10);
        let url, params, time;
        for (let i = 0; i < requests; i++) {
            await stats.registerIncomingRequest(url, params, time);
        }
    });

    this.Then('I see totalIncomingRequests increases to "$value"', async function (total) {
        const stats = this.container.get('stats');
        let statistics = await stats.getStatistic();
        expect(parseInt(total, 10)).to.eql(statistics.totalIncomingRequests);
    });
}
