import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";


export default function WelcomePage({ username, setShowFriends, resetCrate, resetWheel, setShowNotifications }) {
  const pages = ["store", "core", "games", "social", "online"];
  const [page, setPage] = useState(2);
  const prevPageRef = useRef(0);
  const direction = page > prevPageRef.current ? 1 : -1;
  const [leaders, setLeaders] = useState([]);
const [sortIndex, setSortIndex] = useState(0);
const sortKeys = ["balance", "opals", "level"];

useEffect(() => {
  const fetchLeaders = async () => {
    const key = sortKeys[sortIndex];
    const q = query(collection(db, "users"), orderBy(key, "desc"), limit(3));
    const snap = await getDocs(q);
    const data = snap.docs.map(doc => doc.data());
    setLeaders(data);
  };

  fetchLeaders(); // initial
  const interval = setInterval(() => {
    setSortIndex((prev) => (prev + 1) % sortKeys.length);
  }, 4000);

  return () => clearInterval(interval);
}, [sortIndex]);


  useEffect(() => {
    resetCrate();
    resetWheel();
  }, []);

  useEffect(() => {
    prevPageRef.current = page;
  }, [page]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

  const pageComponents = [
  <StoreSection key="store" />,
  <CoreSection key="core" />,
  <GamesSection key="games" resetCrate={resetCrate} resetWheel={resetWheel} />,
  <SocialSection
    key="social"
    setShowFriends={setShowFriends}
    setShowNotifications={setShowNotifications}
    leaders={leaders}
    sortIndex={sortIndex}
    sortKeys={sortKeys}
  />,
  <PlaceholderSection key="online" />,
];


  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between">
<div className="relative w-full flex-1 overflow-y-auto pb-40">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
  key={page}
  className="w-full"
  custom={direction}
  initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
  transition={{
    type: "tween",
    ease: "easeInOut",
    duration: 0.2,
  }}

            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold && page < pages.length - 1) {
                setPage((prev) => prev + 1);
              } else if (swipe > swipeConfidenceThreshold && page > 0) {
                setPage((prev) => prev - 1);
              }
            }}
          >
            <PageWrapper>{pageComponents[page]}</PageWrapper>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md py-3 z-50 border-t border-white/20">
        <div className="flex justify-center gap-6 md:gap-12 max-w-screen-md mx-auto">
          {pages.map((p, i) => (
            <button
              key={p}
              onClick={() => setPage(i)}
              className={`text-sm font-semibold capitalize px-2 py-1 transition-all md:text-base ${
                page === i ? "text-green-400 scale-110" : "text-white/50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <div className="w-full h-full flex justify-center items-start p-4">
      <div className="max-w-5xl w-full min-h-screen">{children}</div>
    </div>
  );
}

function Section({ title, titleClass, sectionClass, children, topContent }) {
  return (
    <div
      className={`w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg ${sectionClass}`}
      style={{
        boxShadow: "0 0 25px rgba(255,192,203,0.4), 0 0 50px rgba(255,192,203,0.3)"
      }}
    >
      <h3 className={`text-2xl font-bold mb-10 drop-shadow text-center ${titleClass}`}>
        {title}
      </h3>

      {/* 👇 This is the new leaderboard block injected before the grid */}
      {topContent}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6 mx-auto w-full max-w-2xl">
        {React.Children.map(children, (child, index) => {
          const isLastOdd = children.length % 2 === 1 && index === children.length - 1;
          return (
            <div className={isLastOdd ? "sm:col-span-2 flex justify-center" : ""}>
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}


function NavButton({ to, onClick, label, img, imgList, className }) {
  const [currentImg, setCurrentImg] = useState(imgList?.[0] || img);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!imgList || imgList.length <= 1) return;
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % imgList.length;
      setCurrentImg(imgList[indexRef.current]);
    }, 1000); // change image every second
    return () => clearInterval(interval);
  }, [imgList]);

  const Wrapper = to ? Link : "button";
  return (
    <Wrapper
  to={to}
  onClick={onClick}
  className={`glow-btn flex flex-col items-center relative group card-hover-zoom p-8 rounded-2xl transition-all ${className}`}
>

<img
  src={currentImg}
  alt={label}
  className={`mb-4 ${
    className?.includes("core-button-local")
? "w-64 h-64 object-contain"
      : "w-24 h-24"
  }`}
/>


<span
  className={`text-sm font-bold drop-shadow ${
    className?.includes("core-button-local")
      ? "text-blue-300 drop-shadow-[0_0_6px_rgba(125,211,252,0.8)]"
      : "text-black"
  }`}
>
  {label}
</span>
    </Wrapper>
  );
}
function StoreNavButton({ to, onClick, label, imgList, className }) {
  const [currentImg, setCurrentImg] = useState(imgList?.[0]);
  const [animKey, setAnimKey] = useState(0);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!imgList || imgList.length <= 1) return;
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % imgList.length;
      setCurrentImg(imgList[indexRef.current]);
      setAnimKey((prev) => prev + 1); // forces re-animation
    }, 2500);
    return () => clearInterval(interval);
  }, [imgList]);

  const Wrapper = to ? Link : "button";

  return (
    <Wrapper
      to={to}
      onClick={onClick}
className={`relative flex flex-col justify-end items-center h-56 w-72 rounded-3xl shadow-xl text-white border-4 border-pink-400 bg-pink-600 ${className}`}

    >
<div className="absolute inset-1 flex items-center justify-center rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
  key={animKey}
  className="absolute inset-0 bg-center bg-no-repeat bg-contain"
  style={{
    backgroundImage: `url(/${currentImg})`,
    willChange: "opacity, transform",
  }}
  initial={{ opacity: 0, scale: 1.05 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  }}
/>


        </AnimatePresence>
      </div>

<div
  className="w-full bg-black/60 text-center py-2 text-lg font-bold z-10 text-pink-300 drop-shadow-[0_0_8px_rgba(255,192,203,0.8)]"
  style={{ textShadow: "0 0 8px rgba(255,192,203,0.9)" }}
>
  {label}
</div>



    </Wrapper>
  );
}








const StoreSection = () => (
  <Section
    title="🛒 Store"
    sectionClass="section-opals store-bg-glow"
    titleClass="title-opals animate-title-pulse"
  >
    <StoreNavButton
      to="/avatars"
      label="Avatars"
      imgList={[
        "avatars/bubble_bot.png",
        "avatars/byte_brawler.png",
        "avatars/cheddar_champ.png",
        "avatars/cool_cat.png",
        "avatars/crypto_crab.png",
        "avatars/drama_llama.png",
        "avatars/glitch_goblin.png",
        "avatars/grizzled_grump.png",
        "avatars/lucky_duck.png",
        "avatars/neon_ninja.png",
        "avatars/pixel_pirate.png",
        "avatars/roasty_toasty.png",
        "avatars/sir_hopsalot.png",
        "avatars/slick_vicky.png",
        "avatars/sneaker_sloth.png",
        "avatars/synthwave_slicer.png",
      ]}
      className="store-button w-48"
    />
    <StoreNavButton
      to="/workers"
      label="Workers"
      imgList={[
        "workers/boss_babyface.png",
        "workers/breakroom_bandit.png",
        "workers/bug_bounty_beetle.png",
        "workers/caffeine_clerk.png",
        "workers/coffee_gremlin.png",
        "workers/cubicle_crusher.png",
        "workers/cubicle_kraken.png",
        "workers/deadline_demon.png",
        "workers/foreman_fish.png",
        "workers/grind_goblin.png",
        "workers/hazard_handler.png",
        "workers/intern_imp.png",
        "workers/intern_inferno.png",
        "workers/janitor_jackal.png",
        "workers/manager_mech.png",
        "workers/overtime_ogre.png",
        "workers/overtime_otter.png",
        "workers/printer_pixie.png",
        "workers/spreadsheet_specter.png",
        "workers/supervisor_slime.png",
        "workers/vpn_vampire.png",
        "workers/zoom_zombie.png",
      ]}
      className="store-button w-48"
    />
    <StoreNavButton
      to="/pet-shop"
      label="Pets"
      imgList={[
        "pets/barkley.png",
        "pets/blaze.png",
        "pets/cinder.png",
        "pets/fluffy.png",
        "pets/flutterpixie.png",
        "pets/gloomflutter.png",
        "pets/jetbeetle.png",
        "pets/mochi.png",
        "pets/nimbus.png",
        "pets/shadow.png",
        "pets/skyhawk.png",
        "pets/sparky.png",
        "pets/taco.png",
        "pets/whiskers.png",
        "pets/zeus.png",
      ]}
      className="store-button w-48"
    />
  </Section>
);




const CoreSection = () => (
  <Section
    title="📦 Core"
    sectionClass="section-core core-bg-glow"
    titleClass="title-core"
  >
    <NavButton
      to="/inventory"
      label="Inventory"
      img="/images/inventory.png"
      className="core-button-local"
    />
    <NavButton
      to="/levels"
      label="Level Rewards"
      img="/images/level-rewards.png"
      className="core-button-local"
    />
    <NavButton
      to="/sets"
      label="Sets"
      img="/images/sets.png"
      className="core-button-local"
    />
    <NavButton
      to="/achievements"
      label="Achievements"
      img="/images/achievements.png"
      className="core-button-local"
    />
  </Section>
);


const GamesSection = ({ resetCrate, resetWheel }) => (
  <Section
    title="🎮 Games"
    sectionClass="section-games games-bg-glow"
    titleClass="title-games"
  >
    <NavButton to="/cases" label="Cases" img="/images/cases.png" className="glow-cases games-glow-animate" onClick={resetCrate} />
<NavButton to="/wheel" label="Wheels" img="/images/wheels.png" className="glow-cases games-glow-animate" onClick={resetWheel} />
<NavButton to="/blackjack" label="Blackjack" img="/images/blackjack.png" className="glow-cases games-glow-animate" />
<NavButton to="/bombgame" label="Daily Grid" img="/images/daily-grid.png" className="glow-cases games-glow-animate" />
<NavButton to="/slots-panel" label="Slots" img="/images/slots.png" className="glow-cases games-glow-animate" />
<NavButton to="/horse-race" label="Horse Race" img="/images/horse.png" className="glow-cases games-glow-animate" />

  </Section>
);


const SocialSection = ({ setShowFriends, setShowNotifications, leaders, sortIndex, sortKeys }) => (
  <Section
    title="🌐 Social"
    sectionClass="section-social social-bg-glow"
    titleClass="title-social animate-title-pulse"
    topContent={
      <Link
        to="/leaderboard"
  className="max-w-md mx-auto bg-black/60 rounded-2xl p-4 flex flex-col gap-3 hover:scale-[1.01] transition-transform border-2 border-white/20 shadow-xl mb-6"
      >
        <h3 className="text-xl font-bold text-center mb-2 text-white drop-shadow">
          🏆 Top {sortKeys[sortIndex] === "balance" ? "Balances" : sortKeys[sortIndex] === "opals" ? "Opals" : "Levels"}
        </h3>
        {leaders.map((user, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-3 py-2 rounded-lg ${
              i === 0 ? "bg-yellow-800/40 border-yellow-400 border-2" :
              i === 1 ? "bg-gray-700/40 border-gray-300 border-2" :
              i === 2 ? "bg-orange-900/40 border-orange-300 border-2" :
              "bg-gray-800/40 border border-white/10"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full text-black font-extrabold bg-yellow-300 shadow">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
              </div>

              {user.equippedAvatar ? (
                <img
                  src={`/avatars/${user.equippedAvatar.toLowerCase().replace(/\s+/g, "_")}_head.png`}
                  alt={user.username}
                  className="w-10 h-10 rounded-full border-2 border-white shadow"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center text-white">👤</div>
              )}

              <span className="text-white font-bold text-sm sm:text-base">
                [{user.level || 1}] {user.username}
              </span>
            </div>

            <div className="text-green-300 font-mono text-sm sm:text-base">
              {sortKeys[sortIndex] === "balance"
                ? `$${Number(user.balance || 0).toLocaleString()}`
                : sortKeys[sortIndex] === "opals"
                ? `💠${Number(user.opals || 0).toLocaleString()}`
                : `Lv ${user.level || 1}`}
            </div>
          </div>
        ))}
      </Link>
    }
  >
    <NavButton
      label="Friends"
      img="/images/friends.png"
      onClick={() => setShowFriends(true)}
      className="social-button-rect"
    />
    <NavButton
      label="Global Chat"
      img="/images/chat.png"
      to="/global-chat"
      className="social-button-rect"
    />
    <NavButton
      label="Notifications"
      img="/images/notifications.png"
      onClick={() => setShowNotifications(true)}
      className="social-button-rect"
    />
    <NavButton
      to="/"
      label="Information"
      img="/images/information.png"
      className="social-button-rect"
    />
  </Section>
);







const PlaceholderSection = () => (
  <Section title="🔹 Online (Coming Soon)" sectionClass="section-core" titleClass="title-core">
  </Section>
);
