import "@rainbow-me/rainbowkit/styles.css";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import Bridge from "@/pages/Bridge";
import Review from "@/pages/Review";
import Progress from "@/pages/Progress";
import Activity from "@/pages/Activity";
import Settings from "@/pages/Settings";
import { BottomNav } from "@/components/BottomNav";
import { wagmiConfig, walletConnectConfigured } from "@/lib/wagmiConfig";

const queryClient = new QueryClient();

function MissingKeyBanner() {
  if (walletConnectConfigured) return null;
  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-700 font-medium">
      WalletConnect Project ID missing. Add VITE_WALLETCONNECT_PROJECT_ID.
    </div>
  );
}

function Router() {
  return (
    <div className="mx-auto max-w-[430px] w-full min-h-screen bg-white relative shadow-[0_0_40px_rgba(0,0,0,0.05)] border-x border-gray-100 flex flex-col">
      <MissingKeyBanner />
      <div className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/bridge" component={Bridge} />
          <Route path="/bridge/review" component={Review} />
          <Route path="/bridge/progress" component={Progress} />
          <Route path="/activity" component={Activity} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#0052FF",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
          })}
        >
          <TooltipProvider>
            <div className="min-h-screen bg-gray-100 flex justify-center">
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
            </div>
            <Toaster />
          </TooltipProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
