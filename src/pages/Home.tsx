import { Link } from "wouter";
import { ArrowRightLeft, ArrowDownToLine, Activity } from "lucide-react";
import { AssetRow } from "@/components/AssetRow";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const ASSETS = [
  { id: "1", symbol: "USDC", chainName: "Arc Testnet", balance: 1000.00, usdValue: 1000.00, chainCode: "ARC" },
  { id: "2", symbol: "USDC", chainName: "Ethereum Sepolia", balance: 0.00, usdValue: 0.00, chainCode: "ETH" },
  { id: "3", symbol: "USDC", chainName: "Base Sepolia", balance: 250.00, usdValue: 250.00, chainCode: "BASE" },
  { id: "4", symbol: "USDC", chainName: "Polygon Amoy", balance: 0.00, usdValue: 0.00, chainCode: "POL" },
  { id: "5", symbol: "USDC", chainName: "Solana Devnet", balance: 0.00, usdValue: 0.00, chainCode: "SOL" },
];

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/mushee-logo.jpg" alt="MusheeBridge" className="w-8 h-8 rounded-full object-cover" />
          <span className="text-sm font-bold text-gray-900">MusheeBridge</span>
        </div>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;
            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
                })}
              >
                {!connected ? (
                  <button
                    onClick={openConnectModal}
                    className="text-sm font-semibold text-[#0052FF] border border-[#0052FF] rounded-full px-4 py-1.5 active:bg-blue-50 transition-colors"
                    data-testid="connect-wallet-btn"
                  >
                    Connect Wallet
                  </button>
                ) : chain.unsupported ? (
                  <button
                    onClick={openChainModal}
                    className="text-sm font-semibold text-red-600 border border-red-300 rounded-full px-4 py-1.5 bg-red-50"
                    data-testid="wrong-network-btn"
                  >
                    Wrong network
                  </button>
                ) : (
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 border border-gray-200 rounded-full px-3 py-1.5 active:bg-gray-50 transition-colors"
                    data-testid="account-btn"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    {account.displayName}
                  </button>
                )}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#0052FF] to-[#0038B8] rounded-[24px] p-6 text-white shadow-sm mb-8 mt-2">
          <div className="text-white/80 text-sm font-medium mb-1">Total Balance</div>
          <div className="text-[40px] font-bold tracking-tight leading-none mb-3" data-testid="total-balance">
            $1,250.00
          </div>
          {isConnected && address ? (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-white/80 text-xs font-mono" data-testid="wallet-address">
                {shortenAddress(address)}
              </span>
            </div>
          ) : null}
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur-md">
            Arc Testnet
          </div>

          <div className="flex gap-4 mt-8">
            <Link href="/bridge" className="flex flex-col items-center gap-2 flex-1 group" data-testid="bridge-shortcut">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-active:bg-white/20 transition-colors">
                <ArrowRightLeft className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium">Bridge</span>
            </Link>
            <button className="flex flex-col items-center gap-2 flex-1 group" data-testid="receive-btn">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-active:bg-white/20 transition-colors">
                <ArrowDownToLine className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium">Receive</span>
            </button>
            <Link href="/activity" className="flex flex-col items-center gap-2 flex-1 group" data-testid="activity-shortcut">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-active:bg-white/20 transition-colors">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium">Activity</span>
            </Link>
          </div>
        </div>

        {/* Assets List */}
        <div>
          <h2 className="text-xl font-bold px-2 mb-4">Your Assets</h2>
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_0_1px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.02)]">
            {ASSETS.map((asset) => (
              <AssetRow key={asset.id} {...asset} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
