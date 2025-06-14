// components/TemptLadyFatePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TemptLadyFatePage({ user }) {
  const navigate = useNavigate();
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkDeckStatus = async () => {
    if (!user || !user.uid) return;
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const cards = data.equippedFateCards || [];
    const isReady = cards.length === 18;

    setReadyToPlay(isReady);
    setLoading(false);
  };

  checkDeckStatus();
}, [user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] mb-10 tracking-wide">
  Tempt Lady Fate
</h1>

<button
  disabled={!readyToPlay || loading}
  onClick={() => navigate("/temptladyfate/waiting")}
  className={`text-lg font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg tracking-wide
    ${
      loading
        ? "bg-gray-500 opacity-50 cursor-wait"
        : readyToPlay
        ? "bg-gradient-to-r from-green-400 via-lime-400 to-green-500 hover:scale-105 hover:shadow-green-300 text-black"
        : "bg-gray-700 opacity-60 cursor-not-allowed"
    }`}
>
  {loading ? "🔍 Checking deck..." : readyToPlay ? "⚔️ Find Match" : "🧩 Complete Your Deck"}
</button>

    </div>
  );
}
