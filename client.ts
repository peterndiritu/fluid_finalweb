import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, bsc, polygon } from '@reown/appkit/networks'

// Using the updated Project ID for Reown (AppKit)
export const projectId = "ceb162223222ebd17384f91f5a032839";

const networks = [mainnet, bsc, polygon];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  themeMode: 'dark',
  features: {
    analytics: true
  },
  metadata: {
    name: "Fluid",
    description: "Fluid Crypto, Fiat Wallet & Blockchain Hosting",
    url: "https://fluid.finance",
    icons: ["https://fluid.finance/logo.png"]
  }
});

// Keep Thirdweb client for potential other uses (like contract interactions if preferred)
import { createThirdwebClient } from "thirdweb";
export const thirdwebClient = createThirdwebClient({
  clientId: projectId,
});