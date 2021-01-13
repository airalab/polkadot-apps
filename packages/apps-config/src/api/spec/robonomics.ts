// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable sort-keys */

export default {
  RefCount: 'u8',
  Record: 'Vec<u8>',
  Address: 'MultiAddress',
  LookupSource: 'MultiAddress',
  TechnicalParam: 'Vec<u8>',
  TechnicalReport: 'Vec<u8>',
  EconomicalParam: '{}',
  ProofParam: 'MultiSignature',
  LiabilityIndex: 'u64',
  PersistedValidationData: {
      parent_head: 'Vec<u8>',
      block_number: 'u32',
      hrmp_mqc_heads: 'Vec<(u32, Hash)>',
      dmq_mqc_head: 'Hash',
      max_pov_size: 'u32',
  },
  TransientValidationData: {
      max_code_size: 'u32',
      max_head_data_size: 'u32',
      balance: 'Balance',
      code_upgrade_allowed: 'Option<u32>',
      dmq_length: 'u32',
  },
  ValidationData: {
      persistent: 'PersistedValidationData',
      transient: 'TransientValidationData',
  },
  InboundHrmpMessage: {
      send_at: 'u32',
      data: 'Vec<u8>',
  },
  InboundDownwardMessage: {
      send_at: 'u32',
      msg: 'Vec<u8>',
  },
  MessageIngestionType: {
      downward_messages: 'Vec<InboundDownwardMessage>',
      horizontal_messages: 'Vec<InboundHrmpMessage>',
  },
};
