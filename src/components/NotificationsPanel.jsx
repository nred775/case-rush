import React from "react";

export default function NotificationsPanel({ notifications, onClose, setNotifications }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full text-white shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🔔 Notifications</h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-600 text-2xl font-bold"
          >
            ✖
          </button>
        </div>

        {notifications.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No new notifications.</p>
        ) : (
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {notifications.map((note, index) => (
              <li key={note.key || index} className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
                <p>{note.message}</p>
                <div className="flex gap-3 flex-wrap">
                  {note.type === "friend_request" && (
                    <>
                      <button
                        className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded font-semibold text-sm"
                        onClick={() => {
                          note.onAccept?.();
                          setNotifications((prev) => prev.filter((_, i) => i !== index));
                        }}
                      >
                        ✅ Accept
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded font-semibold text-sm"
                        onClick={() => {
                          note.onDecline?.();
                          setNotifications((prev) => prev.filter((_, i) => i !== index));
                        }}
                      >
                        ❌ Decline
                      </button>
                    </>
                  )}

                  {note.type === "chat" && (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded font-semibold text-sm"
                      onClick={() => {
                        note.onAccept?.();
                        setNotifications((prev) => prev.filter((_, i) => i !== index));
                      }}
                    >
                      💬 Open
                    </button>
                  )}

                  {note.type === "achievement" && (
                    <button
                      className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded font-semibold text-sm"
                      onClick={() =>
                        setNotifications((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      🎉 Got it
                    </button>
                  )}

                  {/* Fallback for unknown notification types */}
                  {!["friend_request", "achievement", "chat"].includes(note.type) && (
                    <button
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded font-semibold text-sm"
                      onClick={() =>
                        setNotifications((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      🧼 Clear
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
