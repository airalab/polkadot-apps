// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { LinkOption } from './types';

import { createDev, createOwn } from './development';
import { createAiralabRelay } from './productionRelays';
import { createKusamaRelay } from './productionRelays';
import { createWestendRelay } from './testingRelays';

export { CUSTOM_ENDPOINT_KEY } from './development';

export function createWsEndpoints (t: TFunction, firstOnly?: boolean): LinkOption[] {
  return [
    {
      isDisabled: false,
      isHeader: true,
      text: t('rpc.header.airalab.relay', 'Airalab Frontier Relay', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createAiralabRelay(t, firstOnly),
    {
      isDisabled: false,
      isHeader: true,
      text: t('rpc.header.kusama.relay', 'Kusama & parachains', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createKusamaRelay(t, firstOnly),
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.westend.relay', 'Test Westend & parachains', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createWestendRelay(t, firstOnly),
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.dev', 'Development', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createDev(t),
    ...createOwn(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
