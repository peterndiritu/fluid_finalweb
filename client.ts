import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Thirdweb Client ID
export const clientId = "ceb162223222ebd17384f91f5a032839";

export const thirdwebClient = createThirdwebClient({
  clientId: clientId,
});

// Common chains - Polygon is the primary chain for Fluid
export const polygon = defineChain(137);
export const ethereum = defineChain(1);
export const bsc = defineChain(56);

export const networks = [polygon, ethereum, bsc];