import React, { useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function FriendsSidebar({
  friends,
  setSelectedProfileUser,
  setChatUser,
  setFriends,
  user
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    
    <div className="fixed top-20 left-0 z-40 flex items-start">
  <div
    className={`flex transition-transform duration-300 ${
      isOpen ? "translate-x-0" : "-translate-x-60"
    }`}
  >
    {/* Sidebar */}
    <div className="bg-gray-900 text-white p-4 rounded-r-xl border-r border-gray-700 shadow-lg max-h-[90vh] overflow-y-auto w-64">
      <h2 className="text-xl font-bold mb-4">👥 Friends</h2>
      {friends.length === 0 ? (
        <p className="text-gray-400 italic text-sm">No friends yet 🤝</p>
      ) : (
        <ul className="space-y-3">
          {friends.map((f) => {
  console.log("Friend:", f.username, "| Online:", f.online); // ✅ LOG HERE

  return (
    <li
      key={f.uid}
      className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-center justify-between hover:bg-gray-700 transition"
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={async () => {
          const snap = await getDoc(doc(db, "users", f.uid));
          const full = snap.data();
          setSelectedProfileUser({ ...f, ...full, readOnly: true });
        }}
      >
        <div className="relative">
          <img
            src={`/avatars/${(f.avatar || f.equippedAvatar).toLowerCase().replace(/\s+/g, "_")}_head.png`}
            alt="avatar"
            className="w-10 h-10 rounded-full border"
          />
          {f.online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full shadow" />
          )}
        </div>
        <span className="font-semibold truncate">{f.username}</span>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => setChatUser(f)}
          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-sm"
        >
          💬
        </button>
        <button
          onClick={async () => {
            await deleteDoc(doc(db, "users", user.uid, "friends", f.uid));
            await deleteDoc(doc(db, "users", f.uid, "friends", user.uid));
            setFriends((prev) => prev.filter((friend) => friend.uid !== f.uid));
          }}
          className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm"
        >
          ❌
        </button>
      </div>
    </li>
  );
})}

        </ul>
      )}
    </div>

    {/* Toggle Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="h-10 mt-4 bg-gray-800 text-white px-2 py-1 rounded-r-md border-l border-gray-700 hover:bg-gray-700"
    >
      {isOpen ? "«" : "»"}
    </button>
  </div>
</div>

  );
}
