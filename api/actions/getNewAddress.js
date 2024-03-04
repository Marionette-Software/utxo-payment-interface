'use strict';
const CodeTypes = require('../fixtures/error.codes');

module.exports = {
    async handler() {
        try {
            const newAddress = await this.broker.options.blockchainClient.getNewAddress();
            return {
                address: newAddress,
                secret: '',
            };
        } catch (err) {
            console.log(err.message);
            throw new Error(CodeTypes.CANNOT_CREATE_WALLET);
        }
    }
}