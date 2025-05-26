import React, { useState, useEffect } from "react";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase";

const ResetPassword = () => {
  const [oobCode, setOobCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("oobCode");
    if (code) {
      setOobCode(code);
      verifyPasswordResetCode(auth, code)
        .then(() => setVerified(true))
        .catch(() => setMessage("Invalid or expired reset link."));
    }
  }, []);

  const handleReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage("✅ Password has been reset. You can now log in.");
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  if (!verified) return <div className="text-white p-4">{message}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black px-4">
      <h2 className="text-2xl font-bold mb-4">🔐 Reset Your Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        className="p-2 rounded bg-gray-800 text-white mb-3 w-full max-w-sm"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition font-semibold"
      >
        Reset Password
      </button>
      {message && <p className="mt-4 text-yellow-400">{message}</p>}
    </div>
  );
};

export default ResetPassword;
