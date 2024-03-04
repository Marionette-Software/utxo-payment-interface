'use strict';
const config = require('../config');

module.exports = {
    params: {
        blockNumber: "number",
        requestCount: {
            type: "number",
            optional: true
        }
    },
    async handler(ctx) {
        console.log('START REQUEST', ctx.params.blockNumber);
        const requestCount = Number(ctx.params.requestCount) || 0;
        if (requestCount > 10) {
            process.exit(408);
        }
        let block;
        const _self = this;
        let transactions = [];
        if (this.broker.options.blocksRequest[ctx.params.blockNumber]) {
            try {
                const blockHash = await this.broker.options.blockchainClient.getBlockHash(ctx.params.blockNumber);
                if (!config.limitedVerbose) {
                    block = await this.broker.options.blockchainClient.getBlock(blockHash, 2);
                    transactions = block.tx;
                } else {
                    block = await this.broker.options.blockchainClient.getBlock(blockHash, true);
                    transactions = block.tx ? await Promise.all(block.tx.map(async txHash => {
                        try {
                            const trans = await _self.broker.options.blockchainClient.getRawTransaction(txHash, 1);
                            return trans;
                        } catch(err) {
                            console.log(`ERROR GET RAW TRANSACTION txid=${blockHash}`, err.message);
                        }
                        return;
                        // return _self.broker.options.blockchainClient.getRawTransaction(txHash, 1)
                    })) : [];
                }
            } catch(err) {
                console.log('ERROR GET BLOCK HASH', requestCount, err.message);
                await ctx.call(`${config.id}.blockRequest`, {blockNumber: ctx.params.blockNumber, requestCount: requestCount + 1});
                // if (err.message === 'ETIMEDOUT') {
                // //     process.exit(1);
                // }
                return;
            }
        }
        if (this.broker.options.blocksRequest && this.broker.options.blocksRequest[ctx.params.blockNumber]) {
            this.broker.options.blocksRequest[ctx.params.blockNumber] = {
                received: true,
                transactions: transactions.filter(el => el)
            };
        }
        console.log('GET BLOCK HASH for block#', ctx.params.blockNumber, 'LAST ANALYSED', this.broker.options.latestAnalysedBlock, 'LATEST', this.broker.options.latest);
        return;
    }
}
