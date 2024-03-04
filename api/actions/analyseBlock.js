'use strict';
const config = require('../config');

module.exports = {
    async handler(ctx) {
        try {
            const { latestAnalysedBlock, coin } = this.broker.options;
            const currentBlock = latestAnalysedBlock + 1;
            console.log('ANALYSE BLOCK', currentBlock);
            if (this.broker.options.blocksRequest[currentBlock] && this.broker.options.blocksRequest[currentBlock].received) {
                await Promise.all(this.broker.options.blocksRequest[currentBlock].transactions.map(async tx => {
                    if (tx.vout && Array.isArray(tx.vout)) {
                        return await Promise.all(tx.vout.map(async vout => {
                            if (vout.value > 0 && vout.scriptPubKey) {
                                if (vout.scriptPubKey.address) {
                                    await ctx.call('paymentGateway.processTransaction', {
                                        txid: tx.txid,
                                        amount: Number(vout.value),
                                        paymentInterfaceId: config.id,
                                        currencyId: coin?.currencyId || '',
                                        address: vout.scriptPubKey.address,
                                        addressFrom: ''
                                    });
                                } else if (vout.scriptPubKey.addresses) {
                                    await ctx.call('paymentGateway.processTransaction', {
                                        txid: tx.txid,
                                        amount: Number(vout.value),
                                        paymentInterfaceId: config.id,
                                        currencyId: coin?.currencyId || '',
                                        address: vout.scriptPubKey.addresses[0],
                                        addressFrom: ''
                                    });
                                }
                            }
                            return;
                        }));
                    }
                    return;
                }));
                this.broker.options.latestAnalysedBlock = currentBlock;
                await ctx.call('blockchainRegistry.setHeight', {blockchainId: config.id, height: currentBlock});
                delete this.broker.options.blocksRequest[currentBlock];
                ctx.call(`${config.id}.analyseBlock`);
            } else {
                setTimeout(() => {
                    return ctx.call(`${config.id}.analyseBlock`);
                }, 10000);
            }
        } catch(err) {
            console.log('ERROR in ANALYSE BLOCK', err.message);
            setTimeout(() => {
                return ctx.call(`${config.id}.analyseBlock`);
            }, 10000);
        }
        return;
    }
}