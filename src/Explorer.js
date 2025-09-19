import React from "react";
import { useParams } from "react-router-dom";

function Explorer() {
  const { txHash } = useParams();

  const mockData = {
    liters: 200,
    timestamp: new Date().toLocaleString(),
    status: "✅ Confirmed"
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "2rem" }}>
      <h1>🔎 MockScan Explorer</h1>
      <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
        <p><strong>Tx Hash:</strong> {txHash}</p>
        <p><strong>Water Used:</strong> {mockData.liters} L</p>
        <p><strong>Timestamp:</strong> {mockData.timestamp}</p>
        <p><strong>Status:</strong> {mockData.status}</p>
      </div>
    </div>
  );
}

export default Explorer;
