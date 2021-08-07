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
    genesisHash: '0xa2e33832b2e533360afc084d47275240c38b5f014bf0386aa0b3b582b182feee',
    info: 'airalab',
    text: t('rpc.airalab.relay', 'Frontier Relay', { ns: 'apps-config' }),
    providers: {
      "Airalab": 'wss://rococo-098.rpc.robonomics.network',
    },
    teleport: [],
    linked: [
      {
        info: 'robonomics',
        homepage: 'http://robonomics.network/',
        paraId: 2077,
        text: t('rpc.kusama.robonomics', 'Robonomics', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://kusama.rpc.robonomics.network/'
        }
      },
      {
        info: 'ipci',
        paraId: 3000,
        text: t('rpc.airalab.ipci', 'IPCI', { ns: 'apps-config' }),
        providers: {
          IPCI: 'wss://rpc.ipci.io',
          Airalab: 'wss://ipci.rpc.robonomics.network',
        },
        teleport: []
      },
      {
        info: 'airalabMars',
        paraId: 2000,
        text: t('rpc.airalab.mars', 'Mars', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://mars.rpc.robonomics.network',
        },
        teleport: []
      },
      {
        info: 'airalabMercury',
        paraId: 5000,
        text: t('rpc.airalab.mercury', 'Mercury', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://mercury.rpc.robonomics.network',
        },
        teleport: []
      },
      {
        info: 'airalabUranus',
        paraId: 4000,
        text: t('rpc.airalab.uranus', 'Uranus', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://Uranus.rpc.robonomics.network',
        },
        teleport: []
      },
    ]
  };
}
