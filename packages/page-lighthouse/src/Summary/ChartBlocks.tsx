// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import randomColor from 'randomcolor';
import React, { useEffect, useState } from 'react';

import { Chart, Spinner } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

type LighthouseDict = { [String]: number };

interface Props {
  history_depth: number;
}

function ChartBlocks ({ history_depth }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api, isApiReady } = useApi();
  const [lighthouses, setLighthouses] = useState<LighthouseDict>({});
  const [values, setValues] = useState<DoughnutValue[]>([]);
  const bestNumber = useCall<BlockNumber>(isApiReady && api.derive.chain.bestNumber);

  useEffect(async (): void => {
    if (!bestNumber) { return; }

    const state = {};

    for (let i = bestNumber - history_depth; i < bestNumber; ++i) {
      const block_hash = await api.rpc.chain.getBlockHash(i);
      const address = (await api.query.lighthouse.lighthouse.at(block_hash)).toString();

      if (address in state) {
        ++state[address];
      } else {
        state[address] = 1;
      }
    }

    setLighthouses(state);
  }, [api, bestNumber]);

  useEffect((): void => {
    setValues(Object.keys(lighthouses).map((a) => {
      const colors = [randomColor(), randomColor()];

      return { colors: colors, label: a, value: lighthouses[a] };
    }));
  }, [lighthouses]);

  return (
    <div className='lighthouse--Chart'>
      <h1>{t<string>(`recent ${history_depth} blocks`)}</h1>
      {values.length > 0
        ? <Chart.Doughnut size={500}
          values={values} />
        : <Spinner />
      }
    </div>
  );
}

export default React.memo(ChartBlocks);
