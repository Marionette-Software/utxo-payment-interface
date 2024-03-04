'use strict';
const Client = require('bitcoin-core');
const config = require('../config');
const packageJSON = require('../../package.json');

module.exports = {
  currentBlock: 0,
  latestAnalysedBlock: 0,
  lastRequestBlock: 0,
  latest: 0,
  blockchainClient: new Client(config.client),
  coin: {},
  blocksRequest: {},
  maxRequestBlocks: config.maxRequestBlocks,
  nodeID: config.id,
  logLevel: config.logLevel,
  transporter: 'nats://nats:4222',
  transit: {
    maxQueueSize: 50000 * 2,
  },

  metrics: {
    enabled: true,
    reporter: [
      {
        type: 'Event',
        options: {
          // Event name
          eventName: 'monitoring.snapshot',
          // Broadcast or emit
          broadcast: false,
          // Event groups
          groups: null,
          // Send only changed metrics
          onlyChanges: false,
          // Sending interval in seconds
          interval: 5,
        },
      },
    ],
  },
  tracing: {
    enabled: true,
    exporter: {
      type: 'Jaeger',
      options: {
        // HTTP Reporter endpoint. If set, HTTP Reporter will be used.
        endpoint: null,
        // UDP Sender host option.
        host: 'jaeger',
        // UDP Sender port option.
        port: 6832,
        // Jaeger Sampler configuration.
        sampler: {
          // Sampler type. More info: https://www.jaegertracing.io/docs/1.14/sampling/#client-sampling-configuration
          type: 'Const',
          // Sampler specific options.
          options: {},
        },
        // Additional options for `Jaeger.Tracer`
        tracerOptions: {},
        // Default tags. They will be added into all span tags.
        defaultTags: null,
      },
    },
  },
  internalServices: {
    $node: {
      actions: {
        version() {
          return packageJSON.version;
        },
      },
    },
  },
  cacher: 'Memory',
  errorHandler(err, info) {
    this.logger.warn('❌ Btc Payment Interface log the error:', { err, info });
  },
};
