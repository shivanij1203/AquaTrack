import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Explorer from "./Explorer";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ethers } from "ethers";

// 💧 CSS-based Water Tank
function WaterTank({ percent }) {
  return (
    <div className="relative w-32 h-48 border-4 border-blue-600 rounded-b-xl overflow-hidden bg-blue-100 mx-auto shadow-md">
      <div
        className="absolute bottom-0 left-0 w-full bg-blue-400 transition-all duration-700 ease-in-out"
        style={{ height: `${percent}%` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-70 wave"></div>
      </div>
      <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg drop-shadow">
        {percent.toFixed(0)}%
      </p>
    </div>
  );
}

// 🔗 Wallet Login Component
function WalletLogin({ onConnect }) {
  const [address, setAddress] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAddress(accounts[0]);
      onConnect(accounts[0]);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
      {address ? (
        <p className="font-bold text-blue-700">
          ✅ Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          🔗 Connect Wallet
        </button>
      )}
    </div>
  );
}

function Home() {
  const [liters, setLiters] = useState("");
  const [logs, setLogs] = useState([]);
  const [lastTx, setLastTx] = useState(null);
  const [totalLiters, setTotalLiters] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wallet, setWallet] = useState(null);

  // 🎯 Log usage
  const logUsage = () => {
    if (!liters || !wallet) {
      alert("Please connect your wallet and enter liters!");
      return;
    }
    const txHash = "0x" + Math.random().toString(16).slice(2, 10);
    const newLog = {
      id: logs.length + 1,
      liters: parseInt(liters),
      wallet,
      timestamp: new Date().toLocaleString(),
      txHash,
    };
    setLogs([...logs, newLog]);
    setLastTx(newLog);
    setLiters("");
  };

  // 🔄 Totals + streak
  useEffect(() => {
    const total = logs.reduce((sum, log) => sum + log.liters, 0);
    setTotalLiters(total);

    if (logs.length > 0) {
      const days = new Set(
        logs.map((log) => new Date(log.timestamp).toDateString())
      );
      setStreak(days.size);
    }
  }, [logs]);

  // 🌟 Impact messages
  function getImpactMessage(liters) {
    if (liters < 100) return `${liters}L = 🪴 enough for ${Math.max(1, Math.floor(liters / 10))} plants`;
    if (liters < 500) return `${liters}L = 🚿 ${Math.floor(liters / 40)} short showers`;
    if (liters < 1000) return `${liters}L = 🌍 drinking water for ${Math.floor(liters / 5)} days`;
    return `${liters}L = 🏭 supply for ${Math.floor(liters / 50)} households (1 day)`;
  }

  // 🏆 Leaderboard
  const leaderboard = [
    { name: wallet ? wallet.slice(0, 6) + "..." + wallet.slice(-4) : "You", usage: totalLiters },
    { name: "Farmer A", usage: 250 },
    { name: "Household B", usage: 400 },
  ].sort((a, b) => a.usage - b.usage);

  // 🎖️ Badges
  const badges = [];
  if (totalLiters < 200 && totalLiters > 0) badges.push("💎 Water Saver");
  if (streak >= 3) badges.push("🔥 3-Day Streak");

  // 🌍 Community pool
  const communityTarget = 5000;
  const communityLiters = totalLiters + 2000;
  const communityPct = Math.min((communityLiters / communityTarget) * 100, 100);
  const poolColor = communityLiters <= communityTarget ? "bg-green-500" : "bg-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-10 rounded-2xl shadow-xl text-center">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow">💧 AquaTrack</h1>
          <p className="text-xl font-medium leading-relaxed">
            Log water usage, connect your wallet, and build <strong>transparent sustainability records</strong>.
          </p>
        </div>

        {/* Wallet Login */}
        <WalletLogin onConnect={(addr) => setWallet(addr)} />

        {/* How It Works */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
            ⚡ How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Step icon="📝" title="1. Log" desc="Enter your daily usage in liters." />
            <Step icon="🔗" title="2. QR" desc="Every log gets a verifiable record." />
            <Step icon="🌍" title="3. Share" desc="Share QR for transparency & trust." />
          </div>
        </div>

        {/* Total + Impact + Badges */}
        {totalLiters > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-2">💧 Total Water Logged</h3>
            <p className="text-4xl font-extrabold text-blue-800">{totalLiters} L</p>
            <p className="mt-3 text-lg text-green-700 font-semibold">
              {getImpactMessage(totalLiters)}
            </p>
            {badges.length > 0 && (
              <div className="mt-4 flex justify-center gap-4">
                {badges.map((b, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 rounded-full text-blue-700 font-bold">
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Log Usage */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Log Your Usage</h2>
          <div className="flex">
            <input
              type="number"
              value={liters}
              placeholder="Enter liters used"
              onChange={(e) => setLiters(e.target.value)}
              className="flex-grow border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={logUsage}
              className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition"
            >
              Log
            </button>
          </div>
        </div>

        {/* Last Transaction */}
        {lastTx && (
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4 text-blue-800">Last Transaction</h3>
            <p className="text-gray-600 mb-2">Tx Hash: {lastTx.txHash}</p>
            <p className="text-gray-600 mb-2">Liters: {lastTx.liters}</p>
            <p className="text-gray-600 mb-2">
              Wallet: {lastTx.wallet.slice(0, 6)}...{lastTx.wallet.slice(-4)}
            </p>
            <p className="text-gray-600 mb-4">Time: {lastTx.timestamp}</p>
            <div className="flex justify-center">
              <QRCodeCanvas
                value={`${window.location.origin}/explorer/${lastTx.txHash}`}
                size={150}
              />
            </div>
          </div>
        )}

        {/* Usage Trend */}
        {logs.length > 0 && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center text-blue-800">📊 Usage Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={logs}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="liters" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Water Tank */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">🏺 Water Tank</h3>
          <WaterTank percent={Math.min((totalLiters / 1000) * 100, 100)} />
          <p className="mt-2 font-semibold text-blue-700">{totalLiters} L logged</p>
        </div>

        {/* Community Pool */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-2">🌊 Community Water Pool</h3>
          <div className="bg-gray-200 w-full rounded-full h-6">
            <div
              className={`${poolColor} h-6 rounded-full transition-all`}
              style={{ width: `${communityPct}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {communityLiters} / {communityTarget} L used
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <h3 className="text-xl font-bold mb-4 text-blue-800">🏆 Leaderboard</h3>
          <ul className="space-y-2">
            {leaderboard.map((entry, i) => (
              <li key={i} className="p-2 bg-blue-50 rounded-lg font-semibold flex justify-between">
                <span>{i + 1}️⃣ {entry.name}</span>
                <span>{entry.usage} L</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Step = ({ icon, title, desc }) => (
  <div className="p-6 border rounded-xl bg-blue-50 text-center hover:shadow-md transition">
    <span className="text-4xl">{icon}</span>
    <h3 className="font-bold mt-3 text-lg">{title}</h3>
    <p className="text-gray-600 mt-2">{desc}</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer/:txHash" element={<Explorer />} />
      </Routes>
    </Router>
  );
}

export default App;
