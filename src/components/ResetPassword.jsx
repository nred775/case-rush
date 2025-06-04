// src/components/ResetPassword.jsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../firebase";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const oobCode = params.get("oobCode");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setStatus("✅ Password reset successful! You can now log in.");
    } catch (err) {
      console.error("Reset error:", err);
      setStatus("❌ Invalid or expired reset link.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4 text-yellow-300">🔑 Reset Your Password</h2>
        {status ? (
          <p className="text-lg text-green-400">{status}</p>
        ) : (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 mb-4 rounded bg-black border border-gray-700 placeholder-gray-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleReset}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
