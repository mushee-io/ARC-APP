import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import {
  mainnet,
  sepolia,
  base,
  baseSepolia,
  polygon,
  polygonAmoy,
} from "wagmi/chains";

const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined;

export const walletConnectConfigured = Boolean(WALLETCONNECT_PROJECT_ID);

export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 6 },
  rpcUrls: {
    default: {
      http: [
        import.meta.env.VITE_ARC_TESTNET_RPC || "https://rpc.testnet.arc.network",
      ],
    },
  },
  blockExplorers: {
    default: { name: "Arcscan", url: "https://testnet.arcscan.app" },
  },
  testnet: true,
});

const projectId = WALLETCONNECT_PROJECT_ID || "00000000000000000000000000000000";

export const wagmiConfig = getDefaultConfig({
  appName: import.meta.env.VITE_BRAND_NAME || "MusheeBridge",
  projectId,
  chains: [arcTestnet, sepolia, baseSepolia, polygonAmoy, mainnet, base, polygon],
  ssr: false,
});
