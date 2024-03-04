'use strict';
const config = require('../config');

module.exports = {
    params: {
        contractAddress: {
            type: 'string',
            optional: true
        },
        amount: 'string',
        gasPrice: {
            type: 'number',
            optional: true
        },
        addressFrom: 'string',
        addressFromSecret: {
            type: 'string',
            optional: true
        },
        addressTo: 'string',
    },
    async handler(ctx) {
        console.log('PARAMS TRANSFER', ctx.params);
        const { amount, addressTo } = ctx.params;
        let addressSend = addressTo;
        try {
            const addressToParse = JSON.parse(addressTo);
            addressSend = addressToParse.address;
        } catch(err) {
            console.log(`${addressTo} is not recipient address`);
        }
        const coin = this.broker.options.coin;
        let balance = await this.broker.options.blockchainClient.getBalance();
        // balance = Math.floor(balance * Math.pow(10, coin.precision)) / Math.pow(10, coin.precision);
        if (balance < amount) {
            return {error: `Transfer from ${addressFrom} = ${amount} (balance = ${balance})`};
        }
        let txid;
        let tx;
        try {
            txid = await this.broker.options.blockchainClient.sendToAddress(addressSend, amount);
            console.log('TRANSACTION 0', txid);
            tx = await this.broker.options.blockchainClient.getTransaction(txid);
            console.log('TRANSACTION 1', tx);
            return {
                txid,
                transferAmount: amount,
                fee: -tx.fee,
                feeCurrency: coin.currencyId
            }
        } catch(err) {
            console.error('Transfer ERROR', err.message);
            return {error: err.message};
        }
    }
}