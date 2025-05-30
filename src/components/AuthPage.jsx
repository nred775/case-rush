// src/components/AuthPage.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { browserSessionPersistence, setPersistence } from "firebase/auth";



const getFriendlyAuthError = (error) => {
  const code = error.code;
  const messages = {
    "auth/invalid-email": "That doesn't look like a valid email.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "That password doesn’t match.",
    "auth/invalid-credential": "That password doesn’t match.", // ✅ new fallback
    "auth/email-already-in-use": "This email is already registered.",
    "auth/weak-password": "Use a stronger password (6+ characters).",
    "auth/missing-password": "Enter a password.",
    "auth/network-request-failed": "Check your internet connection.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
  };

  if (!messages[code]) {
    console.warn("⚠️ Unmapped Firebase auth error:", code);
  }

  return messages[code] || "Something went wrong. Try again.";
};

const AuthPage = ({ onLogin, setLoginBlocked, loginBlocked }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showResetBox, setShowResetBox] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [blockedMessage, setBlockedMessage] = useState("");
  const [showSupportBox, setShowSupportBox] = useState(false);
const [deferredPrompt, setDeferredPrompt] = useState(null);
const [isSafari, setIsSafari] = useState(false);

useEffect(() => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(userAgent);
  setIsSafari(isIOS && isSafariBrowser);
}, []);


useEffect(() => {
  const handlePrompt = (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
  };
  window.addEventListener('beforeinstallprompt', handlePrompt);
  return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
}, []);

const handleInstall = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null);
    });
  }
};



const loginBlockedRef = useRef(false);

useEffect(() => {
  loginBlockedRef.current = loginBlocked;
}, [loginBlocked]);



const handleAuth = async (e) => {
  e.preventDefault();
  setError("");

  try {
    await setPersistence(auth, browserSessionPersistence);
const userCred = isRegistering
  ? await createUserWithEmailAndPassword(auth, email, password)
  : await signInWithEmailAndPassword(auth, email, password);
    const tempUid = userCred.user.uid;

    try {
      const userDocRef = doc(db, "users", tempUid);
      const userDocSnap = await getDoc(userDocRef);

      const userData = userDocSnap.data();

      if (userData?.online) {
  await signOut(auth);
  setLoginBlocked(); // 🧼 Tell App.js: ignore this login attempt
setBlockedMessage("You are already logged in elsewhere.");
  return;
}

    } catch (docErr) {
  console.error("❌ Failed to read user doc:", docErr);
  if (loginBlockedRef.current) return; // ✅ Stop if already blocked
  await signOut(auth);
  setError("Could not verify account status. Try again.");
  return;
}



    // ✅ If registering, create user doc
    if (isRegistering) {
      await setDoc(doc(db, "users", tempUid), {
        createdAt: Date.now(),
        balance: 0,
        xp: 0,
        level: 1,
        ownedWorkers: [],
        ownedAvatars: [],
        completedSets: [],
        claimedRewards: [],
        online: false,
      });
    }

onLogin(userCred.user); // ✅ match the prop

  } catch (err) {
    console.error("🔥 Firebase login error:", err);
    if (!auth.currentUser) {
      setError(getFriendlyAuthError(err));
    }
  }
};





  const handleGuest = async () => {
    try {
      const userCred = await signInAnonymously(auth);
onLogin(userCred.user);
    } catch (err) {
      console.error(err);
      setError(getFriendlyAuthError(err));
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
onLogin(userCred.user);
    } catch (err) {
      console.error(err);
      setError(getFriendlyAuthError(err));
    }
  };

  return (
    <div className="min-h-screen bg-black bg-neon-pattern flex items-center justify-center px-4 text-white">
      
      <form
        onSubmit={handleAuth}
        className="bg-gray-900 bg-opacity-90 border border-fuchsia-500 shadow-[0_0_25px_rgba(255,0,255,0.3)] rounded-2xl p-6 w-full max-w-sm space-y-4 backdrop-blur-sm"
      >
        {loginBlocked && (
  <p className="text-red-500 text-center font-semibold mb-2">
    ❌ You are already logged in elsewhere.
  </p>
)}


        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-400 drop-shadow">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>
        {(deferredPrompt || isSafari) && (
  <div className="text-center mt-2">
    <button
      onClick={() => {
        if (deferredPrompt) {
          handleInstall();
        } else {
          alert("To install this app:\n\n1. Tap the Share button (📤) at the bottom.\n2. Tap 'Add to Home Screen'.");
        }
      }}
      className="bg-yellow-400 text-black font-bold px-4 py-2 rounded shadow hover:bg-yellow-500 transition"
    >
      📱 Get the App
    </button>
  </div>
)}


        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="📧 Email"
          className="w-full p-2 rounded-lg bg-black bg-opacity-70 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="🔒 Password"
          className="w-full p-2 rounded-lg bg-black bg-opacity-70 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {!isRegistering && (
  <div className="flex justify-between text-sm mt-[-10px]">
    <span
      onClick={() => setShowSupportBox(true)}
      className="text-yellow-400 hover:underline cursor-pointer"
    >
      Contact Support
    </span>
    <span
      onClick={() => setShowResetBox(true)}
      className="text-yellow-400 hover:underline cursor-pointer"
    >
      Forgot Password?
    </span>
  </div>
)}

       
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-fuchsia-500 text-black font-bold py-2 rounded-lg hover:brightness-110 transition"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
        <div className="flex justify-between text-sm">
          <span
            onClick={() => setIsRegistering(!isRegistering)}
            className="cursor-pointer text-blue-400 hover:underline"
          >
            {isRegistering ? "Already have an account?" : "Create an account"}
          </span>
          <span
            onClick={handleGuest}
            className="cursor-pointer text-green-400 hover:underline"
          >
            🎮 Continue as Guest
          </span>
        </div>
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
        >
          🔐 Sign in with Google
        </button>
      </form>

      {showResetBox && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-sm text-white relative">
            <button
              onClick={() => setShowResetBox(false)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-lg"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-3 text-center text-yellow-300">
              Reset Your Password
            </h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-2 rounded bg-black border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
            />
            <button
              onClick={async () => {
                if (!resetEmail) return setError("Please enter an email.");
                try {
                  await sendPasswordResetEmail(auth, resetEmail, {
                    url: "https://stackedodds.net/reset-password",
                  });
                  setError("📬 Password reset email sent. Check your inbox.");
                  setShowResetBox(false);
                } catch (err) {
                  console.error(err);
                  setError(getFriendlyAuthError(err));
                }
              }}
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition"
            >
              Send Reset Email
            </button>
          </div>
        </div>
      )}

      {showSupportBox && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-sm text-white relative">
      <button
        onClick={() => setShowSupportBox(false)}
        className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-lg"
      >
        ✖
      </button>
      <h2 className="text-xl font-bold mb-4 text-center text-yellow-300">
        📧 Contact Support
      </h2>
      <p className="text-sm text-center mb-4 break-words">Email: <span className="font-mono">stackedodds.net@gmail.com</span></p>
      <button
        onClick={() => {
          navigator.clipboard.writeText("stackedodds.net@gmail.com");
        }}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition"
      >
        📋 Copy to Clipboard
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default AuthPage;
