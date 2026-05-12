import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { CheckCircle2, Loader2, Circle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const CHAINS: Record<string, string> = {
  ARC: "Arc Testnet",
  ETH: "Ethereum Sepolia",
  BASE: "Base Sepolia",
  POL: "Polygon Amoy",
  SOL: "Solana Devnet",
};

export default function Progress() {
  const [, setLocation] = useLocation();
  const [draft, setDraft] = useState<{fromChain: string, toChain: string, amount: string} | null>(null);
  const [step, setStep] = useState(3);

  useEffect(() => {
    const data = sessionStorage.getItem("bridgeActive");
    if (data) {
      setDraft(JSON.parse(data));
    } else {
      setLocation("/");
    }
  }, [setLocation]);

  useEffect(() => {
    if (step === 3) {
      const t1 = setTimeout(() => setStep(4), 3000);
      return () => clearTimeout(t1);
    }
    if (step === 4) {
      const t2 = setTimeout(() => setStep(5), 1500);
      return () => clearTimeout(t2);
    }
    return undefined;
  }, [step]);

  if (!draft) return null;

  const isComplete = step === 5;
  const fromName = CHAINS[draft.fromChain];
  const toName = CHAINS[draft.toChain];

  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      <header className="flex items-center justify-center px-4 py-4 sticky top-0 z-10 bg-white">
        <h1 className="text-[17px] font-semibold text-center">
          {isComplete ? "Bridge Complete" : "Bridging USDC"}
        </h1>
      </header>

      <main className="flex-1 p-6 flex flex-col items-center max-w-sm mx-auto w-full">
        {isComplete ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center flex-1 py-12"
          >
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">
              {parseFloat(draft.amount).toFixed(2)} USDC delivered to {toName}
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Your testnet funds have been successfully bridged.
            </p>
          </motion.div>
        ) : (
          <div className="w-full flex-1 pt-8">
            <div className="flex flex-col gap-6 relative">
              {/* Progress Line */}
              <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-100 -z-10" />

              <Step 
                status="complete" 
                title="Approve USDC" 
              />
              <Step 
                status="complete" 
                title={`Burn on ${fromName}`} 
              />
              <Step 
                status={step === 3 ? "active" : step > 3 ? "complete" : "pending"} 
                title="Circle Attestation" 
                description={step === 3 ? "Waiting for Circle attestation... (~1-2 min)" : undefined}
              />
              <Step 
                status={step === 4 ? "active" : step > 4 ? "complete" : "pending"} 
                title={`Mint on ${toName}`} 
              />
              <Step 
                status={step === 5 ? "complete" : "pending"} 
                title="Complete" 
              />
            </div>

            <div className="mt-12 bg-gray-50 rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Burn Tx: 0xabc...def</span>
              <a href="#" className="text-primary p-2 hover:bg-gray-200 rounded-full transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </main>

      <div className="p-4 bg-white sticky bottom-16">
        {isComplete ? (
          <Link href="/">
            <button className="w-full py-4 rounded-full text-lg font-bold bg-primary text-white active:scale-[0.98] transition-all">
              Done
            </button>
          </Link>
        ) : (
          <button className="w-full py-4 rounded-full text-lg font-bold bg-gray-100 text-gray-600 active:bg-gray-200 transition-all">
            View on Explorer
          </button>
        )}
      </div>
    </div>
  );
}

function Step({ status, title, description }: { status: "pending" | "active" | "complete", title: string, description?: string }) {
  return (
    <div className="flex gap-4 min-h-[40px]">
      <div className="mt-0.5 bg-white">
        {status === "complete" && <CheckCircle2 className="w-6 h-6 text-green-500 fill-white" />}
        {status === "active" && <Loader2 className="w-6 h-6 text-primary animate-spin" />}
        {status === "pending" && <Circle className="w-6 h-6 text-gray-300" />}
      </div>
      <div>
        <div className={`font-semibold ${status === "pending" ? "text-gray-400" : "text-gray-900"}`}>
          {title}
        </div>
        {description && (
          <div className="text-sm text-gray-500 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
}
