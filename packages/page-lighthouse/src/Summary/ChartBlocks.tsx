// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo, useRef } from 'react';

import { Chart, Spinner } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import styled from 'styled-components';

import { useTranslation } from '../translate';

function ChartBlocks (): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const values = [
    {colors: [], label: '0x420029e64F849AA3De300D2ad86075aD32f01680', value: 30 },
    {colors: [], label: '0x420029e64F849AA3De300D2ad86075aD32f01680', value: 70 }
  ];

  return (
    <div className='lighthouse--Chart'>
      <h1>{t<string>('top block producers')}</h1>
      {values.length
        ? (
          <Chart.Doughnut
            values={values}
          />
        )
        : <Spinner />
      }
    </div>
  );
}

export default React.memo(ChartBlocks);
