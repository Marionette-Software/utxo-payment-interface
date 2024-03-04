'use strict';
const config = require('../config');
const timeout = require('../timeout').timeout;

module.exports = {
  async handler(ctx) {
    const { maxRequestBlocks } = this.broker.options;
    while (true) {
      let latest = this.broker.options.latest;
      let lastRequestBlock = this.broker.options.lastRequestBlock;
      if (lastRequestBlock >= latest - config.minConfirmations) {
        console.log('TOP OF BLOCKCHAIN REACHED', latest);

        await timeout(config.waitConfirmationTimeout);
        this.broker.call(`${config.id}.blockSequence`);
        return;
      } else {
        if (Object.keys(this.broker.options.blocksRequest).length >= maxRequestBlocks) {
          console.log('MAX LIMIT REQUEST BLOCKS REACHED', lastRequestBlock);
          await timeout(100);

          return this.broker.call(`${config.id}.blockSequence`);
        } else {
          this.broker.options.blocksRequest[lastRequestBlock] = {};
          console.log('REQUEST block#', lastRequestBlock);
          ctx.call(`${config.id}.blockRequest`, { blockNumber: lastRequestBlock });
          this.broker.options.lastRequestBlock = lastRequestBlock + 1;
        }
      }
    }
    return;
  },
};
