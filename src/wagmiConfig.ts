import { mainnet } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    walletConnect({
      projectId: '983bf7efbc12ef7eeac5ac1378f164d6',
      showQrModal: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})
