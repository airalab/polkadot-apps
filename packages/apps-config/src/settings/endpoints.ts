// Copyright 2017-2020 @polkadot/apps-config authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Option } from './types';

type TFn = <T= string> (key: string, text: string, options: { ns: string, replace?: Record<string, string> }) => T;

interface LinkOption extends Option {
  dnslink?: string;
}

interface EnvWindow {
  // eslint-disable-next-line camelcase
  process_env?: {
    WS_URL: string;
  }
}

function createDev (t: TFn): LinkOption[] {
  return [
    {
      dnslink: 'local',
      info: 'local',
      text: t<string>('rpc.local', 'Local Node (Own, 127.0.0.1:9944)', { ns: 'apps-config' }),
      value: 'ws://127.0.0.1:9944/'
    }
  ];
}

function createLive (t: TFn): LinkOption[] {
  return [
    {
      dnslink: 'ipci',
      info: 'ipci',
      text: t<string>('rpc.ipci', 'DAO IPCI Network (hosted by Airalab)', { ns: 'apps-config' }),
      value: 'wss://substrate.ipci.io'
    },
    {
      dnslink: 'kusama',
      info: 'kusama',
      text: t<string>('rpc.kusama.parity', 'Kusama (Polkadot Canary, hosted by Parity)', { ns: 'apps-config' }),
      value: 'wss://kusama-rpc.polkadot.io/'
    }
  ];
}

function createTest (t: TFn): LinkOption[] {
  return [
    {
      dnslink: 'robonomics',
      info: 'robonomics',
      text: t<string>('rpc.robonomics', 'Robonomics Parachain (hosted by Airalab)', { ns: 'apps-config' }),
      value: 'wss://rpc.parachain.robonomics.network'
    },
    {
      dnslink: 'polkadot',
      info: 'polkadot',
      text: t<string>('rpc.westend', 'Robonomics Westend Testnet (hosted by Airalab)', { ns: 'apps-config' }),
      value: 'wss://rpc.westend.robonomics.network'
    }
  ];
}

function createCustom (t: TFn): LinkOption[] {
  const WS_URL = (
    (typeof process !== 'undefined' ? process.env?.WS_URL : undefined) ||
    (typeof window !== 'undefined' ? (window as EnvWindow).process_env?.WS_URL : undefined)
  );

  return WS_URL
    ? [
      {
        isHeader: true,
        text: t<string>('rpc.custom', 'Custom environment', { ns: 'apps-config' }),
        value: ''
      },
      {
        info: 'WS_URL',
        text: t<string>('rpc.custom.entry', 'Custom {{WS_URL}}', { ns: 'apps-config', replace: { WS_URL } }),
        value: WS_URL
      }
    ]
    : [];
}

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../logos, specifically in namedLogos
//   text: The text to display on teh dropdown
//   value: The actual hosted secure websocket endpoint
export default function create (t: TFn): LinkOption[] {
  return [
    ...createCustom(t),
    {
      isHeader: true,
      text: t<string>('rpc.header.live', 'Live networks', { ns: 'apps-config' }),
      value: ''
    },
    ...createLive(t),
    {
      isHeader: true,
      text: t<string>('rpc.header.test', 'Test networks', { ns: 'apps-config' }),
      value: ''
    },
    ...createTest(t),
    {
      isHeader: true,
      text: t<string>('rpc.header.dev', 'Development', { ns: 'apps-config' }),
      value: ''
    },
    ...createDev(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
