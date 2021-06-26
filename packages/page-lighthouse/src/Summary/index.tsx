// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { CardSummary, Columar, Digits, SummaryBox } from '@polkadot/react-components';
import { BestNumber } from '@polkadot/react-query';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate';
import ChartBlocks from './ChartBlocks';
import CurrentLighthouse from './CurrentLighthouse';

interface Props {
  className?: string;
  isVisible: boolean;
}

const CHECKIN_BLOCK = 15000;
const CHECKOUT_BLOCK = 200000;

function Summary ({ className = '', isVisible }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <div className={`${className}${!isVisible ? ' lighthouse--hidden' : ''}`}>
      <SummaryBox>
        <section>
          <CardSummary label={t<string>('last one')}>
            <CurrentLighthouse />
          </CardSummary>
        </section>
        <section>
          <CardSummary label={t<string>('best block')}>
            <BestNumber />
          </CardSummary>
          <CardSummary label={t<string>('checkin block')}>
            <Digits value={formatNumber(CHECKIN_BLOCK)} />
          </CardSummary>
          <CardSummary label={t<string>('checkout block')}>
            <Digits value={formatNumber(CHECKOUT_BLOCK)} />
          </CardSummary>
        </section>
      </SummaryBox>
      <Columar>
        <Columar.Column>
          <ChartBlocks history_depth={5}/>
        </Columar.Column>
        <Columar.Column>
          <ChartBlocks history_depth={50}/>
        </Columar.Column>
      </Columar>
    </div>
  );
}

export default React.memo(styled(Summary)`
  .lighthouse--Chart {
    padding: 1rem 1.5rem;
  }
  .ui--Chart {
    width: 100%;
  }
`);
