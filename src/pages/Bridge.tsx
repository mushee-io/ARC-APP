import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowDownUp } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const CHAINS = [
  { id: "ARC", name: "Arc Testnet" },
  { id: "ETH", name: "Ethereum Sepolia" },
  { id: "BASE", name: "Base Sepolia" },
  { id: "POL", name: "Polygon Amoy" },
  { id: "SOL", name: "Solana Devnet" },
];

const BALANCES: Record<string, string> = {
  ARC: "1,000.00",
  ETH: "0.00",
  BASE: "250.00",
  POL: "0.00",
  SOL: "0.00",
};

const BALANCE_VALUES: Record<string, string> = {
  ARC: "1000.00",
  ETH: "0.00",
  BASE: "250.00",
  POL: "0.00",
  SOL: "0.00",
};

export default function Bridge() {
  const [, setLocation] = useLocation();
  const { address, isConnected } = useAccount();

  const [fromChain, setFromChain] = useState("ARC");
  const [toChain, setToChain] = useState("BASE");
  const [amount, setAmount] = useState("");

  const handleSwap = () => {
    if (fromChain === "ARC" || toChain === "ARC") {
      setFromChain(toChain);
      setToChain(fromChain);
    }
  };

  const isInvalidRoute = fromChain !== "ARC" && toChain !== "ARC";
  const isValidAmount = parseFloat(amount) > 0;
  const canProceed = !isInvalidRoute && isValidAmount && isConnected;

  const handleReview = () => {
    if (canProceed) {
      sessionStorage.setItem("bridgeDraft", JSON.stringify({ fromChain, toChain, amount }));
      setLocation("/bridge/review");
    }
  };

  function shortenAddress(addr: string) {
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <Link href="/" className="p-2 -ml-2 text-gray-900 active:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[17px] font-semibold flex-1 text-center">Bridge USDC</h1>
        <div className="w-9" />
      </header>

      {/* Wallet status strip */}
      {isConnected && address ? (
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
          <span className="text-xs text-blue-700 font-mono" data-testid="bridge-wallet-address">
            {shortenAddress(address)}
          </span>
        </div>
      ) : (
        <div className="bg-amber-50 border-b border-amber-100 px-4 py-2.5 flex items-center justify-between gap-3">
          <span className="text-xs text-amber-700 font-medium">Connect a wallet to bridge</span>
          <ConnectButton.Custom>
            {({ openConnectModal, mounted }) =>
              mounted ? (
                <button
                  onClick={openConnectModal}
                  className="text-xs font-bold text-[#0052FF]"
                  data-testid="bridge-connect-btn"
                >
                  Connect
                </button>
              ) : null
            }
          </ConnectButton.Custom>
        </div>
      )}

      <main className="flex-1 p-4 flex flex-col gap-4">
        {/* Chain Selectors */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium text-sm">From</span>
              <select
                value={fromChain}
                onChange={(e) => setFromChain(e.target.value)}
                className="bg-gray-100 rounded-xl px-4 py-2 font-semibold text-gray-900 outline-none appearance-none cursor-pointer text-sm"
                data-testid="from-chain-select"
              >
                {CHAINS.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="h-px bg-gray-100" />

            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium text-sm">To</span>
              <select
                value={toChain}
                onChange={(e) => setToChain(e.target.value)}
                className="bg-gray-100 rounded-xl px-4 py-2 font-semibold text-gray-900 outline-none appearance-none cursor-pointer text-sm"
                data-testid="to-chain-select"
              >
                {CHAINS.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSwap}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 p-2 rounded-full shadow-sm active:bg-gray-50 transition-colors"
            data-testid="swap-chains-btn"
          >
            <ArrowDownUp className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {isInvalidRoute && (
          <div className="text-red-600 text-sm font-medium text-center bg-red-50 py-3 rounded-xl border border-red-100">
            This MVP is Arc-route only.
          </div>
        )}

        {/* Amount Input */}
        <div className="mt-4 flex flex-col items-center bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <span className="text-gray-500 font-medium mb-4 text-sm">You bridge</span>
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-[56px] font-bold text-center text-gray-900 bg-transparent outline-none w-full max-w-[200px] placeholder:text-gray-300 border-0 p-0 focus:ring-0"
              data-testid="amount-input"
            />
            <span className="text-2xl font-bold text-gray-400">USDC</span>
          </div>
          <button
            onClick={() => setAmount(BALANCE_VALUES[fromChain] || "0")}
            className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium active:bg-gray-200 transition-colors"
            data-testid="max-amount-btn"
          >
            Available: {BALANCES[fromChain] || "0.00"} USDC
          </button>
        </div>

        {/* Hyperliquid coming soon */}
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900 text-sm">Hyperliquid / HyperEVM</div>
              <div className="text-xs text-gray-500 mt-0.5">Arc Testnet route</div>
            </div>
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1.5 rounded-full">
              Coming Soon
            </span>
          </div>
        </div>
      </main>

      <div className="p-4 bg-white/80 backdrop-blur-md sticky bottom-16 border-t border-gray-100">
        {!isConnected ? (
          <ConnectButton.Custom>
            {({ openConnectModal, mounted }) =>
              mounted ? (
                <button
                  onClick={openConnectModal}
                  className="w-full py-4 rounded-full text-lg font-bold bg-[#0052FF] text-white active:scale-[0.98] transition-all"
                  data-testid="connect-to-bridge-btn"
                >
                  Connect Wallet to Bridge
                </button>
              ) : null
            }
          </ConnectButton.Custom>
        ) : (
          <button
            onClick={handleReview}
            disabled={!canProceed}
            className={`w-full py-4 rounded-full text-lg font-bold transition-all ${
              canProceed
                ? "bg-[#0052FF] text-white active:scale-[0.98]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            data-testid="review-bridge-btn"
          >
            {isInvalidRoute ? "Invalid Route" : "Review Bridge"}
          </button>
        )}
      </div>
    </div>
  );
}
