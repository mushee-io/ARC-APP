# MusheeBridge — Vercel-ready mobile wallet build

This package is the Vercel-ready version of the Replit MusheeBridge mobile app.

## Vercel settings

Framework Preset: Vite  
Install Command: `npm install`  
Build Command: `npm run build`  
Output Directory: `dist`

## Environment variables

Add these in Vercel → Project → Settings → Environment Variables:

```env
VITE_WALLETCONNECT_PROJECT_ID=d41d61dc950b0c624c8485e185ba6a82
VITE_ARC_TESTNET_RPC=https://rpc.testnet.arc.network
VITE_BRAND_NAME=MusheeBridge
```

## What was fixed for Vercel

- Removed Replit-only `PORT` and `BASE_PATH` build requirements.
- Removed Replit-only Vite plugins from production config.
- Removed workspace/catalog package protocols so `npm install` works.
- Set Vite output to `dist`.
- Added `vercel.json`.
- Kept the Coinbase-style mobile wallet design and WalletConnect/RainbowKit flow.

## Notes

This is a mobile-first MusheeBridge wallet UI. WalletConnect works through RainbowKit/wagmi using the project ID above.
