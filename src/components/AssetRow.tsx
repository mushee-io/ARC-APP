import React from "react";
import { ChainIcon } from "./ChainIcon";
import { useLocation } from "wouter";

interface AssetRowProps {
  id: string;
  symbol: string;
  chainName: string;
  balance: number;
  usdValue: number;
  chainCode: string;
}

export function AssetRow({ symbol, chainName, balance, usdValue, chainCode }: AssetRowProps) {
  const [, setLocation] = useLocation();

  const handlePress = () => {
    setLocation(`/bridge?source=${chainCode}`);
  };

  return (
    <button
      onClick={handlePress}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left border-b border-gray-50 last:border-0"
      data-testid={`asset-row-${chainCode}`}
    >
      <div className="flex items-center gap-3">
        <ChainIcon chain={chainCode} />
        <div>
          <div className="font-semibold text-gray-900 text-[17px]">{symbol}</div>
          <div className="text-[13px] text-gray-500">{chainName}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-semibold text-gray-900 text-[17px]">
          {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {symbol}
        </div>
        <div className="text-[13px] text-gray-500">
          ${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      </div>
    </button>
  );
}
