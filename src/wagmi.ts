import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
    chains: [sepolia],
    connectors: [
        injected(),
        walletConnect({
            projectId: "983bf7efbc12ef7eeac5ac1378f164d6",
            showQrModal: true,
        }),
    ],
    transports: {
        [sepolia.id]: http(),
    },
});

