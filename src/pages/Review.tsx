import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

const CHAINS: Record<string, string> = {
  ARC: "Arc Testnet",
  ETH: "Ethereum Sepolia",
  BASE: "Base Sepolia",
  POL: "Polygon Amoy",
  SOL: "Solana Devnet",
};

export default function Review() {
  const [, setLocation] = useLocation();
  const [draft, setDraft] = useState<{fromChain: string, toChain: string, amount: string} | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("bridgeDraft");
    if (data) {
      setDraft(JSON.parse(data));
    } else {
      setLocation("/bridge");
    }
  }, [setLocation]);

  if (!draft) return null;

  const handleConfirm = () => {
    sessionStorage.setItem("bridgeActive", JSON.stringify(draft));
    setLocation("/bridge/progress");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="flex items-center px-4 py-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <Link href="/bridge" className="p-2 -ml-2 text-gray-900 active:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[17px] font-semibold flex-1 text-center pr-6">Review Bridge</h1>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-6">
        <div className="text-center mt-6 mb-2">
          <div className="text-[48px] font-bold text-gray-900 leading-none mb-2">
            {parseFloat(draft.amount).toFixed(2)} USDC
          </div>
          <div className="text-gray-500 font-medium">
            From {CHAINS[draft.fromChain]} → {CHAINS[draft.toChain]}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="text-gray-500">You bridge</span>
            <span className="font-semibold">{parseFloat(draft.amount).toFixed(2)} USDC</span>
          </div>
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="text-gray-500">From</span>
            <span className="font-semibold">{CHAINS[draft.fromChain]}</span>
          </div>
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="text-gray-500">To</span>
            <span className="font-semibold">{CHAINS[draft.toChain]}</span>
          </div>
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="text-gray-500">Network</span>
            <span className="font-semibold">Circle CCTP v2</span>
          </div>
          <div className="flex justify-between items-center p-4 border-b border-gray-100">
            <span className="text-gray-500">Estimated time</span>
            <span className="font-semibold">~2 minutes</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-gray-500">Bridge fee</span>
            <span className="font-semibold text-green-600">Free (testnet)</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 px-6">
          This is a testnet bridge. No real funds. Powered by Circle CCTP.
        </p>
      </main>

      <div className="p-4 bg-white/80 backdrop-blur-md sticky bottom-16 border-t border-gray-100">
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-full text-lg font-bold bg-primary text-white hover:bg-blue-700 active:scale-[0.98] transition-all"
          data-testid="confirm-bridge-btn"
        >
          Confirm Bridge
        </button>
      </div>
    </div>
  );
}
