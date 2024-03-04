'use strict';
const packageJSON = require('../../package.json');

module.exports = {
  id: process.env.PREFIX,
  title: process.env.TITLE || `${(process.env.PREFIX || 'Bitcoin Payment Interface').toUpperCase()} ${process.env.NETWORK}`,
  subtitle: process.env.SUBTITLE || 'UTXO mainnet',
  subtitle: process.env.DESCRIPTION || 'mainnet',
  explorer_address: process.env.EXPLORER_ADDRESS,
  explorer_transaction: process.env.EXPLORER_TRANSACTION,
  waitConfirmationTimeout: process.env.WAIT_CONFIRMATION_TIMEOUT || 10000,
  maxRequestBlocks: process.env.MAX_REQUEST_BLOCKS || 1,
  minConfirmations: process.env.MIN_CONFIRMATIONS || 6,
  version: packageJSON.version,
  logLevel: process.env.LOGLEVEL || 'info',
  chainId: Number(process.env.CHAIN_ID) || -1,
  client: {
    network: process.env.NETWORK,
    username: process.env.RPC_USER,
    password: process.env.RPC_PASSWORD,
    host: process.env.RPC_HOST,
    port: process.env.RPC_PORT,
    timeout: 60000
  },
  limitedVerbose: process.env.LIMITED_VERBOSE
};
