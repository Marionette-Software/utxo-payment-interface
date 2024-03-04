'use strict';
const config = require('../config');

module.exports = {
    handler(ctx) {
        return JSON.stringify({
          title: 'Recipient',
          type: 'object',
          properties: {
            address: { type: 'string' },
          },
          required: ['address'],
        });
    }
}