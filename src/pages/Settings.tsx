import { Info, Lock } from "lucide-react";
import { useAccount, useChainId } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { walletConnectConfigured } from "@/lib/wagmiConfig";

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function Settings() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const wcProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined;
  const arcRpc = import.meta.env.VITE_ARC_TESTNET_RPC || "https://rpc.testnet.arc.network";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="px-6 py-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-6">

        {/* Wallet Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 mb-2 px-4 uppercase tracking-wider">Wallet</h2>
          <div className="bg-white rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-medium text-sm">Connected Wallet</span>
              <div className="flex items-center gap-3">
                {isConnected && address ? (
                  <>
                    <span className="text-gray-700 text-sm font-mono" data-testid="settings-wallet-address">
                      {shortenAddress(address)}
                    </span>
                    <ConnectButton.Custom>
                      {({ openAccountModal, mounted }) =>
                        mounted ? (
                          <button
                            onClick={openAccountModal}
                            className="text-[#0052FF] text-sm font-semibold"
                            data-testid="settings-account-btn"
                          >
                            Manage
                          </button>
                        ) : null
                      }
                    </ConnectButton.Custom>
                  </>
                ) : (
                  <>
                    <span className="text-gray-400 text-sm">Not connected</span>
                    <ConnectButton.Custom>
                      {({ openConnectModal, mounted }) =>
                        mounted ? (
                          <button
                            onClick={openConnectModal}
                            className="text-[#0052FF] text-sm font-semibold"
                            data-testid="settings-connect-btn"
                          >
                            Connect
                          </button>
                        ) : null
                      }
                    </ConnectButton.Custom>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="font-medium text-sm">Network</span>
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-gray-600 text-sm">
                      {chainId === 5042002 ? "Arc Testnet" : `Chain ${chainId}`}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    <span className="text-gray-400 text-sm">Not connected</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Network Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 mb-2 px-4 uppercase tracking-wider">Network Settings</h2>
          <div className="bg-white rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
            <div className="flex flex-col gap-1 p-4 border-b border-gray-100">
              <span className="font-medium text-sm">Arc Testnet RPC</span>
              <span className="text-gray-500 text-xs font-mono truncate" data-testid="arc-rpc">{arcRpc}</span>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-medium text-sm">WalletConnect</span>
              <div className="flex items-center gap-2">
                {walletConnectConfigured ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-600 text-sm font-medium">Configured</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-red-500 text-sm">Missing Project ID</span>
                  </>
                )}
              </div>
            </div>
            {wcProjectId && (
              <div className="flex flex-col gap-1 p-4 border-b border-gray-100">
                <span className="font-medium text-sm">WalletConnect Project ID</span>
                <span className="text-gray-500 text-xs font-mono truncate" data-testid="wc-project-id">
                  {wcProjectId.slice(0, 8)}…{wcProjectId.slice(-4)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between p-4">
              <span className="font-medium text-sm">Arc Chain ID</span>
              <span className="text-gray-500 text-sm font-mono">5042002</span>
            </div>
          </div>
        </section>

        {/* Supported Wallets */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 mb-2 px-4 uppercase tracking-wider">Supported Wallets</h2>
          <div className="bg-white rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
            {["MetaMask", "Coinbase Wallet", "Rainbow", "WalletConnect", "Browser Wallets"].map((wallet, i, arr) => (
              <div
                key={wallet}
                className={`flex items-center justify-between p-4 ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <span className="text-sm font-medium">{wallet}</span>
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            ))}
          </div>
        </section>

        {/* Disclosure Section */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 mb-2 px-4 uppercase tracking-wider">Security & Info</h2>
          <div className="bg-white rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden p-2">
            <div className="flex items-start gap-3 p-3">
              <Info className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-sm mb-1">Testnet Only</div>
                <div className="text-xs text-gray-500">This app operates on testnet only. No real funds.</div>
              </div>
            </div>
            <div className="h-px bg-gray-100 mx-3 my-1" />
            <div className="flex items-start gap-3 p-3">
              <Lock className="w-5 h-5 text-[#0052FF] shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-sm mb-1">No Private Keys</div>
                <div className="text-xs text-gray-500">MusheeBridge never stores or transmits private keys.</div>
              </div>
            </div>
            <div className="h-px bg-gray-100 mx-3 my-1" />
            <div className="flex justify-between items-center p-3">
              <span className="font-medium text-sm">Protocol</span>
              <span className="text-xs text-gray-500">Circle CCTP v2</span>
            </div>
          </div>
        </section>

        <div className="text-center text-xs text-gray-400 mt-4 mb-8">
          MusheeBridge v1.0.0 · Arc Testnet
        </div>
      </main>
    </div>
  );
}
