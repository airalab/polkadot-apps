// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ChartInfo, LineDataEntry, Props } from './types';

import React, { useMemo, useRef } from 'react';

import { Chart, Spinner } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';

import type { LighthouseBlocks } from './types';
import { useTranslation } from '../translate';

const COLORS_POINTS = [undefined, '#acacac'];

function extractPoints (blocks: LighthouseBlocks[] = []): ChartInfo {
  const labels: string[] = [];
  const avgSet: LineDataEntry = [];
  const idxSet: LineDataEntry = [];
  let avgCount = 0;
  let total = 0;

  blocks.forEach((blocks, index): void => {
    total += blocks.toNumber();
    labels.push(index);

    if (blocks.gtn(0)) {
      avgCount++;
    }

    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    idxSet.push(blocks);
  });

  return {
    chart: [idxSet, avgSet],
    labels
  };
}

function ChartRewards ({ lighthouseId }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();
  const params = useMemo(() => [lighthouseId, false], [lighthouseId]);
  const lighthouseBlocks = [];

  const { chart, labels } = useMemo(
    () => extractPoints(lighthouseBlocks),
    [lighthouseBlocks]
  );

  const legendsRef = useRef([
    t<string>('points'),
    t<string>('average')
  ]);

  return (
    <div className='lighthouse--Chart'>
      <h1>{t<string>('expected rewards')}</h1>
      {labels.length
        ? (
          <Chart.Line
            colors={COLORS_POINTS}
            labels={labels}
            legends={legendsRef.current}
            values={chart}
          />
        )
        : <Spinner />
      }
    </div>
  );
}

export default React.memo(ChartRewards);
