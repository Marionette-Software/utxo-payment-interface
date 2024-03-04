'use strict';
const config = require('../config');

module.exports = {
    params: {
        address: 'string',
        contractAddress: {
            type: 'string',
            optional: true
        }
    },
    async handler(ctx) {
        try {
            // const { precision } = this.broker.options.coin;
            const balance = await this.broker.options.blockchainClient.getBalance();
            // return Math.floor(balance * Math.pow(10, precision)) / Math.pow(10, precision);
            console.log('BALANCE', balance);
            return balance;
        } catch (err) {
            throw new ServiceNotFoundError('Cannot get balance', 404, 'SERVICE_NOT_FOUND', { error: err.message });
        }
    },
}
