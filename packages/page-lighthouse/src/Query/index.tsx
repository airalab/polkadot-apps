// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Input } from '@polkadot/react-components';

import { useTranslation } from '../translate';
import Lighthouse from './Lighthouse';

interface Props {
  className?: string;
}

function Query ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { value } = useParams<{ value: string }>();
  const [lighthouseId, setLighthouseId] = useState<string | null>(value || null);

  const _onQuery = useCallback(
    (): void => {
      if (lighthouseId) {
        window.location.hash = `/lighthouse/query/${lighthouseId}`;
      }
    },
    [lighthouseId]
  );

  return (
    <div className={className}>
      <Input
        className='lighthouse--queryInput'
        defaultValue={value}
        help={t<string>('Display overview information for the selected lighthouse, including blocks produced.')}
        label={t<string>('lighthouse to query')}
        onChange={setLighthouseId}
        onEnter={_onQuery}
      >
        <Button
          icon='play'
          isDisabled={!lighthouseId}
          onClick={_onQuery}
        />
      </Input>
      {value && (
        <Lighthouse lighthouseId={value} />
      )}
    </div>
  );
}

export default React.memo(Query);
