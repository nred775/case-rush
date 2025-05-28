import CrateShop from "./components/CrateShop";
import InventoryPanel from "./components/InventoryPanel";
import CrateOpening from "./components/CrateOpening";
import AuthPage from "./components/AuthPage";
import Leaderboard from "./components/Leaderboard";
import WheelSpin from "./components/WheelSpin";
import WheelOpening from "./components/WheelOpening";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import { ref, onDisconnect, onValue, set as rtdbSet, remove as rtdbRemove } from "firebase/database";
import { rtdb } from "./firebase"; // ✅ pull configured instance

import { useState, useEffect, useRef } from "react";
import SetsPanel from "./components/SetsPanel";
import WorkersPanel from "./components/WorkersPanel"; // 👈 add this
import AvatarsShopPanel from "./components/AvatarsShopPanel";
import workersData from "./data/workers";
import { logEVs } from "./calcEV"; // path matches location
import LevelsPanel from "./components/LevelsPanel";
import BombGrid from "./components/BombGrid";
import ProfilePage from "./components/ProfilePage";
import bannedUsernames from "./data/bannedUsernames";
import NotificationsPanel from "./components/NotificationsPanel";
import ChatBox from "./components/ChatBox";
import GameIdeas from "./components/GameIdeas";
import { get } from "firebase/database";
import Blackjack from "./components/Blackjack";
import WelcomePage from "./components/WelcomePage";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';






const enforceWriteLimit = async () => {
  const usageRef = doc(db, "usage", "global");
  const usageSnap = await getDoc(usageRef);
  const data = usageSnap.data();
  const now = new Date();
  const today = now.toISOString().split("T")[0]; // "YYYY-MM-DD"

  if (!data || data.date !== today) {
    await setDoc(usageRef, {
      date: today,
      writeCount: 1,
      limit: 20000,
    });
    return true;
  }

  if (data.writeCount >= data.limit) {
    alert("⚠️ Site is down. Data won’t be saved. Try again later.");
    return false;
  }

  await setDoc(usageRef, {
    ...data,
    writeCount: data.writeCount + 1,
  });

  return true;
};




const getLevelColorClass = (level) => {
  const index = Math.floor(level / 10);
  switch (index) {
    case 0: return "text-white";
    case 1: return "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]";
    case 2: return "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.9)]";
    case 3: return "text-green-700 drop-shadow-[0_0_8px_rgba(21,128,61,0.9)]";
    case 4: return "text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.9)]";
    case 5: return "text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]";
    case 6: return "text-blue-900 drop-shadow-[0_0_10px_rgba(30,64,175,1)]";
    case 7: return "text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,1)]";
    case 8: return "text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,1)]";
    case 9: return "text-yellow-500 drop-shadow-[0_0_10px_rgba(255,255,0,1)]";
    case 10: return "text-red-500 drop-shadow-[0_0_10px_rgba(255,80,80,1)]";
    default: return "text-red-800 drop-shadow-[0_0_10px_rgba(255,0,0,1)]";
  }
};
const getLevelBorderClass = (level) => {
  const index = Math.floor(level / 10);
  switch (index) {
    case 0: return "border-white shadow";
    case 1: return "border-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]";
    case 2: return "border-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]";
    case 3: return "border-green-700 shadow-[0_0_6px_rgba(21,128,61,0.8)]";
    case 4: return "border-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.8)]";
    case 5: return "border-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)]";
    case 6: return "border-blue-900 shadow-[0_0_6px_rgba(30,64,175,0.9)]";
    case 7: return "border-pink-400 shadow-[0_0_6px_rgba(244,114,182,0.9)]";
    case 8: return "border-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.9)]";
    case 9: return "border-yellow-500 shadow-[0_0_6px_rgba(255,255,0,1)]";
    case 10: return "border-red-500 shadow-[0_0_6px_rgba(255,80,80,1)]";
    default: return "border-red-800 shadow-[0_0_6px_rgba(255,0,0,1)]";
  }
};







function App() {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
const [inventory, setInventory] = useState([]);
const [opals, setOpals] = useState(0);
const [ownedWorkers, setOwnedWorkers] = useState([]);

const [selectedCrate, setSelectedCrate] = useState(null);
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [username, setUsername] = useState("");
  const [needsUsername, setNeedsUsername] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [bgmOn, setBgmOn] = useState(true);
  const [ownedAvatars, setOwnedAvatars] = useState([]);
const [equippedAvatar, setEquippedAvatar] = useState("");
const [showSettings, setShowSettings] = useState(false);
const [showUsernameEditor, setShowUsernameEditor] = useState(false);
const [tempUsername, setTempUsername] = useState("");
const [overallVolume, setOverallVolume] = useState(0.5);
const [tickVolume, setTickVolume] = useState(0.5);
const [caseVolume, setCaseVolume] = useState(0.5);
const [bgmVolume, setBgmVolume] = useState(0.5);
const [isMuted, setIsMuted] = useState(false);
const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
const [completedSets, setCompletedSets] = useState([]);
const [xp, setXp] = useState(0);
const [level, setLevel] = useState(1);
const [claimedRewards, setClaimedRewards] = useState([]);
const [profileWorkers, setProfileWorkers] = useState([]);
const [showFriends, setShowFriends] = useState(false);
const [showNotifications, setShowNotifications] = useState(false);
const [notifications, setNotifications] = useState([]);
const [friends, setFriends] = useState([]);
const [selectedProfileUser, setSelectedProfileUser] = useState(null);
const [chatUser, setChatUser] = useState(null);
const [userBadges, setUserBadges] = useState([]);
const [toastMessage, setToastMessage] = useState("");
const [friendToRemove, setFriendToRemove] = useState(null);
const [macroCheckVisible, setMacroCheckVisible] = useState(() => {
  const stored = localStorage.getItem("macroCheckVisible");
  return stored === "true";
});
const [macroBlocked, setMacroBlocked] = useState(() => {
  return localStorage.getItem("macroBlocked") === "true";
});
const [openCount, setOpenCount] = useState(() => {
  const stored = localStorage.getItem("openCount");
  return stored ? parseInt(stored, 10) : 0;
});
const [macroThreshold, setMacroThreshold] = useState(() => {
  const stored = localStorage.getItem("macroThreshold");
  return stored ? parseInt(stored, 10) : Math.floor(Math.random() * 11) + 25;
});


const [macroButtonPos, setMacroButtonPos] = useState({ top: "50%", left: "50%" });
const [isUILocked, setIsUILocked] = useState(false); // 👈 NEW
const [loginBlocked, setLoginBlocked] = useState(false);
const [trackedSet, setTrackedSet] = useState(null);
const [topBarButtons, setTopBarButtons] = useState(["home", "notifications"]);
const [showTopBarEditor, setShowTopBarEditor] = useState(false);





  const bgmRef = useRef(null);
const sensors = useSensors(useSensor(PointerSensor));



  const navigationLocked = !!selectedCrate || !!selectedWheel;
useEffect(() => {
  if (!user || user.isAnonymous || !user.uid) return;

  const userStatusRef = ref(rtdb, `status/${user.uid}`);
  const userDocRef = doc(db, "users", user.uid);
  const connectedRef = ref(rtdb, ".info/connected");

  const isOfflineForFirestore = {
    online: false,
    lastOffline: Date.now(),
  };

  const isOnlineForFirestore = {
    online: true,
    lastOnline: Date.now(),
  };

  const handleConnected = onValue(connectedRef, (snap) => {
    const connected = snap.val();
    if (connected === false) {
      return;
    }

    // Only set onDisconnect after confirming connection
    onDisconnect(userStatusRef)
      .set({ state: "offline", lastChanged: Date.now() })
      .then(() => {
        rtdbSet(userStatusRef, {
          state: "online",
          lastChanged: Date.now(),
        });

        // NOW set online in Firestore
      });
  });

  return () => {
    handleConnected(); // unsubscribe from .info/connected
    rtdbRemove(userStatusRef).catch(console.error);
  };
}, [user]);

function SortableButton({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="pointer-events-auto">
      {children}
    </div>
  );
}


const labelMap = {
  levels: "Level Rewards",
  inventory: "Inventory",
  leaderboard: "Leaderboard",
  friends: "Friends",
  wheel: "Wheels",
  blackjack: "Blackjack",
  bombgame: "Daily Grid",
  avatars: "Avatars",
  sets: "Sets",
  workers: "Workers",
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};




const topBarButtonMap = {
  levels: (
    <Link to="/levels" className="bg-yellow-500 hover:bg-yellow-600 text-black h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/level-rewards.png" alt="Level Rewards" className="w-6 h-6" />
    </Link>
  ),
  inventory: (
    <Link to="/inventory" className="bg-green-600 hover:bg-green-700 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/inventory.png" alt="Inventory" className="w-6 h-6" />
    </Link>
  ),
  leaderboard: (
    <Link to="/leaderboard" className="bg-cyan-500 hover:bg-cyan-600 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/leaderboard.png" alt="Leaderboard" className="w-6 h-6" />
    </Link>
  ),
  friends: (
    <button onClick={() => setShowFriends(true)} className="bg-purple-600 hover:bg-purple-700 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/friends.png" alt="Friends" className="w-6 h-6" />
    </button>
  ),
  wheel: (
    <Link to="/wheel" className="bg-teal-600 hover:bg-teal-700 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/wheels.png" alt="Wheels" className="w-6 h-6" />
    </Link>
  ),
  blackjack: (
    <Link to="/blackjack" className="bg-gray-700 hover:bg-gray-800 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/blackjack.png" alt="Blackjack" className="w-6 h-6" />
    </Link>
  ),
  bombgame: (
    <Link to="/bombgame" className="bg-red-500 hover:bg-red-600 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/daily-grid.png" alt="Daily Grid" className="w-6 h-6" />
    </Link>
  ),
  avatars: (
    <Link to="/avatars" className="bg-purple-500 hover:bg-purple-600 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/avatars.png" alt="Avatars" className="w-6 h-6" />
    </Link>
  ),
  sets: (
    <Link to="/sets" className="bg-indigo-500 hover:bg-indigo-600 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/sets.png" alt="Sets" className="w-6 h-6" />
    </Link>
  ),
  workers: (
    <Link to="/workers" className="bg-yellow-600 hover:bg-yellow-700 text-white h-10 px-4 py-2 font-semibold rounded-md flex items-center justify-center">
      <img src="/images/workers.png" alt="Workers" className="w-6 h-6" />
    </Link>
  ),
};




useEffect(() => {
  const tryStartMusic = () => {
    if (bgmRef.current) return;

    const audio = new Audio("/sounds/background.mp3");
    audio.loop = true;

    // Set volume right away based on current mute/volume states
    audio.volume = isMuted ? 0 : bgmVolume * overallVolume;

    audio.play().then(() => {
      bgmRef.current = audio;
    }).catch((e) => {
      console.warn("Autoplay blocked:", e);
    });

    document.removeEventListener("click", tryStartMusic);
  };

  document.addEventListener("click", tryStartMusic);

  return () => document.removeEventListener("click", tryStartMusic);
}, []);

// 💥 One effect to sync audio changes
useEffect(() => {
  const audio = bgmRef.current;
  if (!audio) return;

  audio.volume = isMuted ? 0 : bgmVolume * overallVolume;

  if (isMuted) {
    audio.pause();
  } else {
    audio.play().catch((e) => console.warn("Play failed:", e));
  }
}, [isMuted, bgmVolume, overallVolume]);

useEffect(() => {
  if (!user || user.isAnonymous) return;

  const ref = collection(db, "users", user.uid, "friendRequests");

  const unsub = onSnapshot(ref, (snap) => {
    const newNotifs = [];

    snap.forEach((reqDoc) => {
      const data = reqDoc.data();
      if (data && data.from) {
        newNotifs.push({
          type: "friend_request",
          message: `📨 Friend request from ${data.from}`,
          onAccept: async () => {
  try {
    const receiverSnap = await getDoc(doc(db, "users", user.uid));
    const receiverUsername = receiverSnap.data()?.username || "Unnamed";
    const receiverAvatar = receiverSnap.data()?.equippedAvatar || "";
    const receiverLevel = receiverSnap.data()?.level || 1;

    const senderSnap = await getDoc(doc(db, "users", data.fromUid));
    const senderAvatar = senderSnap.data()?.equippedAvatar || "";
    const senderLevel = senderSnap.data()?.level || 1;

    await setDoc(doc(db, "users", user.uid, "friends", data.fromUid), {
      uid: data.fromUid,
      username: data.from,
      avatar: senderAvatar,
      level: senderLevel,
      xp: senderSnap.data()?.xp || 0,
      balance: senderSnap.data()?.balance || 0,
      opals: senderSnap.data()?.opals || 0,
      equippedAvatar: senderSnap.data()?.equippedAvatar || "",
      ownedWorkers: senderSnap.data()?.ownedWorkers || [],
      profileWorkers: senderSnap.data()?.profileWorkers || [],
      addedAt: Date.now(),
    });

    await setDoc(doc(db, "users", data.fromUid, "friends", user.uid), {
      uid: user.uid,
      username: receiverUsername,
      avatar: receiverAvatar,
      level: receiverLevel,
      xp: receiverSnap.data()?.xp || 0,
      balance: receiverSnap.data()?.balance || 0,
      opals: receiverSnap.data()?.opals || 0,
      equippedAvatar: receiverSnap.data()?.equippedAvatar || "",
      ownedWorkers: receiverSnap.data()?.ownedWorkers || [],
      profileWorkers: receiverSnap.data()?.profileWorkers || [],
      addedAt: Date.now(),
    });

    // ✅ Only add to state now
    setFriends((prev) => {
      const alreadyExists = prev.some(friend => friend.uid === data.fromUid);
      if (alreadyExists) return prev;

      return [
        ...prev,
        {
          uid: data.fromUid,
          username: data.from,
          avatar: senderAvatar,
          level: senderLevel,
          xp: senderSnap.data()?.xp || 0,
          balance: senderSnap.data()?.balance || 0,
          opals: senderSnap.data()?.opals || 0,
          equippedAvatar: senderSnap.data()?.equippedAvatar || "",
          ownedWorkers: senderSnap.data()?.ownedWorkers || [],
          profileWorkers: senderSnap.data()?.profileWorkers || [],
          online: senderSnap.data()?.online || false,
        }
      ];
    });

    await deleteDoc(doc(db, "users", user.uid, "friendRequests", reqDoc.id));

    console.log(`✅ Friend added: ${data.from}`);
  } catch (err) {
    console.error("Error accepting friend request:", err);
    alert("Something went wrong accepting the request.");
  }
},

          onDecline: async () => {
            await deleteDoc(doc(db, "users", user.uid, "friendRequests", reqDoc.id));
            console.log(`Declined ${data.from}`);
          },
        });
      }
    });

    setNotifications(newNotifs);
  });

  return () => unsub();
}, [user]);
useEffect(() => {
  if (!user || user.isAnonymous) return;

  const notifRef = collection(db, "users", user.uid, "notifications");

  const unsub = onSnapshot(notifRef, (snap) => {
    const newNotifs = [];

    snap.forEach((docSnap) => {
      const data = docSnap.data();

      if (data.type === "chat" && data.from) {
        newNotifs.push({
          type: "chat",
          message: `💬 New chat from ${data.from}`,
          onAccept: () => {
setChatUser({ uid: data.fromUid, username: data.from });
            deleteDoc(doc(notifRef, docSnap.id));
            setShowNotifications(false);
          },
          onDecline: async () => {
            await deleteDoc(doc(notifRef, docSnap.id));
          }
        });
      }
    });

    setNotifications((prev) => [...prev, ...newNotifs]);
  });

  return () => unsub();
}, [user]);




useEffect(() => {
  document.title = "Stacked Odds"; // or whatever you want the tab to say
}, []);


useEffect(() => {
  logEVs();
}, []);


useEffect(() => {
  if (!user || user.isAnonymous) return;

  let friendRefs = {};

  const unsub = onSnapshot(collection(db, "users", user.uid, "friends"), (snap) => {
    // 🔒 Only show friends already in state — block new auto-adds
    const newFriendUIDs = new Set(snap.docs.map(doc => doc.id));
    setFriends(prev =>
      prev.filter(friend => newFriendUIDs.has(friend.uid))
    );

    // 🧼 Clear old listeners
    Object.values(friendRefs).forEach((unsubFn) => unsubFn());
    friendRefs = {};

    // 🔄 Resubscribe to status for existing friends only
    snap.docs.forEach((friendDoc) => {
      const f = friendDoc.data();
      if (!f.uid) return;

      const friendRef = doc(db, "users", f.uid);

      const unsubFriend = onSnapshot(friendRef, (snap) => {
        if (!snap.exists()) return;
        const full = snap.data();

        setFriends((prev) => {
  const index = prev.findIndex(friend => friend.uid === f.uid);
  if (index === -1) return prev; // ❌ Don’t add them if they weren’t already accepted

  const updated = [...prev];
  updated[index] = {
    uid: f.uid,
    username: full.username,
    avatar: full.avatar || full.equippedAvatar,
    level: full.level,
    xp: full.xp,
    balance: full.balance,
    opals: full.opals,
    equippedAvatar: full.equippedAvatar,
    ownedWorkers: full.ownedWorkers,
    profileWorkers: full.profileWorkers,
online: false, // temp default, we’ll subscribe below
  };

  return updated;
});

      });

      friendRefs[f.uid] = unsubFriend;
    });
  });

  return () => {
    unsub();
    Object.values(friendRefs).forEach((unsubFn) => unsubFn());
  };
}, [user]);






  useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (currentUser) => {
  if (currentUser) {
    // 🔒 Check if already online from a different session
    const statusSnap = await get(ref(rtdb, `status/${currentUser.uid}`));
const isOnline = statusSnap.exists() && statusSnap.val().state === "online";
if (isOnline) {
  setLoginBlocked(true);
  await signOut(auth);
  return;
}


    // Full reset
    setBalance(0);
    setInventory([]);
    setOpals(0);
    setOwnedAvatars([]);
    setEquippedAvatar("");
    setOwnedWorkers([]);
    setCompletedSets([]);
    setXp(0);
    setLevel(1);
    setClaimedRewards([]);
    setProfileWorkers([]);

    if (!currentUser.isAnonymous) {
      await loadUserData(currentUser);
    }

    setUser(currentUser); // ⬅️ AFTER loadUserData
  } else {
    setUser(null);
  }
});

  return () => unsub();
}, []);

useEffect(() => {
  const loadFriendsOnce = async () => {
    if (!user || user.isAnonymous) return;

const friendsRef = collection(db, "users", user.uid, "friends");
const snap = await getDocs(friendsRef);

    const results = [];

    for (const docSnap of snap.docs) {
      const data = docSnap.data();
      if (!data?.uid) continue;

      const fullSnap = await getDoc(doc(db, "users", data.uid));
      if (!fullSnap.exists()) continue;

      const full = fullSnap.data();

      results.push({
        uid: data.uid,
        username: full.username,
        avatar: full.avatar || full.equippedAvatar,
        level: full.level,
        xp: full.xp,
        balance: full.balance,
        opals: full.opals,
        equippedAvatar: full.equippedAvatar,
        ownedWorkers: full.ownedWorkers,
        profileWorkers: full.profileWorkers,
online: false, // temp default, we’ll subscribe below
      });
    }

    setFriends(results);
    results.forEach(friend => {
  const statusRef = ref(rtdb, `status/${friend.uid}`);
  onValue(statusRef, (snap) => {
    const status = snap.val();
    setFriends((prev) =>
      prev.map((f) =>
        f.uid === friend.uid ? { ...f, online: status?.state === "online" } : f
      )
    );
  });
});

  };

  loadFriendsOnce();
}, [user]);


  useEffect(() => {
    if (!user || user.isAnonymous) return; // 🛑 don’t start interval for guest or null users
  
    const interval = setInterval(() => {
      if (ownedWorkers.length === 0) return;
  
      const totalIncome = workersData
        .filter((w) => ownedWorkers.includes(w.name))
        .reduce((sum, w) => sum + w.incomePerSecond, 0);
  
      if (totalIncome > 0) {
        const newBalance = balance + totalIncome;
        setBalance(newBalance);
        saveUserData(newBalance, inventory, opals, ownedAvatars, equippedAvatar, ownedWorkers);
      }
    }, 60000);
  
    return () => clearInterval(interval);
  }, [user, ownedWorkers, balance, inventory, opals, ownedAvatars, equippedAvatar]);  


const loadUserData = async (user) => {
  if (!user || user.isAnonymous) return;

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists()) {
      const data = snap.data();

      setBalance(data.balance || 0);
      setInventory(data.inventory || []);
      setOpals(data.opals || 0);
      setOwnedAvatars(data.ownedAvatars || []);
      setEquippedAvatar(data.equippedAvatar || "");
      setOwnedWorkers(data.ownedWorkers || []);
      setCompletedSets(data.completedSets || []);
      setXp(data.xp || 0);
      setLevel(data.level || 1);
      setClaimedRewards(data.claimedRewards || []);
      setProfileWorkers(data.profileWorkers || []);
      setUserBadges(data.badges || []);
      setTopBarButtons(data.topBarButtons || ["home", "notifications"]);



      if ("username" in data && typeof data.username === "string" && data.username.trim() !== "") {
  setUsername(data.username);
  setNeedsUsername(false);
} else {
  setUsername("");
  setNeedsUsername(true);
}

    } else {
      // brand new user with no doc
      setNeedsUsername(true);
    }
  } catch (err) {
    console.error("loadUserData error:", err.message);
  }
};

const getXpFromRarity = (rarity) => {
  switch (rarity) {
    case "common": return 5;
    case "rare": return 10;
    case "epic": return 25;
    case "legendary": return 250;
    case "mythic": return 1000;
    default: return 0;
  }
};

const MAX_LEVEL = 120;

const levelXpRequired = (lvl) => 25 * lvl * lvl;

const getLevelFromXp = (xp) => {
  let total = 0;
  for (let lvl = 1; lvl <= MAX_LEVEL; lvl++) {
    total += levelXpRequired(lvl);
    if (xp < total) return lvl;
  }
  return MAX_LEVEL;
};






    const saveUserData = async (
  newBalance,
  newInventory,
  newOpals = opals,
  newOwnedAvatars = ownedAvatars,
  newEquippedAvatar = equippedAvatar,
  newOwnedWorkers = ownedWorkers,
  newCompletedSets = completedSets,
  newXp = xp,
  newLevel = level,
  newClaimedRewards = claimedRewards,
    newBadges = userBadges, // 👈 add this as the 11th param
      newTopBarButtons = topBarButtons, // ✅ new param


) => {
  if (!user || user.isAnonymous) return;

  const ok = await enforceWriteLimit(); // ✅ always check here
  if (!ok) return; // 🛑 bail if limit is hit

  await setDoc(doc(db, "users", user.uid), {
  balance: newBalance,
  inventory: newInventory,
  opals: newOpals,
  ownedAvatars: newOwnedAvatars,
  equippedAvatar: newEquippedAvatar,
  ownedWorkers: newOwnedWorkers,
  completedSets: newCompletedSets,
  xp: newXp,
  level: newLevel,
  profileWorkers: profileWorkers,
  claimedRewards: newClaimedRewards,
    badges: newBadges, // ✅ ADD THIS LINE
        topBarButtons: newTopBarButtons, // ✅ save to Firestore


}, { merge: true }); // ✅ This line prevents deleting lastBombGameTime
};






  const handleSpend = (amount) => {
    const newBalance = balance - amount;
    setBalance(newBalance);
    saveUserData(newBalance, inventory, opals);

  };
const triggerMacroCheck = () => {
setMacroBlocked(true);
localStorage.setItem("macroBlocked", "true");
  setMacroCheckVisible(true);
  setIsUILocked(true);
  localStorage.setItem("macroCheckVisible", "true");
  setMacroButtonPos({
    top: `${Math.random() * 70 + 10}%`,
    left: `${Math.random() * 70 + 10}%`,
  });
};



  const handleOpenCrate = (crate) => {
  if (macroBlocked) return;

  setOpenCount((prev) => {
  const next = prev + 1;
  localStorage.setItem("openCount", next);
  if (next >= macroThreshold) {
    triggerMacroCheck();
  }
  return next;
});



  if (balance >= crate.cost) {
    const rarity = getRarity(crate.cost);
    const gainedXp = getXpFromRarity(rarity);
    const newXp = xp + gainedXp;
    const newLevel = getLevelFromXp(newXp);

    handleSpend(crate.cost);
    setXp(newXp);
    setLevel(newLevel);

    saveUserData(balance - crate.cost, inventory, opals, ownedAvatars, equippedAvatar, ownedWorkers, completedSets, newXp, newLevel);

    setSelectedCrate(crate);
  }
};

const handleBuyWheel = (wheelCost) => {
  const currentBlocked = localStorage.getItem("macroBlocked") === "true";
  if (currentBlocked || macroBlocked) return;

  setOpenCount((prev) => {
    const next = prev + 1;
    localStorage.setItem("openCount", next);
    if (next >= macroThreshold) {
      triggerMacroCheck();
    }
    return next;
  });

  const rarity = getRarity(wheelCost);
  const gainedXp = getXpFromRarity(rarity);
  const newXp = xp + gainedXp;
  const newLevel = getLevelFromXp(newXp);

  const newBalance = balance - wheelCost;
  setBalance(newBalance);
  setXp(newXp);
  setLevel(newLevel);

  saveUserData(newBalance, inventory, opals, ownedAvatars, equippedAvatar, ownedWorkers, completedSets, newXp, newLevel);
};




  const handleDrawnItem = () => {};

  const handleSell = (amount) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    saveUserData(newBalance, inventory, opals);

    resetCrate();
    resetWheel();
  };

  const getRarity = (cost) => {
  if (cost >= 500000) return "mythic";
  if (cost >= 30000) return "legendary";
  if (cost >= 5000) return "epic";
  if (cost >= 1000) return "rare";
  return "common";
};


const handleAddToInventory = (item) => {
  if (!item) return;

  const rarity = getRarity(item.value);
  const gainedXp = getXpFromRarity(rarity);
  const newXp = xp + gainedXp;
  const newLevel = getLevelFromXp(newXp);

  const updatedInventory = [
    ...inventory,
    {
  case: item.case || selectedCrate?.name || selectedWheel?.name || "Unknown",
  item: item.item || item.name,
  value: item.value,
  rarity,
  addedAt: new Date().toISOString(),
},
  ];

  setXp(newXp);
  setLevel(newLevel);
  setInventory(updatedInventory);

  saveUserData(balance, updatedInventory, opals, ownedAvatars, equippedAvatar, ownedWorkers, completedSets, newXp, newLevel);
  resetCrate();
  resetWheel();
};



  const handleSellFromInventory = (itemToSell) => {
  const updatedInventory = inventory.filter(
    (item) => item.addedAt !== itemToSell.addedAt
  );
  const newBalance = balance + itemToSell.value;
  setInventory(updatedInventory);
  setBalance(newBalance);
  saveUserData(newBalance, updatedInventory, opals);
};


    
  const handleSellAll = () => {
  const totalSellValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const newBalance = balance + totalSellValue;
  setInventory([]);
  setBalance(newBalance);
  saveUserData(newBalance, [], opals);

};


  const resetCrate = () => setSelectedCrate(null);
  const resetWheel = () => setSelectedWheel(null);

if (!user) return (
  <AuthPage
    onLogin={setUser}
    setLoginBlocked={() => {
      setLoginBlocked(true);
      setUser(null);
    }}
    loginBlocked={loginBlocked}
  />
);

  return (
  <Router>
    <>
      <div className="min-h-screen text-white flex flex-col items-center relative overflow-x-hidden touch-manipulation bg-neon-pattern" style={{ overflowY: 'clip' }}>
        {!user ? null : (
          <>
<div className="fixed top-8 left-0 right-0 z-40 flex justify-center overflow-visible">
  <div className="flex flex-row items-center gap-2 bg-gray-900 px-4 py-2 rounded-xl shadow-xl border border-gray-700 h-16 text-xs sm:text-sm overflow-visible">

                
                {/* Avatar + Username + Level */}
                <div className="flex items-center gap-4">
                  {navigationLocked ? (
                    <div className="cursor-not-allowed">
                      {equippedAvatar ? (
                        <img
                          src={`/avatars/${equippedAvatar.toLowerCase().replace(/\s+/g, "_")}_head.png`}
                          alt={equippedAvatar}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow transition-transform"
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl rounded-full border-2 border-white bg-gray-700 shadow">
                          👤
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative group">
  <Link to="/profile">
    {equippedAvatar ? (
      <img
        src={`/avatars/${equippedAvatar.toLowerCase().replace(/\s+/g, "_")}_head.png`}
        alt={equippedAvatar}
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 bg-black/30 transition-transform shrink-0 ${getLevelBorderClass(level)}`}
      />
    ) : (
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl rounded-full border-2 border-white bg-gray-700 shadow">
        👤
      </div>
    )}
  </Link>
  <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-semibold text-white bg-black bg-opacity-80 px-2 py-1 rounded hidden group-hover:inline-block z-50 shadow-lg">
    View Profile
  </span>
</div>

                  )}

                  <div className={`flex flex-col sm:flex-row sm:items-center sm:gap-1 text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl leading-tight ${getLevelColorClass(level)}`}>
  <span>[{level}]</span>
  <span className="font-bold break-words whitespace-normal">{user.isAnonymous ? "Guest" : username}</span>
</div>

                </div>

                {navigationLocked ? (
  <>
    <button
      disabled
      className="bg-gray-800 text-white h-10 text-sm sm:text-base px-4 py-2 font-semibold rounded-md opacity-50 cursor-not-allowed"
    >
      🏠
    </button>
    <button
      disabled
      className="bg-indigo-500 text-white h-10 text-sm sm:text-base px-4 py-2 font-semibold rounded-md opacity-50 cursor-not-allowed"
    >
      🔔
    </button>
    <button
      disabled
      className="bg-gray-700 text-white h-10 text-sm sm:text-base px-4 py-2 font-semibold rounded-md opacity-50 cursor-not-allowed"
    >
      ⚙️
    </button>
    <button
      disabled
      className="bg-red-600 text-white h-10 text-sm sm:text-base px-4 py-2 font-semibold rounded-md opacity-50 cursor-not-allowed"
    >
      🚪
    </button>
  </>
) : (
  <>
    {/* 🏠 Home */}
    <div className="relative group">
      <Link
        to="/"
        className="bg-gray-800 hover:bg-gray-700 text-white h-10 text-sm sm:text-base px-4 py-2 font-semibold rounded-md transition-transform hover:scale-105"
      >
        🏠
      </Link>
<span className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-semibold text-white bg-black bg-opacity-80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg">
        Home
      </span>
    </div>

    

    <DragDropContext
  onDragEnd={(result) => {
    if (!result.destination) return;
    const items = reorder(topBarButtons, result.source.index, result.destination.index);
    setTopBarButtons(items);
    saveUserData(
      balance,
      inventory,
      opals,
      ownedAvatars,
      equippedAvatar,
      ownedWorkers,
      completedSets,
      xp,
      level,
      claimedRewards,
      userBadges,
      items
    );
  }}
>


  
  <Droppable droppableId="topBarButtons" direction="horizontal">
    {(provided) => (
      <div
        className="flex flex-row gap-2"
        {...provided.droppableProps}
        ref={provided.innerRef}
      >


        
        {topBarButtons.map((btnKey, index) => (
          <Draggable key={btnKey} draggableId={btnKey} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="relative group flex-shrink-0"
              >
                {topBarButtonMap[btnKey]}
                <span className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-semibold text-white bg-black bg-opacity-80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg">
                  {labelMap[btnKey] || btnKey}
                </span>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>



    {/* 🔔 Notifications */}
    <div className="relative group">
      <button
        onClick={() => setShowNotifications(true)}
        className="bg-indigo-500 hover:bg-indigo-600 text-white h-10 text-sm sm:text-base px-4 py-2 font-semibold rounded-md transition-transform hover:scale-105 relative"
      >
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg">
            {notifications.length}
          </span>
        )}
      </button>
<span className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-semibold text-white bg-black bg-opacity-80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg">
        Notifications
      </span>
    </div>

    {/* ⚙️ Settings */}
    <div className="relative group">
      <button
        onClick={() => setShowSettings(true)}
        className="bg-gray-700 hover:bg-gray-800 text-white h-10 text-sm sm:text-base px-4 py-2 font-semibold rounded-md transition-transform hover:scale-105"
      >
        ⚙️
      </button>
<span className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-semibold text-white bg-black bg-opacity-80 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg">
        Settings
      </span>
    </div>

    {/* 🚪 Log Out */}
    <div className="relative group">
      <button
        onClick={async () => {
          if (user && !user.isAnonymous) {
            await rtdbSet(ref(rtdb, `status/${user.uid}`), {
              state: "offline",
              lastChanged: Date.now(),
            });
          }
          await signOut(auth);
          window.location.reload();
        }}
        className="bg-red-600 hover:bg-red-700 text-white h-10 text-sm sm:text-base px-4 py-2 font-semibold rounded-md transition-transform hover:scale-105"
      >
        🚪
      </button>
      <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-semibold text-white bg-black bg-opacity-80 px-2 py-1 rounded hidden group-hover:inline-block z-50 shadow-lg whitespace-nowrap">
  Log Out
</span>




    </div>
  </>
)}

              </div>
            </div>

            {/* Spacer below fixed top bar */}
<div className="mt-24 mb-4 h-[5px]" />

{/* 💰 Balance + 💠 Opals (moved below spacer) */}
<div className="flex justify-center w-full mb-4 z-30 relative">
  <div className="flex items-center gap-3">
    {/* Balance */}
    <div className="flex items-center gap-1 px-4 py-2 bg-gray-900 border-2 border-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)] h-12 sm:h-14">
      <span className="text-2xl sm:text-3xl">💰</span>
      <span className="ml-1 font-mono text-green-300 text-2xl sm:text-3xl font-extrabold drop-shadow-[0_0_6px_rgba(34,197,94,0.7)]">
        ${Number(balance).toLocaleString()}
      </span>
    </div>

    {/* Opals */}
    <div className="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 border-2 border-purple-300 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.9)] text-sm sm:text-lg h-12 sm:h-14">
      💠
      <span className="font-mono text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] text-base sm:text-xl font-bold">
        {Number(opals).toLocaleString()}
      </span>
    </div>
  </div>
</div>

          </>
        )}















        <div className="mb-4 flex flex-wrap justify-center items-center gap-3 sm:gap-6">
  

 

</div>



        <Routes>

<Route
  path="/"
  element={
    <WelcomePage
      username={username}
      setShowFriends={setShowFriends}
      resetCrate={resetCrate}
      resetWheel={resetWheel}
    />
  }
/>


          <Route path="/home" element={
  !selectedCrate ? (
    <CrateShop
      balance={balance}
      onOpenCrate={handleOpenCrate}
      trackedSet={trackedSet}
    />
  ) : (
    <CrateOpening
      crate={selectedCrate}
      value={null}
      onSell={handleSell}
      onAdd={handleAddToInventory}
      onBack={resetCrate}
      caseVolume={caseVolume}
      isMuted={isMuted}
      overallVolume={overallVolume}
      trackedSet={trackedSet}
    />
  )
} />


             
          <Route path="/game-ideas" element={<GameIdeas />} />

          <Route
            path="/inventory"
            element={
  <InventoryPanel
    inventory={inventory}
    onSellItem={handleSellFromInventory}
    onSellAll={handleSellAll}
  />
}



          />
<Route path="/levels" element={
  <LevelsPanel
    level={level}
    xp={xp}
    opals={opals}
    setOpals={setOpals}
    claimedRewards={claimedRewards}
    setClaimedRewards={setClaimedRewards}
    saveUserData={saveUserData}
    balance={balance}
    inventory={inventory}
    ownedAvatars={ownedAvatars}
    setOwnedAvatars={setOwnedAvatars} // 🔥 Add this
    equippedAvatar={equippedAvatar}
    ownedWorkers={ownedWorkers}
    completedSets={completedSets}
    userBadges={userBadges}
  setUserBadges={setUserBadges}
  setToastMessage={setToastMessage}
  />
} />
<Route
  path="/bombgame"
  element={
    <BombGrid
      user={user}
      balance={balance}
      opals={opals}
      setBalance={setBalance}
      setOpals={setOpals}
    />
  }
/>
<Route
  path="/profile"
  element={
    <ProfilePage
      currentUser={user}
      username={username}
      level={level}
      xp={xp}
      balance={balance}
      opals={opals}
      equippedAvatar={equippedAvatar}
      ownedWorkers={ownedWorkers}
      profileWorkers={profileWorkers}
      setProfileWorkers={setProfileWorkers}
      badges={userBadges} // ✅ Add this line
    />
  }
/>


<Route path="/blackjack" element={
  <Blackjack
    balance={balance}
    setBalance={setBalance}
    saveUserData={saveUserData}
  />
} />



<Route path="/leaderboard" element={<Leaderboard setToastMessage={setToastMessage} />} />
<Route
  path="/sets"
  element={
    <SetsPanel
      inventory={inventory}
      completedSets={completedSets}
      trackedSet={trackedSet}
  setTrackedSet={setTrackedSet}
      onTurnInSet={(set) => {
  let newInventory = [...inventory];

  if (set.requiredItems) {
    newInventory = inventory.filter(
      (item) => !set.requiredItems.some(req => req.name === item.item)
    );
  } else if (set.requiredRarity && set.count) {
    let remaining = set.count;
    newInventory = inventory.filter((item) => {
      if (item.rarity === set.requiredRarity && remaining > 0) {
        remaining--;
        return false;
      }
      return true;
    });
  }

  const updatedCompletedSets = [...completedSets, set.name];

  // 🎯 Badge vs Opal reward
  if (set.badge && !userBadges.includes(set.badge)) {
    const updatedBadges = [...userBadges, set.badge];
    setUserBadges(updatedBadges);
    setCompletedSets(updatedCompletedSets);
    setInventory(newInventory);
    setToastMessage(`🏅 New Badge Unlocked: ${set.badge}`);

    saveUserData(
      balance,
      newInventory,
      opals,
      ownedAvatars,
      equippedAvatar,
      ownedWorkers,
      updatedCompletedSets,
      xp,
      level,
      claimedRewards
    );
  } else {
    const newOpals = opals + (set.reward || 0);
    setOpals(newOpals);
    setCompletedSets(updatedCompletedSets);
    setInventory(newInventory);

    saveUserData(
      balance,
      newInventory,
      newOpals,
      ownedAvatars,
      equippedAvatar,
      ownedWorkers,
      updatedCompletedSets,
      xp,
      level,
      claimedRewards
    );
  }
}}

    />
  }
/>

<Route
  path="/workers"
  element={
    <WorkersPanel
      userId={user?.uid}
      balance={balance}
      setBalance={setBalance}
      opals={opals}
      ownedWorkers={ownedWorkers}
      onHire={(worker) => {
        const newOpals = opals - worker.cost;
        const newOwned = [...ownedWorkers, worker.name];
        setOpals(newOpals);
        setOwnedWorkers(newOwned);
        saveUserData(balance, inventory, newOpals, ownedAvatars, equippedAvatar, newOwned);
      }}
    />
  }
/>





<Route
  path="/avatars"
  element={
    <AvatarsShopPanel
      ownedAvatars={ownedAvatars}
      equippedAvatar={equippedAvatar}
      opals={opals}
      onBuy={(avatar) => {
        if (!ownedAvatars.includes(avatar.name) && opals >= avatar.cost) {
          const newOwned = [...ownedAvatars, avatar.name];
          const newOpals = opals - avatar.cost;
          setOwnedAvatars(newOwned);
          setOpals(newOpals);
          setEquippedAvatar(avatar.name);
          saveUserData(balance, inventory, newOpals, newOwned, avatar.name);
        }
      }}
      onEquip={(avatarName) => {
        setEquippedAvatar(avatarName);
        saveUserData(balance, inventory, opals, ownedAvatars, avatarName);
      }}
    />
  }
/>

<Route
  path="/wheel"
  element={

              !selectedWheel ? (
                <WheelSpin
                  balance={balance}
                  onPick={(wheel) => setSelectedWheel(wheel)}
                    isUILocked={isUILocked} // ✅ pass this in
                      trackedSet={trackedSet}


onSpend={handleBuyWheel}
        macroBlocked={macroBlocked} // 👈 add this

                />
              ) : (
                <WheelOpening
  wheel={selectedWheel}
  onSell={handleSell}
  onAdd={handleAddToInventory}
  onSpend={handleSpend}
  onBack={resetWheel}
  tickVolume={tickVolume}
  caseVolume={caseVolume}
  isMuted={isMuted}
  overallVolume={overallVolume}
  trackedSet={trackedSet}
/>

              )
            }
          />
        </Routes>

        {((needsUsername || showUsernameEditor) && user && !user.isAnonymous) && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4">
    <div className="bg-gray-900 border border-blue-500 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] p-6 w-full max-w-sm text-white text-center">
      <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        ✏️ Choose a Username
      </h2>

      <input
        type="text"
        className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 placeholder-gray-400"
        placeholder="Enter username"
        value={tempUsername}
        onChange={(e) => {
          setTempUsername(e.target.value);
          setUsernameError("");
        }}
      />

      {usernameError && (
        <p className="text-red-400 text-sm mb-3">{usernameError}</p>
      )}

      <button
        className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 font-semibold rounded-md transition-transform hover:scale-105"
        onClick={async () => {
          const lower = tempUsername.trim().toLowerCase();

          if (!lower || lower.length < 3 || lower.length > 20) {
            setUsernameError("Username must be 3–20 characters.");
            return;
          }

          if (bannedUsernames.includes(lower)) {
            setUsernameError("That username is not allowed.");
            return;
          }

          const existing = await getDoc(doc(db, "usernames", lower));
          if (existing.exists() && existing.data().uid !== user.uid) {
            setUsernameError("That username is already taken.");
            return;
          }

          const userSnap = await getDoc(doc(db, "users", user.uid));
          const prevUsername = userSnap.data()?.username?.toLowerCase();
          if (prevUsername && prevUsername !== lower) {
            await deleteDoc(doc(db, "usernames", prevUsername));
          }

          await Promise.all([
            setDoc(doc(db, "users", user.uid), { username: tempUsername }, { merge: true }),
            setDoc(doc(db, "usernames", lower), { uid: user.uid }),
          ]);

          const updatedSnap = await getDoc(doc(db, "users", user.uid));
          setUsername(updatedSnap.data()?.username || "");
          setNeedsUsername(false);
          setShowUsernameEditor(false);
        }}
      >
        💾 Save Username
      </button>

      {!needsUsername && (
        <button
          onClick={() => setShowUsernameEditor(false)}
          className="w-full py-2 mt-3 bg-red-600 hover:bg-red-700 font-semibold rounded-md transition-transform hover:scale-105"
        >
          ❌ Cancel
        </button>
      )}
    </div>
  </div>
)}


        


{showSettings && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm text-white">
    <div className="flex justify-end">
  <button
    onClick={() => setShowSettings(false)}
    className="text-red-500 hover:text-red-700 text-xl font-bold"
    aria-label="Close settings"
  >
    ✖
  </button>
</div>
{showDeleteConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
    <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm text-white text-center">
      <h2 className="text-xl font-bold mb-4 text-red-400">⚠️ Delete Account</h2>
      <p className="mb-6 text-sm">This will permanently delete your account and all data. This action cannot be undone.</p>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={async () => {
            try {
              const lower = username?.trim().toLowerCase();
              if (lower) await deleteDoc(doc(db, "usernames", lower));
              await deleteDoc(doc(db, "users", user.uid));
              await user.delete();
              window.location.reload();
            } catch (err) {
              console.error("Account deletion failed:", err);
              alert("Failed to delete account. You may need to log in again.");
            }
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-bold"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setShowDeleteConfirm(false)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      <h2 className="text-xl font-bold mb-4">Settings</h2>
      {/* Overall Volume */}
<div className="mb-4">
<div className="mb-4">
  <div className="flex items-center justify-between mb-1">
    <label className="font-semibold">🔊 Overall Volume</label>
    <button
onClick={() => setIsMuted((prev) => !prev)}
className="text-sm px-2 py-1 rounded bg-gray-700 hover:bg-gray-600"
    >
      {isMuted ? "🔇 Muted" : "🔈 Mute"}
    </button>
  </div>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={overallVolume}
    onChange={(e) => setOverallVolume(parseFloat(e.target.value))}
    disabled={isMuted}
    className="w-full"
  />
</div>
{/* Background Music Volume */}
<div className="mb-4">
  <label className="block mb-1 font-semibold">🎼 Music Volume</label>
  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={bgmVolume}
    onChange={(e) => setBgmVolume(parseFloat(e.target.value))}
    disabled={isMuted}
    className="w-full"
  />
</div>


</div>

{/* Wheel Tick Volume */}
<div className="mb-4">
  <label className="block mb-1 font-semibold">🌀 Wheel Tick Volume</label>
  <input
  type="range"
  min="0"
  max="1"
  step="0.01"
  value={tickVolume}
  onChange={(e) => setTickVolume(parseFloat(e.target.value))}
  disabled={isMuted}
  className="w-full"
/>
</div>

{/* Case Opening Volume */}
<div className="mb-4">
<label className="block mb-1 font-semibold">🎁 Prizes Volume</label>
<input
  type="range"
  min="0"
  max="1"
  step="0.01"
  value={caseVolume}
  onChange={(e) => setCaseVolume(parseFloat(e.target.value))}
  disabled={isMuted}
  className="w-full"
/>
</div>


      {/* Username Editor */}
      {/* Change Username */}
      {!user?.isAnonymous && (
  <div className="mb-4">
    <button
      onClick={() => {
        setTempUsername(username); // preload current username
        setShowSettings(false);
        setShowUsernameEditor(true);
      }}
      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
    >
      ✏️ Change Username
    </button>
  </div>
)}

<button
  onClick={() => {
    setShowSettings(false);
    setShowTopBarEditor(true);
  }}
  className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded"
>
  🧩 Customize Top Bar
</button>


<button
  onClick={() => setShowDeleteConfirm(true)}
  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded mt-2"
>
  🗑️ Delete Account
</button>



      
    </div>
  </div>
)}
{showFriends && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
    <div className="bg-gray-900 rounded-2xl p-6 max-w-3xl w-full text-white shadow-xl overflow-y-auto max-h-[90vh] relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">👥 Your Friends</h2>
        <button
          onClick={() => setShowFriends(false)}
          className="text-red-400 hover:text-red-600 text-2xl font-bold"
        >
          ✖
        </button>
      </div>

      {friends.length === 0 ? (
        <p className="text-gray-400 italic text-sm">No friends yet. Go send some requests! 🤝</p>
      ) : (
        <ul className="space-y-3">
          {friends.map((f) => (
            <li
  key={f.uid}
  className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex items-center justify-between gap-4 transition hover:bg-gray-700"
>
  <button
    onClick={async () => {
  const snap = await getDoc(doc(db, "users", f.uid));
  const full = snap.data();
  setSelectedProfileUser({ ...f, ...full, readOnly: true });
  setShowFriends(false);
}}

    className="flex items-center gap-4"
  >
    {(f.avatar || f.equippedAvatar) ? (
      <div className="relative">
        <img
          src={`/avatars/${(f.avatar || f.equippedAvatar).toLowerCase().replace(/\s+/g, "_")}_head.png`}
          alt={f.avatar || f.equippedAvatar}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 bg-black/30 ${getLevelBorderClass(f.level || 1)}`}
        />
        
      </div>
    ) : (
      <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-xl rounded-full border-2 border-white bg-gray-700 shadow">
        👤
      </div>
    )}
    <span className={`text-lg sm:text-xl ${getLevelColorClass(f.level || 1)}`}>
  [{f.level || 1}] <span className="font-bold">{f.username}</span>
    </span>
  </button>

  <button
  onClick={() => {
setChatUser(f);
    setShowFriends(false);
  }}
  className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded"
>
  💬 Message
</button>

<button
  onClick={() => setFriendToRemove(f)}
  className="text-sm bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded"
>
  ❌ Remove
</button>

</li>

          ))}
        </ul>
      )}

      <div className="mt-6">
  <div className="mt-6">
  <button
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold"
    onClick={() => {
      navigator.clipboard.writeText("https://stackedodds.net");
      setToastMessage("🔗 Invite link copied to clipboard!");
      setTimeout(() => setToastMessage(""), 3000);
    }}
  >
    📤 Invite Friends
  </button>

  {toastMessage && (
    <div className="mt-3 bg-gray-900 text-white px-4 py-2 rounded shadow-lg border border-blue-500 text-center">
      {toastMessage}
    </div>
  )}
</div>

</div>

    </div>
  </div>
)}

{showTopBarEditor && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4">
    <div className="bg-gray-900 border border-purple-500 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.5)] p-6 w-full max-w-sm text-white text-center">
      <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
        🧩 Customize Top Bar
      </h2>

      <div className="mb-6 text-left">
        {[
          { id: "levels", label: "Level Rewards" },
          { id: "inventory", label: "Inventory" },
          { id: "leaderboard", label: "Leaderboard" },
          { id: "friends", label: "Friends" },
          { id: "wheel", label: "Wheels" },
          { id: "blackjack", label: "Blackjack" },
          { id: "bombgame", label: "Daily Grid" },
          { id: "avatars", label: "Avatars" },
          { id: "sets", label: "Sets" },
          { id: "workers", label: "Workers" }
        ].map(({ id, label }) => (
          <label key={id} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={topBarButtons.includes(id)}
              onChange={() =>
                setTopBarButtons((prev) =>
                  prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
                )
              }
              className="accent-purple-500"
            />
            {label}
          </label>
        ))}
      </div>

      {/* Live Preview */}
      <div className="mt-6">
  <h3 className="text-lg font-semibold mb-2 text-purple-300 drop-shadow">🔃 Reorder Buttons:</h3>
  <DndContext
  sensors={sensors}  // ✅ uses the top-level variable
    collisionDetection={closestCenter}
    onDragEnd={({ active, over }) => {
      if (active.id !== over?.id) {
        setTopBarButtons((items) => {
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }}
  >
    <SortableContext items={topBarButtons} strategy={verticalListSortingStrategy}>
      <div className="flex flex-wrap justify-center gap-2 bg-black/30 p-4 rounded-lg border-2 border-purple-500 shadow-lg min-h-[64px]">
        {topBarButtons.length > 0 ? (
          topBarButtons.map((btnKey) => (
            <SortableButton key={btnKey} id={btnKey}>
              <div className="pointer-events-none">{topBarButtonMap[btnKey]}</div>
            </SortableButton>
          ))
        ) : (
          <div className="text-sm text-gray-400 italic">No buttons selected</div>
        )}
      </div>
    </SortableContext>
  </DndContext>
</div>




      <button
        onClick={() => {
          saveUserData(
            balance,
            inventory,
            opals,
            ownedAvatars,
            equippedAvatar,
            ownedWorkers,
            completedSets,
            xp,
            level,
            claimedRewards,
            userBadges,
            topBarButtons
          );
          setShowTopBarEditor(false);
        }}
        className="w-full py-2 mt-6 bg-green-600 hover:bg-green-700 font-semibold rounded-md transition-transform hover:scale-105"
      >
        💾 Save Changes
      </button>

      <button
        onClick={() => setShowTopBarEditor(false)}
        className="w-full py-2 mt-3 bg-red-600 hover:bg-red-700 font-semibold rounded-md transition-transform hover:scale-105"
      >
        ❌ Cancel
      </button>
    </div>
  </div>
)}




{showNotifications && (
  <NotificationsPanel
    notifications={notifications}
    setNotifications={setNotifications}
    onClose={() => setShowNotifications(false)}
  />
)}
{selectedProfileUser && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-900 rounded-2xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={() => setSelectedProfileUser(null)}
        className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-red-500"
      >
        ✖
      </button>
      <ProfilePage
        currentUser={user}
        username={selectedProfileUser.username}
        level={selectedProfileUser.level}
        xp={selectedProfileUser.xp}
        balance={selectedProfileUser.balance}
        opals={selectedProfileUser.opals}
        equippedAvatar={selectedProfileUser.equippedAvatar}
        ownedWorkers={selectedProfileUser.ownedWorkers}
        profileWorkers={selectedProfileUser.profileWorkers}
        setProfileWorkers={() => {}}
        readOnly
badges={selectedProfileUser.badges || []}

        
      />
    </div>
  </div>
)}

{chatUser && (
  <ChatBox
    currentUser={user}
    currentUsername={username}
    otherUser={chatUser}
    onClose={() => setChatUser(null)}
  />
)}
{friendToRemove && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
    <div className="bg-gray-900 rounded-xl p-6 max-w-sm w-full text-white shadow-xl text-center">
      <h2 className="text-xl font-bold text-red-400 mb-4">❌ Remove Friend</h2>
      <p className="mb-6">Are you sure you want to remove <span className="font-bold">{friendToRemove.username}</span> from your friends list?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={async () => {
            try {
              await deleteDoc(doc(db, "users", user.uid, "friends", friendToRemove.uid));
              await deleteDoc(doc(db, "users", friendToRemove.uid, "friends", user.uid));
              setFriends((prev) => prev.filter((f) => f.uid !== friendToRemove.uid));
              setFriendToRemove(null);
            } catch (err) {
              console.error("Failed to remove friend:", err);
              alert("❌ Something went wrong removing that friend.");
            }
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-bold"
        >
          Yes, Remove
        </button>
        <button
          onClick={() => setFriendToRemove(null)}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}



      </div>
</>
{macroCheckVisible && (
  <button
  onClick={() => {
setMacroBlocked(false);
localStorage.setItem("macroBlocked", "false");
  setMacroCheckVisible(false);
  setIsUILocked(false);
  localStorage.setItem("macroCheckVisible", "false");
const newThreshold = Math.floor(Math.random() * 11) + 25;
  localStorage.setItem("openCount", "0");
  localStorage.setItem("macroThreshold", newThreshold);
  setOpenCount(0);
  setMacroThreshold(newThreshold);
}}




    style={{
      position: "absolute",
      top: macroButtonPos.top,
      left: macroButtonPos.left,
      zIndex: 9999,
      padding: "16px 24px",
      backgroundColor: "#f87171",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "12px",
      boxShadow: "0 0 12px #f87171",
    }}
    className="animate-pulse"
  >
Tap to Resume
  </button>
)}

    </Router>
  );
}

export default App;
