// Copyright 2017-2021 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-lighthouse';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: [
        ['tx.lighthouse.setLighthouse']
      ]
    },
    group: 'network',
    icon: 'certificate',
    name: 'lighthouse',
    text: t('nav.lighthouse', 'Lighthouse', { ns: 'apps-routing' })
  };
}
