'use strict';
const config = require('../config');

module.exports = {
    params: {
        recipient: 'string',
    },
    async handler(ctx) {
        let recipient;
        try {
            recipient = JSON.parse(ctx.params.recipient);
        } catch {
            return false;
        }
        const validate = await this.broker.options.blockchainClient.validateAddress(recipient.address)
        return validate.isvalid;
    },
}