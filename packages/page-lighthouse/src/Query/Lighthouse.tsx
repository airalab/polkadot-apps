// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Props } from './types';

import React from 'react';
import styled from 'styled-components';

import { Columar } from '@polkadot/react-components';

import ChartBlocks from './ChartBlocks';
import ChartRewards from './ChartRewards';

function Lighthouse ({ className = '', fromBlock = 0, lighthouseId }: Props): React.ReactElement<Props> {
  return (
    <Columar className={className}>
      <Columar.Column>
        <ChartBlocks fromBlock={fromBlock}
          lighthouseId={lighthouseId} />
      </Columar.Column>
      <Columar.Column>
        <ChartRewards fromBlock={fromBlock}
          lighthouseId={lighthouseId} />
      </Columar.Column>
    </Columar>
  );
}

export default React.memo(styled(Lighthouse)`
  .lighthouse--Chart {
    background: white;
    border: 1px solid #eeecea;
    border-radius: 0.25rem;
    padding: 1rem 1.5rem;
  }
`);
