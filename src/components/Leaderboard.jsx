import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const loadLeaders = async () => {
      const q = query(collection(db, "users"), orderBy("balance", "desc"), limit(20));
      const snap = await getDocs(q);
      const top = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeaders(top);
    };

    loadLeaders();
  }, []);

  return (
    <div className="text-white max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h2>
      <ol className="space-y-3">
        {leaders.map((user, i) => (
          <li
            key={user.id}
            className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
          >
            <span className="font-semibold">
              {i + 1}. {user.username || "Anonymous"}
            </span>
            <span className="text-yellow-300 font-bold">${user.balance}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
