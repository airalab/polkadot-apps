// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ChartInfo, LineDataEntry, Props } from './types';

import React, { useRef, useState, useEffect } from 'react';

import { Chart, Spinner } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

const COLORS_POINTS = [undefined, '#acacac'];
const REWARD = 1000 / 150000;
const PERIOD = 50;

function extractPoints (blocks: number[], labels: string[]): ChartInfo {
  const avgSet: LineDataEntry = [];
  const idxSet: LineDataEntry = [];
  let avgCount = 0;
  let total = 0;

  blocks.forEach((blocks, index): void => {
    total += blocks * REWARD;

    if (blocks > 0) {
      avgCount++;
    }

    avgSet.push((avgCount ? Math.ceil(total * 100 / avgCount) : 0) / 100);
    idxSet.push(blocks * REWARD);
  });

  return {
    chart: [idxSet, avgSet],
    labels
  };
}

function ChartRewards ({ lighthouseId, fromBlock = 0 }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api, isApiReady } = useApi();
  const [chart, setChart] = useState<ChartInfo | undefined>();

  useEffect(async (): Promise<void> => {
    const bestNumber = (await api.rpc.chain.getHeader()).number.toNumber();

    let blocks = [];
    let labels = [];
    let counter = 0;
    for (let i = fromBlock; i < bestNumber; ++i) {
      const block_hash = await api.rpc.chain.getBlockHash(i);
      const address = await api.query.lighthouse.lighthouse.at(block_hash).toString();

      if (address == lighthouseId) {
        ++counter;
      }

      if (i % PERIOD == 0) {
        blocks.push(counter);
        labels.push(i.toString());
        counter = 0;
        setChart(extractPoints(blocks, labels));
      }
    }
  }, [api, isApiReady]);

  const legendsRef = useRef([
    t<string>('points'),
    t<string>('average')
  ]);

  return (
    <div className='lighthouse--Chart'>
      <h1>{t<string>('estimated rewards')}</h1>
      {chart
        ? (
          <Chart.Line
            colors={COLORS_POINTS}
            labels={chart.labels}
            legends={legendsRef.current}
            values={chart.chart}
          />
        )
        : <Spinner />
      }
    </div>
  );
}

export default React.memo(ChartRewards);
