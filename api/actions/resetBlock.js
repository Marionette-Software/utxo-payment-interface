'use strict';
const config = require('../config');

module.exports = {
    params: {
        block_number: "number"
    },
    async handler(ctx) {
        console.log('IN RESET BLOCK !!!!!!!!!!!!!!!!!!!!!!!!!!')
        this.broker.options.latestAnalysedBlock = ctx.params.block_number;
        this.broker.options.lastRequestBlock = ctx.params.block_number;
        this.broker.options.blocksRequest = {};
        return ctx.params.block_number;
    }
}