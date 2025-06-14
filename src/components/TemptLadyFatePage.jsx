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
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 relative">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] mb-10 tracking-wide">
        Tempt Lady Fate
      </h1>

      {/* LOCKED BUTTON */}
      <button
        disabled
        onClick={() => navigate("/temptladyfate/waiting")}
        className={`text-lg font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg tracking-wide bg-gray-700 opacity-60 cursor-not-allowed`}
      >
        {loading ? "🔍 Checking deck..." : readyToPlay ? "⚔️ Find Match" : "🧩 Complete Your Deck"}
      </button>

      {/* Maintenance Notice */}
      <div className="mt-10 bg-red-600 text-white px-6 py-4 rounded-xl text-xl font-bold shadow-lg">
        🔧 Down for Maintenance — Check back soon!
      </div>
    </div>
  );
}
