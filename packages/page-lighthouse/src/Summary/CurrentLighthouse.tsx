// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AddressSmall } from '@polkadot/react-components';
import React from 'react';

import { Spinner } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';

interface Props {
  className?: string;
}

function CurrentLighthouse ({ className = '' }: Props): React.ReactElement<Props> {
  const { api, isApiReady } = useApi();
  const current = useCall<string>(isApiReady && api.query.lighthouse.lighthouse);

  return (
    <div className={`${className}`}>
      { current
        ? <AddressSmall value={current.toString()} />
        : <Spinner noLabel />
      }
    </div>
  );
}

export default React.memo(CurrentLighthouse);
