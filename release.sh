#!/bin/bash
# Change to the directory with our code that we plan to work from


echo "Check log  from docker"
ssh root@157.230.93.53 'cd marionette/; docker-compose logs coingeckoapi'

echo "Check setMarket "
ssh root@157.230.93.53 'cd marionette/; ./m cli';

# echo "Check setMarket "
# ssh root@157.230.93.53 'cd marionette/; ./m cli; mol # call coinGeckoApi.setMarkets '{"markets": ['ETH-USDT', 'ETH-BTC', 'ETH-BTC2', 'BTC-BFF']}''

# echo "Check findMarket "
# ssh root@157.230.93.53 'cd marionette/; ./m cli; mol # call coinGeckoApi.findMarket '{"base_currency_id": "eth", "quote_currency_id": "usdt"}''

# echo "Check findPartialMarket "
# ssh root@157.230.93.53 'cd marionette/; ./m cli; mol # call coinGeckoApi.findPartialMarket '{"currency_id": "eth", "isBase": true}''

# echo "Check setCurrentRate "
# ssh root@157.230.93.53 'cd marionette/; ./m cli; mol # call rateSourceConfig.setCurrentRate '{service_prefix: "coinGeckoApi", market: "ETH-USDT"}''

# echo "Check getByCurrencies "
# ssh root@157.230.93.53 'cd marionette/; ./m cli; mol # call rateSourceConfig.getByCurrencies '{"base_currency_id": "eth", "quote_currency_id": "usdt"}'

