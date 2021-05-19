// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Input, InputNumber } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Lighthouse from './Lighthouse';

interface Props {
  className?: string;
}

function Query ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { fromBlockP, lighthouseP } = useParams<{ lighthouseP?: string, fromBlockP?: string }>();
  const [lighthouseId, setLighthouseId] = useState<string | null>(lighthouseP || null);
  const [fromBlock, setFromBlock] = useState<number | null>((fromBlockP && fromBlockP.parseInt()) || 0);

  const _onQuery = useCallback(
    (): void => {
      if (lighthouseId && fromBlock) {
        window.location.hash = `/lighthouse/query/${lighthouseId}/${fromBlock}`;
        window.location.reload(false);
      }
    },
    [lighthouseId, fromBlock]
  );

  return (
    <div className={className}>
      <Input
        className='lighthouse--queryInput'
        defaultValue={lighthouseP}
        help={t<string>('Display overview information for the selected lighthouse, including blocks produced.')}
        label={t<string>('lighthouse to query')}
        onChange={setLighthouseId}
        onEnter={_onQuery}
      >
      </Input>
      <InputNumber
        className='lighthouse--queryInput'
        defaultValue={fromBlockP}
        help={t<string>('Display statistics from block.')}
        label={t<string>('query from block')}
        onChange={setFromBlock}
        onEnter={_onQuery}
      >
        <Button
          icon='play'
          isDisabled={!lighthouseId}
          onClick={_onQuery}
        />
      </InputNumber>
      {lighthouseId && (
        <Lighthouse fromBlock={fromBlock}
          lighthouseId={lighthouseId} />
      )}
    </div>
  );
}

export default React.memo(Query);
