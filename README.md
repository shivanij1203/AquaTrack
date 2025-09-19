# 💧 AquaTrack

AquaTrack is a transparent, gamified platform to **log and visualize water usage**.  
Built for Hack4Humanity 2025 — theme: *Blockchain for Sustainability*.

---

## 🚨 Problem
Water is one of the most critical resources on Earth, yet:
- Usage is often untracked or invisible.
- Communities lack **transparency** on water distribution.
- Individuals have no **incentive to save water**.

---

## 🌊 Solution
AquaTrack introduces a **blockchain-style logging + gamification system**:
1. **Log Water Usage** – Households/farmers enter daily liters.  
2. **QR Transparency** – Every log generates a scannable QR, linking to a “Mock Explorer” record.  
3. **Gamified Conservation** – Leaderboards, streaks, and badges for water saving.  
4. **Impact Visualizer** – Usage is translated into real-world meaning (e.g. “500L saved = 🌍 drinking water for 100 days”).  
5. **Community Water Pool** – Everyone’s logs fill a shared tank that glows 🌱 green when sustainable, ⚠️ red if overused.  

---

## ✨ Features
- 🔗 **Blockchain-style records** (tamper-proof log simulation).  
- 🏆 **Leaderboard & badges** (💎 Water Saver, 🔥 7-day Streak).  
- 📊 **Interactive charts** of water usage trends.  
- 🌍 **Impact visualizer** that makes numbers relatable.  
- 🏺 **Community tank animation** showing collective usage.  
- 🔐 (Optional) **Wallet login (MetaMask)** for real blockchain integration.  

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS, Recharts  
- **QR Codes:** `qrcode.react`  
- **Blockchain (mock):** Hardhat + local ledger simulation  
- **Deployment-ready for:** Polygon Mumbai / any EVM chain  

---

## 🚀 Getting Started

### 1. Clone the repo
git clone https://github.com/shivanij1203/AquaTrack.git
cd AquaTrack/aquatrack-frontend

### 2. Install dependencies
npm install

### 3. Run locally
npm start
App runs at: http://localhost:3000
