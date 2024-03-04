'use strict';
const config = require('../config');

module.exports = {
    params: {
        address: 'string',
        currencyId: {
            type: 'string',
            optional: true
        }
    },
    async handler(ctx) {
        return {
            address: `Address (${config.client.network}): ${ctx.params.address}`,
            encodedAddress: ctx.params.address,
            redirectUrl: '',
        };
    },
}