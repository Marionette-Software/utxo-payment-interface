'use strict';

const { ServiceBroker } = require('moleculer');

const packageJSON = require("../package.json");
const brokerService = require('./broker/broker.service');
const config = require('./config');
const Request = require('./mixins/request.mixin');
const actions = require('./actions');


const broker = new ServiceBroker(brokerService);
broker.createService({
  name: config.id,
  mixins: [Request],
  dependencies: ['blockchainRegistry', 'paymentGateway'],
  events: {
    ping: {
      handler(ctx) {
        const nowTime = new Date().getTime();
        const delay = nowTime - ctx.params.datetime;
        return ctx.broadcast('pong', { service_prefix: ctx.name, datetime: nowTime, delay });
      },
    },
    "currency.created": {
      async handler(ctx) {
        ctx.options.coin = await ctx.call('paymentGateway.getPICoin', {paymentInterfaceId: config.id});
      }
    }
  },
  actions,

  created() {
		this.broker.metrics.register({ 
			type: "info", 
			name: "process.marionette.version", 
			description: "Marionette version", 
		});

		this.broker.metrics.set("process.marionette.version", packageJSON.version)
	},
  async started() {
    console.log('STARTED+++++');
    const _self = this;
    
  },
  stopped() {
    console.log("=>>>>>>>>>>>> BROKER STOPPED");
    //broker.call('blockchainRegistry.unregister', {});
  }
});


broker.start().then(async () => {
  // TODO: turn on after changes (new CurrencyPaymentInterface model)
  setTimeout(async () => {
    await broker.call('blockchainRegistry.registerBlockchain', {
      id: config.id,
      title: config.title,
      subtitle: config.subtitle,
      description: config.subtitle,
      explorer_address: config.explorer_address,
      explorer_transaction: config.explorer_transaction,
      minConfirmations: config.minConfirmations,
      chainId: config.chainId
    });

    await broker.call('paymentGateway.registerPaymentInterface', {
      id: config.id,
      title: config.title,
      subtitle: config.subtitle,
      description: config.description,
      invoiceBased: false,
      multiCurrency: false,
      isCollectabled: false
    });
    await broker.call(`${config.id}.lastHeight`);
    broker.options.coin = await broker.call('paymentGateway.getPICoin', {paymentInterfaceId: config.id});
    setInterval(async () => {
      await broker.call(`${config.id}.lastHeight`);
    }, config.waitConfirmationTimeout);
    broker.options.latestAnalysedBlock = await broker.call('blockchainRegistry.getHeight', {
      blockchainId: config.id
    });
    broker.options.lastRequestBlock = broker.options.latestAnalysedBlock + 1;
    broker.call(`${config.id}.blockSequence`);
    broker.call(`${config.id}.analyseBlock`);
  }, 3000);
  broker.logger.info(`🚀 ${config.title} started`);
});
