import { ChangeEvent, useState } from 'react'

import {
  useConfig,
  useConnect,
  useChainId,
  useDisconnect,
  useConnections,
  useWriteContract,
  useConnectorClient,
} from 'wagmi'

import { watchAsset } from 'viem/actions'
import { getConnectorClient } from '@wagmi/core'

export default function () {
  const config = useConfig()
  const chainId = useChainId()

  const { disconnect } = useDisconnect()
  const connections = useConnections()

  const { data, error: clientError } = useConnectorClient()
  const { connectors, connectAsync, status, error } = useConnect()

  const { writeContract, error: writeError } = useWriteContract()

  const [approveAmount, setApproveAmount] = useState('')
  const [contractAddress, setContractAddress] = useState('')
  const [tokenContractAddress, settTokenContractAddress] = useState('')

  const changeContractAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setContractAddress(event.target.value)
  }

  const changeTokenContractAddress = (event: ChangeEvent<HTMLInputElement>) => {
    settTokenContractAddress(event.target.value)
  }

  const changeApproveAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setApproveAmount(event.target.value)
  }

  const addAsset = async () => {
    const walletClient = await getConnectorClient(config)

    console.log(walletClient)
    return watchAsset(walletClient, {
      type: 'ERC20',
      options: {
        address: '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60',
        decimals: 18,
        symbol: 'DAI',
      },
    })
  }

  const onApprove = () => {
    writeContract({
      abi: [
        {
          constant: false,
          inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' },
          ],
          name: 'approve',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ] as const,
      functionName: 'approve',
      address: tokenContractAddress as `0x${string}`,
      args: [contractAddress as `0x${string}`, BigInt(approveAmount)],
    })
  }

  return (
    <>
      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button key={connector?.uid} onClick={() => connectAsync({ connector, chainId })} type='button'>
            {connector.name}
          </button>
        ))}

        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      {data && (
        <div>
          <h2>Connector Client</h2>
          client {data?.account?.address} {data?.chain?.id}
          {clientError?.message}
        </div>
      )}
      <div>
        <h2>Connections</h2>

        {connections.map((connection) => (
          <div key={connection.connector.uid}>
            <div>connector {connection.connector.name}</div>
            <div>accounts: {JSON.stringify(connection.accounts)}</div>
            <div>chainId: {connection.chainId}</div>
          </div>
        ))}
      </div>
      <div>
        <h2>Add Asset</h2>
        <div>
          <button type='button' onClick={addAsset}>
            Add DAI
          </button>
        </div>
      </div>
      <div>
        <h2>Approve</h2>
        <form>
          <label>Spender</label>
          <br />
          <input placeholder='0x' value={contractAddress} onChange={changeContractAddress} />
        </form>
        <form>
          <label>Token</label>
          <br />
          <input placeholder='0x' value={tokenContractAddress} onChange={changeTokenContractAddress} />
        </form>
        <form>
          <label>Amount</label>
          <br />
          <input placeholder='100000000' value={approveAmount} onChange={changeApproveAmount} />
        </form>
        <div>
          <button type='button' onClick={onApprove}>
            Approve
          </button>
          {writeError && <div>{writeError.message}</div>}
        </div>
      </div>
      <div>
        <h2>Disconnect</h2>
        <div>
          <button type='button' onClick={disconnect}>
            disconnect
          </button>
        </div>
      </div>
    </>
  )
}
