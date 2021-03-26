// Copyright 2017-2021 @polkadot/app-lighthouse authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AppProps as Props, ThemeProps } from '@polkadot/react-components/types';

import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { HelpOverlay } from '@polkadot/react-components';
import Tabs from '@polkadot/react-components/Tabs';

import basicMd from './md/basic.md';
import Query from './Query';
import Summary from './Summary';
import { useTranslation } from './translate';

function LigthouseApp ({ basePath, className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const items = useMemo(() => [
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Overview')
    },
    {
      hasParams: true,
      name: 'query',
      text: t<string>('Statistics')
    }
  ], []);

  return (
    <main className={`lighthouse--App ${className}`}>
      <HelpOverlay md={basicMd as string} />
      <Tabs
        basePath={basePath}
        items={items}
      />
      <Summary
        isVisible={pathname === basePath}
      />
      <Switch>
        <Route path={[`${basePath}/query/:lighthouseP/:fromBlockP`, `${basePath}/query`]}>
          <Query />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(styled(LigthouseApp)(({ theme }: ThemeProps) => `
  .lighthouse--hidden {
    display: none;
  }

  .lighthouse--Chart {
    margin-top: 1.5rem;

    h1 {
      margin-bottom: 0.5rem;
    }

    .ui--Spinner {
      margin: 2.5rem auto;
    }
  }
`));
