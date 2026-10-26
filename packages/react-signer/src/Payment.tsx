// Copyright 2017-2026 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Option } from '@polkadot/types';
import type { Codec } from '@polkadot/types/types';
import type { BN } from '@polkadot/util';
import type { RobonomicsPayment } from './types.js';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Dropdown, InputAddress, InputNumber, MarkWarning, Modal } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';
import { BN_ZERO } from '@polkadot/util';

import Tip from './Tip.js';
import { useTranslation } from './translate.js';

interface Props {
  accountId?: string | null;
  className?: string;
  onChange: (payment?: RobonomicsPayment) => void;
}

interface SubscriptionState {
  generation: BN;
}

type Mode = 'Fee' | 'Subscription';
type ContextType = 'Account' | 'Node' | 'NodeIdentity';

function Payment ({ accountId, className, onChange }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const [mode, setMode] = useState<Mode>('Fee');
  const [tip, setTip] = useState<BN | undefined>();
  const [contextType, setContextType] = useState<ContextType>('Account');
  const [nodeId, setNodeId] = useState<BN | undefined>();
  const [identity, setIdentity] = useState<string | null>(null);
  const [subscriptionOwner, setSubscriptionOwner] = useState<string | null>(null);
  const [customGeneration, setCustomGeneration] = useState<BN | undefined>();

  const modeOptions = useMemo(
    () => [
      { text: t('Pay with fees'), value: 'Fee' },
      { text: t('Pay with a subscription'), value: 'Subscription' }
    ],
    [t]
  );

  const contextOptions = useMemo(
    () => [
      { text: t('Subscription of the signing account'), value: 'Account' },
      { text: t('CPS node'), value: 'Node' },
      { text: t('CPS node identity'), value: 'NodeIdentity' }
    ],
    [t]
  );

  // the signer owns the subscription for an account context, otherwise the owner of the node scope is supplied
  const owner = contextType === 'Account' ? accountId : subscriptionOwner;
  const subscription = useCall<Option<Codec & SubscriptionState>>(
    mode === 'Subscription' && owner ? api.query.subscription?.subscriptions : undefined,
    [owner]
  );
  const fetched = useMemo(
    (): SubscriptionState | null | undefined => {
      if (!subscription) {
        return undefined;
      }

      return subscription.isSome
        ? { generation: subscription.unwrap().generation }
        : null;
    },
    [subscription]
  );
  const generation = customGeneration ?? fetched?.generation;

  const context = useMemo(
    () => {
      switch (contextType) {
        case 'Account':
          return accountId ? { Account: accountId } : null;
        case 'Node':
          return nodeId ? { Node: nodeId } : null;
        default:
          return identity ? { NodeIdentity: identity } : null;
      }
    },
    [accountId, contextType, identity, nodeId]
  );

  useEffect((): void => {
    if (mode === 'Fee') {
      onChange({ Fee: { tip: tip ?? BN_ZERO } });
    } else if (context && generation) {
      onChange({ Subscription: { context, generation } });
    } else {
      onChange(undefined);
    }
  }, [context, generation, mode, onChange, tip]);

  const _onChangeNode = useCallback((value?: BN) => setNodeId(value), []);
  const _onChangeGeneration = useCallback((value?: BN) => setCustomGeneration(value), []);

  return (
    <>
      <Modal.Columns hint={t('The payment mode is part of the signed transaction. A subscription pays with the Transaction resource instead of a fee.')}>
        <Dropdown
          label={t('payment')}
          onChange={setMode}
          options={modeOptions}
          value={mode}
        />
      </Modal.Columns>
      {mode === 'Fee'
        ? <Tip onChange={setTip} />
        : (
          <Modal.Columns
            className={className}
            hint={t('The subscription generation is read from the chain, it has to match the active generation when the transaction is included.')}
          >
            <Dropdown
              label={t('subscription context')}
              onChange={setContextType}
              options={contextOptions}
              value={contextType}
            />
            {contextType === 'Node' && (
              <InputNumber
                isZeroable
                label={t('node id')}
                onChange={_onChangeNode}
              />
            )}
            {contextType === 'NodeIdentity' && (
              <InputAddress
                label={t('node identity')}
                onChange={setIdentity}
                type='allPlus'
              />
            )}
            {contextType !== 'Account' && (
              <InputAddress
                label={t('subscription owner (to look up the generation)')}
                onChange={setSubscriptionOwner}
                type='allPlus'
              />
            )}
            <InputNumber
              defaultValue={fetched?.generation}
              isZeroable
              key={`${owner || ''}:${fetched?.generation.toString() || ''}`}
              label={t('subscription generation')}
              onChange={_onChangeGeneration}
            />
            {fetched === null && (
              <MarkWarning content={t('No subscription was found for this owner, the transaction will be rejected without an active one.')} />
            )}
          </Modal.Columns>
        )
      }
    </>
  );
}

export default React.memo(Payment);
