'use strict';
const config = require('../config');

module.exports = {
    async handler(ctx) {
        try {
            const lastHeight = await this.broker.options.blockchainClient.getBlockCount();
            if (lastHeight > this.broker.options.latest) {
                await ctx.call("blockchainRegistry.setLastHeight", {lastHeight, blockchainId: config.id});
                this.broker.options.latest = lastHeight;
            }
        } catch (err) {
            console.log('ERROR while receive last height', err.message);
            if (err.message === 'ETIMEDOUT') {
                process.exit(1);
            }
        }
    },
}
