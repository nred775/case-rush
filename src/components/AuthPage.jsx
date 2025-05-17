import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function AuthPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    try {
      let userCred;
      if (isLogin) {
        userCred = await signInWithEmailAndPassword(auth, email, pass);
      } else {
        userCred = await createUserWithEmailAndPassword(auth, email, pass);
      }
      onLogin(userCred.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuest = async () => {
    try {
      const userCred = await signInAnonymously(auth);
      onLogin(userCred.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);
      onLogin(userCred.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎰 Case Rush</h1>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded text-black"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleAuth}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded font-semibold"
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>

        <p
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          className="mt-4 text-sm text-blue-300 underline cursor-pointer"
        >
          {isLogin
            ? "Need an account? Sign up here"
            : "Already have an account? Log in"}
        </p>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <button
            onClick={handleGoogle}
            className="w-full py-2 mb-3 bg-red-500 hover:bg-red-600 rounded font-semibold"
          >
            🔒 Continue with Google
          </button>
          <button
            onClick={handleGuest}
            className="w-full py-2 bg-gray-700 hover:bg-gray-800 rounded font-semibold"
          >
            🎮 Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
