import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

import { config } from './wagmiConfig'
import Wallet from './Wallet'

const queryClient = new QueryClient()

import './App.css'
import { MultisenderWidget, MultisenderWidgetProps } from 'multisender-react-widget'

const _config = {
  id: 11155111,
  blockGasLimit: 7200000,
  blockExplorerUrl: {
    tx: 'https://eth-sepolia.blockscout.com/tx/',
    address: 'https://eth-sepolia.blockscout.com/address/',
  },
  icon: 'https://static.multisender.app/networks/white/ethereum.svg',
  multisenderContractAddress: '0x88888c037DF4527933fa8Ab203a89e1e6E58db70' as `0x${string}`,
  rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/zGyoNjj3MQRHhikvD2v7ybkFH5g4Kq_b'],
  blockScoutApiUrl: 'https://eth-sepolia.blockscout.com',
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <MultisenderWidget
          config={_config}
          queryClient={queryClient}
          wagmiConfig={config}
          mantineProviderProps={{
            defaultColorScheme: 'dark',
          }}
        />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
