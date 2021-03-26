// Copyright 2017-2021 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useApi, useCall } from '@polkadot/react-hooks';
import { Spinner } from '@polkadot/react-components';
import EthIcon from "eth-icon";

interface Props {
  className?: string;
}

function CurrentLighthouse({ className = '' }: Props): React.ReactElement<Props> {
  const { api, isApiReady } = useApi();
  const current = useCall<String>(isApiReady && api.query.lighthouse.lighthouse);
  
  return (
    <div className={`${className}`}>
      { current
          ? <EthIcon address={current.toString()} scale={32} />
          : <Spinner noLabel />
      }
    </div>
  );
}

export default React.memo(CurrentLighthouse);
