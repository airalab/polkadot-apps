// Copyright 2017-2026 @polkadot/apps-config authors & contributors
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
        Agreement: {
          technics: 'Technics',
          economics: 'Economics',
          promisee: 'AccountId',
          promisor: 'AccountId',
          promisee_signature: 'MultiSignature',
          promisor_signature: 'MultiSignature'
        },
        LiabilityIndex: 'u32',
        RobonomicsAuthorizationContext: {
          _enum: {
            Account: 'AccountId',
            Node: 'u64',
            NodeIdentity: 'AccountId'
          }
        },
        RobonomicsFee: {
          tip: 'Compact<Balance>'
        },
        RobonomicsSubscription: {
          context: 'RobonomicsAuthorizationContext',
          generation: 'u64'
        },
        RobonomicsPayment: {
          _enum: {
            Fee: 'RobonomicsFee',
            Subscription: 'RobonomicsSubscription'
          }
        }
      }
    }
  ],
  signedExtensions: {
    // replaces ChargeTransactionPayment, the payment is chosen with the `payment` signer option
    ChargeTransaction: {
      extrinsic: {
        payment: 'RobonomicsPayment'
      },
      payload: {}
    }
  }
};

export default definitions;
