import React, { useEffect, useRef, useState } from "react";
import { ref, onValue, set, push, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { rtdb } from "../firebase";

export default function FateMatchWaitingRoom({ user, setIsUILocked }) {
  const [roomId, setRoomId] = useState(null);
  const navigate = useNavigate();
  const joinedRef = useRef(false); // ✅ prevents duplicate execution
useEffect(() => {
  setIsUILocked(true);
  return () => setIsUILocked(false);
}, []);

  useEffect(() => {
    if (!user || !user.uid || joinedRef.current) return;

    joinedRef.current = true; // ✅ mark as joined to prevent repeat

    const joinOrCreateRoom = async () => {
      const roomsRef = ref(rtdb, "temptRooms");
      const snapshot = await get(roomsRef);
      const rooms = snapshot.val() || {};
      let joined = false;

      for (const [id, room] of Object.entries(rooms)) {
        if (room.player1 && !room.player2) {
          await set(ref(rtdb, `temptRooms/${id}/player2`), {
            uid: user.uid,
            ready: false,
          });
          setRoomId(id);
          joined = true;
          break;
        }
      }

      if (!joined) {
        const newRoomRef = push(roomsRef);
        const newId = newRoomRef.key;
       await set(newRoomRef, {
  player1: { uid: user.uid, ready: false },
  status: "waiting",
  drawTurn: "player1",           // initial player
  firstDrawer: "player1",        // new: stores who starts the round
  player1Score: 0,
  player2Score: 0,
  player1Card: null,
  player2Card: null,
  player1Ready: false,
  player2Ready: false,
});


        setRoomId(newId);
      }
    };

    joinOrCreateRoom();
  }, [user]);

  useEffect(() => {
    if (!roomId) return;

    const roomRef = ref(rtdb, `temptRooms/${roomId}`);
    const unsub = onValue(roomRef, (snap) => {
      const room = snap.val();
      if (!room) return;

      if (room.player1 && room.player2) {
        navigate(`/temptladyfate/match/${roomId}`);
      }
    });

    return () => unsub();
  }, [roomId, navigate]);

  return (
  <div className="text-white p-6 flex flex-col items-center justify-center min-h-screen">
    <h2 className="text-3xl font-bold text-pink-400 animate-pulse drop-shadow-[0_0_12px_rgba(255,105,180,0.8)] text-center mb-6">
      ⚔️ Matching you with a worthy opponent...
    </h2>

    {/* Cancel Search Button */}
    <button
      onClick={async () => {
        if (roomId) {
          const roomRef = ref(rtdb, `temptRooms/${roomId}`);
          await set(roomRef, null); // delete room
        }
        navigate("/home");
      }}
      className="text-sm bg-gradient-to-r from-gray-600 to-gray-800 px-4 py-2 text-white font-semibold rounded-lg shadow hover:scale-105 hover:shadow-white transition-transform duration-200"
    >
      ❌ Cancel Search
    </button>
  </div>
);

}
