import { useState, useEffect } from "react";
import CrateShop from "./components/CrateShop";
import InventoryPanel from "./components/InventoryPanel";
import CrateOpening from "./components/CrateOpening";
import GlobalAudio from "./components/GlobalAudio";
import AuthPage from "./components/AuthPage";
import Leaderboard from "./components/Leaderboard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [selectedCrate, setSelectedCrate] = useState(null);
  const [username, setUsername] = useState("");
  const [needsUsername, setNeedsUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadUserData(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const loadUserData = async (user) => {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const data = snap.data();
      setBalance(data.balance || 0);
      setInventory(data.inventory || []);
      setUsername(data.username || "");
      setNeedsUsername(!data.username);
    } else {
      setBalance(100);
      setInventory([]);
      setUsername("");
      setNeedsUsername(true);
    }
  };

  const saveUserData = async (newBalance, newInventory) => {
    if (!user || user.isAnonymous) return;
    await setDoc(doc(db, "users", user.uid), {
      balance: newBalance,
      inventory: newInventory,
      username: username || "",
    });
  };

  const handleOpenCrate = (crate) => {
    if (balance >= crate.cost) {
      const newBalance = balance - crate.cost;
      setBalance(newBalance);
      saveUserData(newBalance, inventory);
      setSelectedCrate(crate);
    }
  };

  const handleDrawnItem = () => {};

  const handleSell = (amount) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    saveUserData(newBalance, inventory);
    resetCrate();
  };

  const handleAddToInventory = (item) => {
    if (!item || !selectedCrate) return;
    const updatedInventory = [
      ...inventory,
      {
        case: selectedCrate.name,
        item: item.name,
        value: item.value,
      },
    ];
    setInventory(updatedInventory);
    saveUserData(balance, updatedInventory);
    resetCrate();
  };

  const handleSellFromInventory = (index) => {
    const item = inventory[index];
    const updatedInventory = inventory.filter((_, i) => i !== index);
    const newBalance = balance + item.value;
    setInventory(updatedInventory);
    setBalance(newBalance);
    saveUserData(newBalance, updatedInventory);
  };

  const resetCrate = () => {
    setSelectedCrate(null);
  };

  if (!user) {
    return <AuthPage onLogin={setUser} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col items-center relative">
        <GlobalAudio />

        {/* 💰 Balance */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full shadow-xl border-4 border-yellow-200 text-lg sm:text-xl font-bold tracking-wide">
          💰 Balance: ${balance.toFixed(2)}
        </div>

        {/* 🚪 Logout Button */}
        <button
          onClick={() => signOut(auth)}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
        >
          🚪 Log Out
        </button>

        {/* 👤 Username Floating Tag */}
        {username && (
          <div className="fixed top-4 left-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold opacity-90">
            👤 {username}
          </div>
        )}

        <h1 className="text-4xl font-bold mt-24 mb-2">🎰 Case Rush</h1>

        {/* Nav */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
          >
            🛍️ Shop
          </Link>
          <Link
            to="/inventory"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
          >
            📦 Inventory
          </Link>
          <Link
            to="/leaderboard"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-transform hover:scale-105"
          >
            🏆 Leaderboard
          </Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              !selectedCrate ? (
                <CrateShop balance={balance} onOpenCrate={handleOpenCrate} />
              ) : (
                <CrateOpening
                  crate={selectedCrate}
                  value={null}
                  onSell={handleSell}
                  onAdd={handleAddToInventory}
                  onBack={resetCrate}
                  onDrawn={handleDrawnItem}
                />
              )
            }
          />
          <Route
            path="/inventory"
            element={
              <InventoryPanel
                inventory={inventory}
                onSellItem={handleSellFromInventory}
              />
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>

        {/* 📝 Username Prompt Overlay */}
        {needsUsername && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4 text-white">Choose a Username</h2>
              <input
                type="text"
                className="w-full p-2 rounded text-black mb-2"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
              />
              {usernameError && (
                <p className="text-red-500 text-sm mb-3">{usernameError}</p>
              )}
              <button
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
                onClick={async () => {
                  const lower = username.trim().toLowerCase();
                  if (!lower || lower.length < 3 || lower.length > 20) {
                    setUsernameError("Username must be 3–20 characters.");
                    return;
                  }

                  const existing = await getDoc(doc(db, "usernames", lower));
                  if (existing.exists()) {
                    setUsernameError("That username is already taken.");
                    return;
                  }

                  await setDoc(doc(db, "users", user.uid), { username }, { merge: true });
                  await setDoc(doc(db, "usernames", lower), { uid: user.uid });
                  setNeedsUsername(false);
                }}
              >
                Save Username
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
