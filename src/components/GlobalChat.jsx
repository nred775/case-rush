import React, { useEffect, useState, useRef } from "react";
import { ref, push, onValue } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { rtdb, db } from "../firebase";
import bannedUsernames from "../data/bannedUsernames";
import ProfilePage from "./ProfilePage";
import ContactSupportForm from "./ContactSupportForm";


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

export default function GlobalChat({ user, username }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [userInfoCache, setUserInfoCache] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
const [showSupportForm, setShowSupportForm] = useState(false);
const [reportedUser, setReportedUser] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const chatRef = ref(rtdb, "globalChat");
    return onValue(chatRef, async (snapshot) => {
      const val = snapshot.val();
      const parsed = val ? Object.entries(val).map(([id, msg]) => ({ id, ...msg })) : [];
      const recent = parsed.slice(-100);

      const newCache = { ...userInfoCache };
      await Promise.all(
        recent.map(async (msg) => {
          if (msg.uid && !newCache[msg.uid]) {
            const snap = await getDoc(doc(db, "users", msg.uid));
            if (snap.exists()) {
              newCache[msg.uid] = { ...snap.data(), id: msg.uid };
            }
          }
        })
      );

      setUserInfoCache(newCache);
      setMessages(recent);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const containsBadWords = (text) => {
    const lower = text.toLowerCase();
    return bannedUsernames.some((bad) => lower.includes(bad));
  };

  const sendMessage = () => {
    const trimmed = newMsg.trim();
    if (!trimmed) return;

    if (containsBadWords(trimmed)) {
      alert("🚫 Message contains inappropriate language.");
      return;
    }

    push(ref(rtdb, "globalChat"), {
      text: trimmed,
      from: username || "Guest",
      uid: user?.uid || "",
      timestamp: Date.now(),
    });
    setNewMsg("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-black bg-opacity-70 p-4 rounded-xl shadow-lg flex flex-col gap-2">
      <div className="overflow-y-auto max-h-80 px-2 space-y-2">
        {messages.map((msg) => {
          const info = userInfoCache[msg.uid] || {};
          const level = info.level || 1;
          const avatar = info.equippedAvatar
            ? `/avatars/${info.equippedAvatar.toLowerCase().replace(/\s+/g, "_")}_head.png`
            : null;

          return (
            <div key={msg.id} className="text-sm flex items-center gap-2">
              <button onClick={() => setSelectedUser(info)} className="flex items-center gap-1 group">
                {avatar ? (
                  <img src={avatar} alt="avatar" className="w-6 h-6 rounded-full border border-white" />
                ) : (
                  <div className="w-6 h-6 flex items-center justify-center text-xs rounded-full border border-white bg-gray-700">👤</div>
                )}
                <span className={`font-bold group-hover:underline ${getLevelColorClass(level)}`}>
                  [{level}] {msg.from}
                </span>
              </button>
              <span className="text-white">{msg.text}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 px-3 py-2 rounded-md bg-gray-800 text-white"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh] custom-scroll">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-red-500"
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

            <div className="text-center p-4 space-y-2">
              <button
                onClick={() => alert("Friend request feature here.")}
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


            </div>
          </div>
        </div>
      )}
    </div>
  );
}
