import { useState } from "react";
import { ArrowRightLeft, ExternalLink } from "lucide-react";
import { ChainIcon } from "@/components/ChainIcon";

const HISTORY = [
  { id: 1, route: "Arc → Base Sepolia", from: "ARC", amount: "+250.00 USDC", status: "Completed", time: "2 min ago", type: "bridge" },
  { id: 2, route: "Arc → Ethereum Sepolia", from: "ARC", amount: "+100.00 USDC", status: "Completed", time: "1 hour ago", type: "bridge" },
  { id: 3, route: "Base Sepolia → Arc", from: "BASE", amount: "+100.00 USDC", status: "Pending", time: "3 hours ago", type: "bridge" },
  { id: 4, route: "Arc → Polygon Amoy", from: "ARC", amount: "+50.00 USDC", status: "Completed", time: "Yesterday", type: "bridge" },
  { id: 5, route: "Ethereum Sepolia → Arc", from: "ETH", amount: "+500.00 USDC", status: "Completed", time: "2 days ago", type: "bridge" },
];

export default function Activity() {
  const [filter, setFilter] = useState("All");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <header className="px-6 py-4 bg-white sticky top-0 z-10 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
        
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
          {["All", "Bridges", "Received"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1">
        <div className="bg-white border-t border-gray-100">
          {HISTORY.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ChainIcon chain={tx.from} />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                    <ArrowRightLeft className="w-3 h-3 text-gray-600" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Bridge to {tx.route.split(" → ")[1]}</div>
                  <div className="text-[13px] text-gray-500 mt-0.5">{tx.time}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-gray-900">{tx.amount}</div>
                <div className={`text-[12px] font-medium mt-1 inline-block px-2 py-0.5 rounded-full ${
                  tx.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {tx.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
