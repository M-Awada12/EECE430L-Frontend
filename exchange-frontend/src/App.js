import React, { useState, useEffect } from 'react';
import './App.css';

const SERVER_URL = "http://127.0.0.1:5000";

function App() {

  const [buyUsdRate, setBuyUsdRate] = useState(null);
  const [sellUsdRate, setSellUsdRate] = useState(null);
  const [lbpInput, setLbpInput] = useState("");
  const [usdInput, setUsdInput] = useState("");
  const [transactionType, setTransactionType] = useState("usd-to-lbp");

  function fetchRates() {
    fetch(`${SERVER_URL}/exchangeRate`)
    .then(response => response.json())
    .then(data => {
      setBuyUsdRate(data.lbp_to_usd);
      setSellUsdRate(data.usd_to_lbp);
    });
  }

  useEffect(fetchRates, []);

  function addItem() {
    const x = (transactionType === "usd-to-lbp");

    const data = {
        "usd_amount": usdInput,
        "lbp_amount": lbpInput,
        "usd_to_lbp": x
    };

    fetch(`${SERVER_URL}/transaction`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    });

    setLbpInput("");
    setUsdInput("");

    fetchRates();
  }

  return (
    <div>
      <div className="header">
        <h1>Exchange rate</h1>
      </div>
      <div className="wrapper">
        <h2>Today's Exchange Rate</h2>
        <p>LBP to USD Exchange Rate</p>
        <h3>
          Buy USD: <span id="buy-usd-rate" type="number">{buyUsdRate ? buyUsdRate : "Not available yet"}</span>
        </h3>
        <h3>
          Sell USD: <span id="sell-usd-rate" type="number">{sellUsdRate ? sellUsdRate : "Not available yet"}</span>
        </h3>
        <h2>Record a recent transaction</h2>
        <form name="transaction-entry">
          <div className="amount-input">
            <label htmlFor="lbp-amount">LBP Amount</label>
            <input id="lbp-amount" type="number" value={lbpInput} onChange={e => setLbpInput(e.target.value)}/>
            <label htmlFor="usd-amount">USD Amount</label>
            <input id="usd-amount" type="number" value={usdInput} onChange={e => setUsdInput(e.target.value)}/>
          </div>
          <select id="transaction-type" type="string" value={transactionType} onChange={e => setTransactionType(e.target.value)}>
            <option value="usd-to-lbp">USD to LBP</option>
            <option value="lbp-to-usd">LBP to USD</option>
          </select>
          <button id="add-button" className="button" type="button" onClick={addItem}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
