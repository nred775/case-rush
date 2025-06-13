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
  addDoc // ← add this
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import ProfilePage from "../components/ProfilePage";
import ContactSupportForm from "../components/ContactSupportForm";

const getTopRankClasses = (i) => {
  if (i === 0) return "rank-gold";
  if (i === 1) return "rank-silver";
  if (i === 2) return "rank-bronze";
  return "bg-gray-900 border-gray-700";
};

export default function FateLeaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [reportedUser, setReportedUser] = useState("");
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const loadLeaders = async () => {
      const q = query(collection(db, "users"), orderBy("ladies", "desc"), limit(100));
      const snap = await getDocs(q);
      const rawUsers = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = rawUsers.filter(user => user.username && typeof user.username === "string" && user.username.trim() !== "");
      setLeaders(filtered.map((user, index) => ({ ...user, rank: index + 1 })));
    };
    loadLeaders();
  }, []);

  const handleClickUser = async (user) => {
    const fullSnap = await getDoc(doc(db, "users", user.id));
    const fullData = fullSnap.exists() ? fullSnap.data() : {};
    setSelectedUser({ ...user, ...fullData, readOnly: true });
  };

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

  return (
    <div className="bg-neon-pattern min-h-screen text-white max-w-4xl mx-auto px-8 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">💃 Fate Leaderboard</h2>

      <ol className="space-y-3 sm:space-y-2">
        {leaders.map((user, i) => {
          const isCurrent = currentUser && user.id === currentUser.uid;

          return (
            <li
              key={user.id}
              className={`relative card-shine p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 sm:gap-8 transition-all duration-300
                ${i > 2 ? "card-hover-zoom hover-glow bg-gray-900 border border-gray-700" : getTopRankClasses(i)}
                border-2 ${isCurrent ? "ring-4 ring-blue-950 bg-blue-950/60" : ""}`}
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
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 bg-black/30 hover:scale-110 transition-transform shadow-lg border-gray-400`}
                      />
                    ) : (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl rounded-full border-2 border-white bg-gray-700 shadow">
                        👤
                      </div>
                    )}
                  </button>
                  <span className="text-lg sm:text-xl text-white font-bold">
                    {user.username}
                  </span>
                </div>
              </div>

              <span className="text-pink-400 font-mono text-lg sm:text-xl self-end sm:self-auto">
                💃 {user.ladies || 0}
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
              activePet={selectedUser.activePet}
            />

            {currentUser?.uid !== selectedUser?.id && (
              <div className="text-center p-4 space-y-2">
                <button
                  onClick={sendFriendRequest}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
                >
                  ➕ Add Friend
                </button>
                <button
                  onClick={() => {
                    setReportedUser(selectedUser.username);
                    setShowSupportForm(true);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
                >
                  🚩 Report Player
                </button>

                {showSupportForm && (
                  <ContactSupportForm
                    onClose={() => setShowSupportForm(false)}
                    type="report"
                    reportedUser={reportedUser}
                  />
                )}

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
