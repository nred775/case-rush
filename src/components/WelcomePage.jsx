import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { db, rtdb } from "../firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { ref, onValue } from "firebase/database";
import { getLevelColorClass } from "../utils/levelStyles";

/* --------------------------- Background FX --------------------------- */
function BackgroundFX() {
  // Pure CSS/Tailwind animated gradients + dot grid—no external assets needed.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Soft animated gradient beams */}
      <div className="absolute -top-1/3 -left-1/3 h-[80vmax] w-[80vmax] rounded-full blur-3xl opacity-30 animate-[pulse_7s_ease-in-out_infinite] bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.6),transparent_60%)]" />
      <div className="absolute -bottom-1/3 -right-1/3 h-[85vmax] w-[85vmax] rounded-full blur-3xl opacity-30 animate-[pulse_9s_ease-in-out_infinite] bg-[radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.55),transparent_60%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[65vmax] w-[65vmax] rounded-full blur-3xl opacity-25 animate-[pulse_11s_ease-in-out_infinite] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.55),transparent_65%)]" />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          backgroundPosition: "0 0",
        }}
      />
    </div>
  );
}

/* ----------------------- Shared Motion / UI bits --------------------- */
const cardHover = {
  initial: { y: 0, scale: 1, rotateX: 0 },
  whileHover: { y: -4, scale: 1.02, rotateX: 1.5 },
  transition: { type: "spring", stiffness: 200, damping: 20, mass: 0.6 },
};

function GradientBorder({ className = "", children }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-pink-500/70 via-emerald-400/70 to-sky-400/70 blur-[6px] opacity-60" />
      <div className="relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/15">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------ Page -------------------------------- */
export default function WelcomePage({
  username,
  setShowFriends,
  resetCrate,
  resetWheel,
  setShowNotifications,
}) {
  const pages = ["store", "core", "games", "social", "--"];
  const [page, setPage] = useState(2);
  const prevPageRef = useRef(0);
  const direction = page > prevPageRef.current ? 1 : -1;

  const [leaders, setLeaders] = useState([]);
  const [sortIndex, setSortIndex] = useState(0);
  const sortKeys = ["balance", "opals", "level"];
  const [onlineCount, setOnlineCount] = useState(0);

  /* Leaders rotator */
  useEffect(() => {
    const fetchLeaders = async () => {
      const key = sortKeys[sortIndex];
      const q = query(collection(db, "users"), orderBy(key, "desc"), limit(3));
      const snap = await getDocs(q);
      const data = snap.docs.map((doc) => doc.data());
      setLeaders(data);
    };
    fetchLeaders();
    const interval = setInterval(
      () => setSortIndex((prev) => (prev + 1) % sortKeys.length),
      4000
    );
    return () => clearInterval(interval);
  }, [sortIndex]);

  /* RTDB online count */
  useEffect(() => {
    if (!username) return;
    const statusRef = ref(rtdb, "status");
    const unsub = onValue(statusRef, (snapshot) => {
      let count = 0;
      snapshot.forEach((child) => {
        const val = child.val();
        if (val?.state === "online") count++;
      });
      setOnlineCount(count);
    });
    return () => unsub();
  }, [username]);

  useEffect(() => {
    resetCrate();
    resetWheel();
  }, []); // eslint-disable-line

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
      onlineCount={onlineCount}
    />,
  ];

  return (
<div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between">

      {/* Hero / Header */}
      <header className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-6 md:pt-10">
        <GradientBorder className="rounded-3xl">
          <div className="relative rounded-3xl px-6 py-6 md:px-10 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <motion.h1
                className="text-2xl md:text-4xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background:
                    "linear-gradient(90deg,#a78bfa 0%,#34d399 50%,#38bdf8 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Welcome{username ? `, ${username}` : ""} ✨
              </motion.h1>

              <motion.div
                className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-full px-4 py-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <span className="relative inline-flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold">
                  {onlineCount} online
                </span>
              </motion.div>
            </div>
          </div>
        </GradientBorder>
      </header>

      {/* Pages */}
      <div className="relative w-full flex-1 overflow-y-auto pb-40 z-10">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            className="w-full"
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
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

      {/* Bottom Nav (pill with animated active highlight) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/70 backdrop-blur-xl border border-white/15 rounded-full px-2 py-2 shadow-2xl">
          <div className="flex items-center gap-1">
            {pages.map((p, i) => (
              <button
                key={p + i}
                onClick={() => setPage(i)}
                className="relative"
              >
                <span className="relative inline-flex items-center justify-center px-4 py-2 md:px-5 md:py-2 text-xs md:text-sm font-semibold capitalize text-white/80">
                  {page === i && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-inner"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={page === i ? "text-emerald-300" : "text-white/60"}>
                    {p}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

/* --------------------------- Layout wrappers ------------------------- */
function PageWrapper({ children }) {
  return (
    <div className="w-full h-full flex justify-center items-start p-4">
      <div className="max-w-6xl w-full min-h-screen">{children}</div>
    </div>
  );
}

/* ------------------------------ Section ------------------------------ */
function Section({ title, titleClass, sectionClass, children, topContent }) {
const childCount = React.Children.count(children);

{React.Children.map(children, (child, index) => {
  const isSoloOnLastRowLg = childCount % 3 === 1 && index === childCount - 1;
  return (
    <div className={isSoloOnLastRowLg ? "lg:col-start-2" : ""}>
      {child}
    </div>
  );
})}

  return (
    <motion.section
      {...cardHover}
      className={`w-full ${sectionClass || ""}`}
    >
      <GradientBorder>
        <div className="rounded-3xl p-6 md:p-8">
          <h3
            className={`text-2xl md:text-3xl font-extrabold mb-8 text-center drop-shadow ${titleClass || ""}`}
            style={{
              background:
                "linear-gradient(90deg,rgba(250,204,21,1) 0%,rgba(56,189,248,1) 50%,rgba(34,197,94,1) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </h3>

          {topContent && <div className="mb-6">{topContent}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto w-full">
            {React.Children.map(children, (child, index) => {
              // Make the last item span if odd count and using >=2 columns
              const isLastOdd = childCount % 2 === 1 && index === childCount - 1;
              return (
                <div className={isLastOdd ? "sm:col-span-2 lg:col-span-1" : ""}>
                  {child}
                </div>
              );
            })}
          </div>
        </div>
      </GradientBorder>
    </motion.section>
  );
}

/* ------------------------------ Buttons ------------------------------ */
function NavButton({ to, onClick, label, img, imgList, className }) {
  const [currentImg, setCurrentImg] = useState(imgList?.[0] || img);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!imgList || imgList.length <= 1) return;
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % imgList.length;
      setCurrentImg(imgList[indexRef.current]);
    }, 1000);
    return () => clearInterval(interval);
  }, [imgList]);

  const Wrapper = to ? Link : "button";
  return (
    <Wrapper
      to={to}
      onClick={onClick}
      className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${className || ""}`}
    >
      {/* Shine sweep */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden">
        <span className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-150%] group-hover:translate-x-[350%] transition-transform duration-700 ease-out" />
      </span>

      {/* Image */}
      {currentImg && (
        <img
          src={currentImg}
          alt={label}
          className={`mb-4 ${className?.includes("core-button-local") ? "w-64 h-64 object-contain" : "w-24 h-24"}`}
        />
      )}

      {/* Label */}
      <span
        className={`text-sm font-bold drop-shadow ${
          className?.includes("core-button-local")
            ? "text-blue-300 drop-shadow-[0_0_6px_rgba(125,211,252,0.8)]"
            : "text-white"
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
      setAnimKey((prev) => prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [imgList]);

  const Wrapper = to ? Link : "button";

  return (
    <Wrapper
      to={to}
      onClick={onClick}
      className={`relative flex flex-col justify-end items-center h-56 w-72 rounded-3xl shadow-xl text-white border-4 border-pink-400 bg-pink-600 overflow-hidden ${className || ""}`}
    >
      {/* image plane */}
      <div className="absolute inset-1 flex items-center justify-center rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={animKey}
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: `url(/${currentImg})`, willChange: "opacity, transform" }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
          />
        </AnimatePresence>
      </div>

      {/* sheen */}
      <span className="pointer-events-none absolute inset-0 rounded-3xl">
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </span>

      <div
        className="w-full bg-black/60 text-center py-2 text-lg font-bold z-10 text-pink-300 drop-shadow-[0_0_8px_rgba(255,192,203,0.8)]"
        style={{ textShadow: "0 0 8px rgba(255,192,203,0.9)" }}
      >
        {label}
      </div>
    </Wrapper>
  );
}

/* ---------------------------- Sections ------------------------------- */
const StoreSection = () => (
  <Section title="🛒 Store" sectionClass="section-opals store-bg-glow" titleClass="title-opals animate-title-pulse">
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
  <Section title="📦 Core" sectionClass="section-core core-bg-glow" titleClass="title-core">
    <NavButton to="/inventory" label="Inventory" img="/images/inventory.png" className="core-button-local glow-btn card-hover-zoom" />
    <NavButton to="/levels" label="Level Rewards" img="/images/level-rewards.png" className="core-button-local glow-btn card-hover-zoom" />
    <NavButton to="/sets" label="Sets" img="/images/sets.png" className="core-button-local glow-btn card-hover-zoom" />
    <NavButton to="/achievements" label="Achievements" img="/images/achievements.png" className="core-button-local glow-btn card-hover-zoom" />
  </Section>
);

const GamesSection = ({ resetCrate, resetWheel }) => (
  <Section title="🎮 Games" sectionClass="section-games games-bg-glow" titleClass="title-games">
    <NavButton to="/cases" label="Cases" img="/images/cases.png" className="glow-cases games-glow-animate glow-btn" onClick={resetCrate} />
    <NavButton to="/wheel" label="Wheels" img="/images/wheels.png" className="glow-cases games-glow-animate glow-btn" onClick={resetWheel} />
    <NavButton to="/blackjack" label="Blackjack" img="/images/blackjack.png" className="glow-cases games-glow-animate glow-btn" />
    <NavButton to="/bombgame" label="Daily Grid" img="/images/daily-grid.png" className="glow-cases games-glow-animate glow-btn" />
    <NavButton to="/slots-panel" label="Slots" img="/images/slots.png" className="glow-cases games-glow-animate glow-btn" />
    <NavButton to="/horse-race" label="Horse Race" img="/images/horse.png" className="glow-cases games-glow-animate glow-btn" />
  </Section>
);

const SocialSection = ({ setShowFriends, setShowNotifications, leaders, sortIndex, sortKeys, onlineCount }) => (
  <Section
    title="🌐 Social"
    sectionClass="section-social social-bg-glow"
    titleClass="title-social animate-title-pulse"
    topContent={
      <>
        {/* Online pill already shown in header; this keeps an inline one inside the card on smaller screens if you like both */}
        <div className="flex items-center justify-center mb-4 md:mb-6">
          <div className="bg-black/50 border border-white/20 backdrop-blur-lg px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-3">
            <div className="relative w-4 h-4">
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
              <div className="relative w-4 h-4 rounded-full bg-green-500 shadow-lg"></div>
            </div>
            <div className="text-white text-base md:text-lg font-bold drop-shadow tracking-wide">
              {onlineCount} player{onlineCount !== 1 ? "s" : ""} online
            </div>
          </div>
        </div>

        <Link
          to="/leaderboard"
          className="max-w-md mx-auto bg-black/60 rounded-2xl p-4 flex flex-col gap-3 hover:scale-[1.01] transition-transform border-2 border-white/20 shadow-xl mb-6"
        >
          <h3 className="text-xl font-bold text-center mb-2 text-white drop-shadow">
            🏆 Top {sortKeys[sortIndex] === "balance" ? "Balances" : sortKeys[sortIndex] === "opals" ? "Opals" : "Levels"}
          </h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={sortIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {leaders.map((user, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                    i === 0
                      ? "bg-yellow-800/40 border-yellow-400 border-2"
                      : i === 1
                      ? "bg-gray-700/40 border-gray-300 border-2"
                      : i === 2
                      ? "bg-orange-900/40 border-orange-300 border-2"
                      : "bg-gray-800/40 border border-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full text-black font-extrabold bg-yellow-300 shadow">
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
                    </div>

                    {user.equippedAvatar ? (
                      <img
                        src={`/avatars/${(user.equippedAvatar || "")
                          .toString()
                          .toLowerCase()
                          .replace(/\s+/g, "_")}_head.png`}
                        alt={user.username}
                        className="w-10 h-10 rounded-full border-2 border-white shadow"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center text-white">
                        👤
                      </div>
                    )}

                    <span
                      className={`font-bold text-sm sm:text-base ${getLevelColorClass(user.level || 1)}`}
                    >
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
            </motion.div>
          </AnimatePresence>
        </Link>
      </>
    }
  >
    <NavButton label="Friends" img="/images/friends.png" onClick={() => setShowFriends(true)} className="social-button-rect glow-btn" />
    <NavButton label="Global Chat" img="/images/chat.png" to="/global-chat" className="social-button-rect glow-btn" />
    <NavButton label="Notifications" img="/images/notifications.png" onClick={() => setShowNotifications(true)} className="social-button-rect glow-btn" />
    <NavButton to="/" label="Information" img="/images/information.png" className="social-button-rect glow-btn" />
  </Section>
);
