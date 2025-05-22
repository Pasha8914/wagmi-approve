import { sepolia } from 'wagmi/chains'
import { http, createConfig } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { fallback } from 'viem'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    walletConnect({
      projectId: '983bf7efbc12ef7eeac5ac1378f164d6',
      showQrModal: true,
    }),
  ],
  transports: {
    [sepolia.id]: fallback([http('https://eth-sepolia.g.alchemy.com/v2/zGyoNjj3MQRHhikvD2v7ybkFH5g4Kq_b')]),
  },
})
