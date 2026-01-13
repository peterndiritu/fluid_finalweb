import { createThirdwebClient } from "thirdweb";
import { inAppWallet, createWallet } from "thirdweb/wallets";

export const client = createThirdwebClient({
  clientId: "9d30a8dffb4aac7ac965e54d6b028699",
});

export const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.walletconnect"), // Essential for universal mobile wallet discovery
  inAppWallet({
    auth: { options: ["google", "email", "passkey", "phone"] }
  }),
];