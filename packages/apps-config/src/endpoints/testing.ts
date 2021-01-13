// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from '../settings/types';

import { createRococo } from './testingRococo';
import { expandEndpoints } from './util';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint

export function createTesting (t: TFunction): LinkOption[] {
  return expandEndpoints(t, [
    // polkadot test relays
    createRococo(t),
    // airalab test relays
    {
      dnslink: 'airaRococo',
      info: 'rococo',
      text: t('rpc.rococo', 'Airalab Rococo', { ns: 'apps-config' }),
      providers: {
        Airalab: 'wss://rococo-local.rpc.robonomics.network'
      }
    },
    {
      info: 'airaRococoEarth',
      isChild: true,
      text: t('rpc.rococo.earth', 'Earth', { ns: 'apps-config' }),
      providers: {
        Airalab: 'wss://earth.rpc.robonomics.network'
      }
    },
    {
      info: 'airaRococoMars',
      isChild: true,
      text: t('rpc.rococo.mars', 'Mars', { ns: 'apps-config' }),
      providers: {
        Airalab: 'wss://mars.rpc.robonomics.network'
      }
    }
  ]);
}
