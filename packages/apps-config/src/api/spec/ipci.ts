// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: 'Apache-2.0

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
        RingBufferIndex: {
          start: 'u64',
          end: 'u64'
        },
        RingBufferItem: '(Compact<Moment>,Record)',
        EverUSDBalance: 'u64',
        BondId: '[u8;16]',
        EvercityAccountStructOf: {
          roles: 'u8',
          identity: 'Compact<u64>',
          create_time: 'Compact<Moment>'
        },
        TokenMintRequestStructOf: {
          amount: 'Compact<EverUSDBalance>',
          deadline: 'Compact<Moment>'
        },
        TokenBurnRequestStructOf: {
          amount: 'Compact<EverUSDBalance>',
          deadline: 'Compact<Moment>'
        },
        BondImpactType: {
          _enum: [
            'POWER_GENERATED',
            'CO2_EMISSIONS_REDUCTION'
          ]
        },
        BondState: {
          _enum: [
            'PREPARE',
            'BOOKING',
            'ACTIVE',
            'BANKRUPT',
            'FINISHED'
          ]
        },
        BondPeriod: 'u32',
        BondUnitAmount: 'u32',
        BondInterest: 'u32',
        BondPeriodNumber: 'u32',
        BondInnerStructOf: {
          docs_pack_root_hash_main: 'Hash',
          docs_pack_root_hash_legal: 'Hash',
          docs_pack_root_hash_finance: 'Hash',
          docs_pack_root_hash_tech: 'Hash',
          impact_data_type: 'BondImpactType',
          impact_data_baseline: 'Vec<u64>',
          impact_data_max_deviation_cap: 'Compact<u64>',
          impact_data_max_deviation_floor: 'Compact<u64>',
          impact_data_send_period: 'Compact<BondPeriod>',
          interest_rate_penalty_for_missed_report: 'Compact<BondInterest>',
          interest_rate_base_value: 'Compact<BondInterest>',
          interest_rate_margin_cap: 'Compact<BondInterest>',
          interest_rate_margin_floor: 'Compact<BondInterest>',
          interest_rate_start_period_value: 'Compact<BondInterest>',
          interest_pay_period: 'Compact<BondPeriod>',
          start_period: 'Compact<BondPeriod>',
          payment_period: 'Compact<BondPeriod>',
          bond_duration: 'Compact<BondPeriodNumber>',
          bond_finishing_period: 'Compact<BondPeriod>',
          mincap_deadline: 'Compact<Moment>',
          bond_units_mincap_amount: 'Compact<BondUnitAmount>',
          bond_units_maxcap_amount: 'Compact<BondUnitAmount>',
          bond_units_base_price: 'Compact<EverUSDBalance>'
        },
        BondStructOf: {
          inner: 'BondInnerStructOf',
          issuer: 'AccountId',
          manager: 'AccountId',
          auditor: 'AccountId',
          impact_reporter: 'AccountId',
          issued_amount: 'Compact<BondUnitAmount>',
          creation_date: 'Compact<Moment>',
          booking_start_date: 'Compact<Moment>',
          active_start_date: 'Compact<Moment>',
          state: 'BondState',
          bond_debit: 'Compact<EverUSDBalance>',
          bond_credit: 'Compact<EverUSDBalance>',
          coupon_yield: 'Compact<EverUSDBalance>',
          nonce: 'Compact<u64>'
        },
        AccountYield: {
          coupon_yield: 'Compact<EverUSDBalance>',
          period_num: 'Compact<BondPeriodNumber>'
        },
        BondUnitPackage: {
          bond_units: 'Compact<BondUnitAmount>',
          acquisition: 'Compact<BondPeriod>',
          coupon_yield: 'Compact<EverUSDBalance>'
        },
        BondImpactReportStruct: {
          create_date: 'Compact<BondPeriod>',
          impact_data: 'Compact<u64>',
          signed: 'bool'
        },
        BondUnitSaleLotStructOf: {
          deadline: 'Compact<Moment>',
          new_bondholder: 'AccountId',
          bond_units: 'Compact<BondUnitAmount>',
          amount: 'Compact<EverUSDBalance>'
        },
        PeriodYield: {
          total_yield: 'Compact<EverUSDBalance>',
          interest_rate: 'Compact<BondInterest>'
        }
      }
    }
  ]
};

export default definitions;
