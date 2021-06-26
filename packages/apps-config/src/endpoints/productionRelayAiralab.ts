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
    genesisHash: '0x37fcba4947ea14ab6fd48fb1ce8cffc80c2684961534b050b10b3c29758a3708',
    info: 'airalab',
    text: t('rpc.airalab.relay', 'Airalab Relay', { ns: 'apps-config' }),
    providers: {
      Airalab: 'wss://rpc.rococo-096.robonomics.network',
    },
    teleport: [],
    linked: [
      {
        info: 'airalabEarth',
        paraId: 1000,
        text: t('rpc.airalab.earth', 'Earth', { ns: 'apps-config' }),
        providers: {
          Airalab: 'wss://earth.rpc.robonomics.network',
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
        info: 'ipci',
        paraId: 3000,
        text: t('rpc.airalab.ipci', 'IPCI', { ns: 'apps-config' }),
        providers: {
          IPCI: 'wss://rpc.ipci.io',
          Airalab: 'wss://ipci.rpc.robonomics.network',
        },
        teleport: []
      },
    ]
  };
}
