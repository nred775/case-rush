import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ProfilePage from "./ProfilePage";

const getLevelColorClass = (level) => {
  const index = Math.floor(level / 10);
  switch (index) {
    case 0: return "text-white";
    case 1: return "text-yellow-400";
    case 2: return "text-green-400";
    case 3: return "text-green-700";
    case 4: return "text-cyan-300";
    case 5: return "text-cyan-500";
    case 6: return "text-blue-900 drop-shadow-[0_0_6px_rgba(30,64,175,0.6)]";
    case 7: return "text-pink-400 drop-shadow-[0_0_6px_rgba(244,114,182,0.6)]";
    case 8: return "text-purple-500 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]";
    case 9: return "text-yellow-500 drop-shadow-[0_0_5px_rgba(255,255,0,0.8)]";
    case 10: return "text-red-500 drop-shadow-[0_0_6px_rgba(255,80,80,0.8)]";
    default: return "text-red-800 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]";
  }
};

const getLevelBorderClass = (level) => {
  const index = Math.floor(level / 10);
  switch (index) {
    case 0: return "border-white shadow";
    case 1: return "border-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]";
    case 2: return "border-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]";
    case 3: return "border-green-700 shadow-[0_0_6px_rgba(21,128,61,0.8)]";
    case 4: return "border-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.8)]";
    case 5: return "border-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)]";
    case 6: return "border-blue-900 shadow-[0_0_6px_rgba(30,64,175,0.9)]";
    case 7: return "border-pink-400 shadow-[0_0_6px_rgba(244,114,182,0.9)]";
    case 8: return "border-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.9)]";
    case 9: return "border-yellow-500 shadow-[0_0_6px_rgba(255,255,0,1)]";
    case 10: return "border-red-500 shadow-[0_0_6px_rgba(255,80,80,1)]";
    default: return "border-red-800 shadow-[0_0_6px_rgba(255,0,0,1)]";
  }
};

const getAnimationForRank = (i) => {
  if (i === 0) return "animate-pulse-slow";
  if (i === 1) return "animate-glowPulse";
  if (i === 2) return "animate-fade-in-fast";
  return "";
};

const getTopRankClasses = (i) => {
  if (i === 0) return "rank-gold";
  if (i === 1) return "rank-silver";
  if (i === 2) return "rank-bronze";
  return "bg-gray-900 border-gray-700";
};



export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("balance");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const loadLeaders = async () => {
      const q = query(collection(db, "users"), orderBy(sortBy, "desc"), limit(100));
      const snap = await getDocs(q);
      const rawUsers = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = rawUsers.filter(user => user.username && typeof user.username === "string" && user.username.trim() !== "");
      setLeaders(filtered.map((user, index) => ({ ...user, rank: index + 1 })));
    };
    loadLeaders();
  }, [sortBy]);

  const sendFriendRequest = async () => {
    if (!currentUser || !currentUser.uid || !selectedUser?.username) {
      alert("You must be logged in and viewing a valid user.");
      return;
    }

    const senderSnap = await getDoc(doc(db, "users", currentUser.uid));
    const senderUsername = senderSnap.data()?.username || "Anonymous";

    const receiverSnap = await getDoc(doc(db, "usernames", selectedUser.username.toLowerCase()));
    if (!receiverSnap.exists()) {
      alert("User not found.");
      return;
    }

    const receiverUid = receiverSnap.data().uid;

    await addDoc(collection(db, "users", receiverUid, "friendRequests"), {
      from: senderUsername,
      fromUid: currentUser.uid,
      sentAt: Date.now(),
    });

    setToastMessage("✅ Friend request sent!");
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleClickUser = async (user) => {
    const fullSnap = await getDoc(doc(db, "users", user.id));
    const fullData = fullSnap.exists() ? fullSnap.data() : {};
    setSelectedUser({ ...user, ...fullData, readOnly: true });
  };

  return (
    <div className="bg-neon-pattern min-h-screen text-white max-w-4xl mx-auto px-8 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h2>

      <input
        type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 px-3 py-1.5 text-sm bg-gray-800 text-white placeholder-gray-400 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <div className="flex justify-center gap-4 mb-6">
        {[{ label: "💰 Balance", value: "balance", class: "glow-core" }, { label: "💠 Opals", value: "opals", class: "glow-avatars" }, { label: "📈 Level", value: "level", class: "glow-cases" }].map(({ label, value, class: glowClass }) => (
          <button
            key={value}
            onClick={() => setSortBy(value)}
            className={`glow-btn ${glowClass} px-4 py-2 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${sortBy === value ? "scale-110 ring-2 ring-white" : "opacity-80 hover:opacity-100"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <ol className="space-y-3 sm:space-y-2">
        {leaders
          .filter((user) => user.username?.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((user) => {
            const i = user.rank - 1;
            const isCurrent = currentUser && user.id === currentUser.uid;
            
            return (
              <li
  key={user.id}
className={`relative card-shine p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-8 transition-all duration-300
  ${i > 2 ? "card-hover-zoom hover-glow bg-gray-900 border border-gray-700" : getTopRankClasses(i)}
  border-2 ${isCurrent ? "ring-4 ring-blue-950 bg-blue-950/60" : ""} ${getAnimationForRank(i)}`}
  style={i === 0 ? { backgroundColor: "#1f1f0f", border: "2px solid #facc15" } : i === 1 ? { backgroundColor: "#1f1f1f", border: "2px solid #d1d5db" } : i === 2 ? { backgroundColor: "#2a1a0f", border: "2px solid #fdba74" } : {}}
>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full text-black font-extrabold bg-yellow-400 shadow-lg ring-2 ring-yellow-300">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={() => handleClickUser(user)}>
                      {user.equippedAvatar ? (
                        <img
                          src={`/avatars/${user.equippedAvatar.toLowerCase().replace(/\s+/g, "_")}_head.png`}
                          alt={user.equippedAvatar}
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 bg-black/30 hover:scale-110 transition-transform shadow-lg ${getLevelBorderClass(user.level || 1)} drop-shadow-glow`}
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl rounded-full border-2 border-white bg-gray-700 shadow">
                          👤
                        </div>
                      )}
                    </button>
                    <span className={`text-lg sm:text-xl ${getLevelColorClass(user.level || 1)}`}>
                      [{user.level || 1}] <span className="font-bold">{user.username || "Anonymous"}</span>
                    </span>
                  </div>
                </div>

                <span className="text-green-300 font-mono text-lg sm:text-xl self-end sm:self-auto">
                  {sortBy === "balance"
                    ? `$${Number(user.balance).toLocaleString()}`
                    : sortBy === "opals"
                    ? `💠 ${Number(user.opals || 0).toLocaleString()}`
                    : `📈 Level ${user.level || 1}`}
                </span>
              </li>
            );
          })}
      </ol>

      {selectedUser && (
<div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 pointer-events-auto">
<div className="bg-gray-900 rounded-2xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh] custom-scroll">
            <button
  onClick={() => setSelectedUser(null)}
  className="absolute top-[1.8rem] right-[1.8rem] text-white text-2xl font-bold hover:text-red-500 z-50"
>
  ✖
</button>








            <ProfilePage
              currentUser={null}
              username={selectedUser.username}
              level={selectedUser.level}
              xp={selectedUser.xp}
              balance={selectedUser.balance}
              opals={selectedUser.opals}
              equippedAvatar={selectedUser.equippedAvatar}
              ownedWorkers={selectedUser.ownedWorkers}
              profileWorkers={selectedUser.profileWorkers}
              setProfileWorkers={() => {}}
              readOnly
              badges={selectedUser.badges || []}
            />
            {currentUser?.uid !== selectedUser?.id && (
              <div className="text-center p-4 space-y-2">
                <button
                  onClick={sendFriendRequest}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
                >
                  ➕ Add Friend
                </button>
                {toastMessage && (
                  <div className="text-green-300 text-sm font-medium animate-pulse">
                    {toastMessage}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
