import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Thirdweb Client ID
export const clientId = "ceb162223222ebd17384f91f5a032839";

export const thirdwebClient = createThirdwebClient({
  clientId: clientId,
});

// Common chains - Ethereum and BSC are used for cross-chain liquidity
export const ethereum = defineChain(1);
export const bsc = defineChain(56);

// Note: Fluid Chain L1 Mainnet is currently under development
export const networks = [ethereum, bsc];