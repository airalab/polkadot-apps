// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { EndpointOption } from './types';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint
export function createAiralab (t: TFunction): EndpointOption {
  return {
    dnslink: 'airalab',
    genesisHash: '0xe431f1e432434368f22fd7a162ea0ece3b3df16e48807e94cc07fef14cedcf05',
    info: 'airalab',
    text: t('rpc.airalab.relay', 'Frontier Relay', { ns: 'apps-config' }),
    providers: {
      "Airalab": 'wss://frontier.rpc.robonomics.network',
    },
    teleport: [],
    linked: [
      {
        info: 'robonomics',
        homepage: 'http://robonomics.network/',
        paraId: 2077,
        text: t('rpc.airalab.robonomics', 'Robonomics', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://main.frontier.rpc.robonomics.network/'
        }
      },
      {
        info: 'ipci',
        paraId: 3000,
        text: t('rpc.airalab.ipci', 'IPCI', { ns: 'apps-config' }),
        providers: {
          IPCI: 'wss://rpc.ipci.io',
          Airalab: 'wss://ipci.frontier.rpc.robonomics.network',
        },
        teleport: []
      },
      {
        info: 'airalabMercury',
        paraId: 5000,
        text: t('rpc.airalab.mercury', 'Mercury', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://mercury.frontier.rpc.robonomics.network',
        },
        teleport: []
      },
    ]
  };
}
