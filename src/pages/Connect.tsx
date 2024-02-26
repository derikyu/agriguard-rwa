//Card.tsx
import { useEffect, useState } from 'react'
import { Web3ReactSelectedHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import React from 'react'
import Cookies from 'js-cookie';

export default function Card({connector, hooks, name}: {connector: Connector, hooks: Web3ReactSelectedHooks, name: string}) {
  const {useSelectedAccount, useSelectedChainId, useSelectedIsActive, useSelectedIsActivating } = hooks
  const isActivating = useSelectedIsActivating(connector)
  const isActive = useSelectedIsActive(connector)
  const account = useSelectedAccount(connector)
  const chain = useSelectedChainId(connector)

  const [error, setError] = useState<Error | undefined>(undefined)
  const [connectionStatus, setConnectionStatus] = useState('Disconnected')

  const isLoggedIn = Cookies.get('account');

  const handleToggleConnect = () => {
    setError(undefined) // clear error state

    if (isActive) {
      if(connector?.deactivate) {
        void connector.deactivate()
      } else {
        void connector.resetState()
      }
    }
    else if (!isActivating) {
      setConnectionStatus('Connecting..')
        Promise.resolve(connector.activate(1))
        .catch((e) => {
          connector.resetState()
          setError(e)
        }) 
      }
  }
  useEffect(() => {
    if(isActive) {
      setConnectionStatus('Connected')
      Cookies.set('account', account, { expires: 7 })
    } else {
      setConnectionStatus('Disconnected')
    }
  }
  ,[isActive])

  return (
    <div>
      <p>{Cookies.get('account')}</p>
      {/* <p>{name.toUpperCase()}</p>
      <h3>Status - {(error?.message) ? ("Error: " + error.message) : connectionStatus}</h3>
      <h3>Address - {account ? account : "No Account Detected"}</h3>
      <h3>ChainId -  {chain ? chain : 'No Chain Connected'}</h3> */}
      <button onClick={handleToggleConnect} disabled={false}>
        {isActive ? "Disconnect" : "Connect"}
      </button>

      {isLoggedIn ? (
        <button onClick={() => Cookies.remove('account')}>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  )
}