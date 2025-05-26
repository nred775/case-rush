import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";


export default function ChatBox({ currentUser, currentUsername, otherUser, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !otherUser) return;

    const chatId = [currentUser.uid, otherUser.uid].sort().join("_");
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp"));
    
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map((doc) => doc.data());
      setMessages(msgs);
    });

    return () => unsub();
  }, [currentUser, otherUser]);

  const sendMessage = async () => {
    if (!newMsg.trim() || !currentUser?.uid || !otherUser?.uid) return;

    const chatId = [currentUser.uid, otherUser.uid].sort().join("_");

    await addDoc(collection(db, "chats", chatId, "messages"), {
      sender: currentUser.uid,
      text: newMsg.trim(),
timestamp: serverTimestamp()
    });

    // 🔔 Send notification to recipient
    if (currentUsername && currentUsername.trim() !== "") {
  await addDoc(collection(db, "users", otherUser.uid, "notifications"), {
    type: "chat",
    from: currentUsername,
    fromUid: currentUser.uid,
    timestamp: Date.now(),
  });
}


    setNewMsg("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full shadow-xl p-4 text-white flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">💬 Chat with {otherUser.username}</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-600 text-2xl font-bold">✖</button>
        </div>
<div className="flex flex-col gap-2 h-64 overflow-y-auto border border-gray-700 p-2 rounded custom-scroll pr-2">
          {messages.map((msg, i) => (
<div
  key={i}
  className={`flex ${msg.sender === currentUser.uid ? "justify-end" : "justify-start"}`}
>
  <div
    className={`text-base px-4 py-2 rounded-full max-w-xs break-words border border-black ${
      msg.sender === currentUser.uid
        ? "bg-blue-400 text-black"
        : "bg-gray-300 text-black"
    }`}
  >
    {msg.text}
  </div>
</div>

          ))}
          <div ref={bottomRef} />
        </div>
        <div className="flex gap-2">
          <input
  className="flex-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
