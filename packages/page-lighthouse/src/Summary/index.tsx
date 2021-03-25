// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { Columar } from '@polkadot/react-components';
import styled from 'styled-components';

import { useTranslation } from '../translate';
import ChartBlocks from './ChartBlocks';

interface Props {
  className?: string;
  isVisible: boolean;
}

function Summary({ className = '', isVisible }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <Columar className={`${className}${!isVisible ? ' lighthouse--hidden' : ''}`}>
      <Columar.Column>
        <ChartBlocks />
      </Columar.Column>
    </Columar>
  );
}

export default React.memo(styled(Summary)`
  .lighthouse--Chart {
    background: white;
    border: 1px solid #eeecea;
    border-radius: 0.25rem;
    padding: 1rem 1.5rem;
  }
`);
