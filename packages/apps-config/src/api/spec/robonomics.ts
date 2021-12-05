// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@polkadot/types/types';

// structs need to be in order
/* eslint-disable sort-keys */

const definitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        Lighthouse: 'AccountId',
        Parameter: 'bool',
        LaunchParameter: 'bool',
        Record: 'Vec<u8>',
        Technics: 'Vec<u8>',
        Economics: '{}',
        Report: {
          index: 'LiabilityIndex',
          sender: 'AccountId',
          payload: 'Vec<u8>',
          signature: 'MultiSignature'
        },
        ReportFor: 'Report',
        RingBufferIndex: {
          start: 'u64',
          end: 'u64'
        },
        RingBufferItem: '(Compact<Moment>,Record)',
        Agreement: {
          technics: 'Technics',
          economics: 'Economics',
          promisee: 'AccountId',
          promisor: 'AccountId',
          promisee_signature: 'MultiSignature',
          promisor_signature: 'MultiSignature'
        },
        LiabilityIndex: 'u32',
        Subscription: {
          _enum: {
            Lifetime: 'Compact<u32>',
            Daily: 'Compact<u32>'
          }
        },
        AuctionLedger: {
          winner: 'Option<AccountId>',
          best_price: 'Compact<Balance>',
          kind: 'Subscription'
        },
        SubscriptionLedger: {
          free_weight: 'Compact<Weight>',
          issue_time: 'Compact<Moment>',
          last_update: 'Compact<Moment>',
          kind: 'Subscription'
        }
      }
    }
  ]
};

export default definitions;
