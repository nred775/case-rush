import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function WelcomePage({ username, setShowFriends, resetCrate, resetWheel }) {
  useEffect(() => {
    resetCrate();
    resetWheel();
  }, []);

  return (
    <div className="py-12 flex justify-center">
      <div className="w-full max-w-5xl bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-12">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-glow animate-fade-in-up">
          👋 Welcome, {username}!
        </h2>

 {/* Core Section - Light Blue */}
<Section title="📦 Core" sectionClass="section-core" titleClass="title-core">
    <NavButton to="/inventory" label="Inventory" img="/images/inventory.png" className="glow-core" />

  <NavButton to="/levels" label="Level Rewards" img="/images/level-rewards.png" className="glow-core" />
  <NavButton to="/sets" label="Sets" img="/images/sets.png" className="glow-core" />
    <NavButton to="/achievements" label="Achievements" img="/images/achievements.png" className="glow-core" />

</Section>





        {/* Games Section - Dark Purple */}
        <Section title="🎮 Games" sectionClass="section-games" titleClass="title-games">
          <NavButton to="/home" label="Cases" img="/images/cases.png" className="glow-cases" onClick={resetCrate} />
          <NavButton to="/wheel" label="Wheels" img="/images/wheels.png" className="glow-cases" onClick={resetWheel} />
          <NavButton to="/blackjack" label="Blackjack" img="/images/blackjack.png" className="glow-cases" />
          <NavButton to="/bombgame" label="Daily Grid" img="/images/daily-grid.png" className="glow-cases" />
            <NavButton to="/slots-panel" label="Slots" img="/images/slots.png" className="glow-cases" />
<NavButton to="/horse-race" label="Horse Race" img="/images/horse.png" className="glow-cases" />

        </Section>

        {/* Store Section - Light Pink (using old Opals styles) */}
<Section title="🛒 Store" sectionClass="section-opals" titleClass="title-opals">
  <NavButton to="/avatars" label="Avatars" img="/images/avatars.png" className="glow-avatars" />
  <NavButton to="/workers" label="Workers" img="/images/workers.png" className="glow-workers" />
  <NavButton to="/pet-shop" label="Pets" img="/images/pets.png" className="glow-workers" />

</Section>

        {/* Social Section - Cyan */}
<Section title="🌐 Social" sectionClass="section-social" titleClass="title-social">
  <NavButton to="/leaderboard" label="Leaderboard" img="/images/leaderboard.png" className="glow-social" />
  <NavButton onClick={() => setShowFriends(true)} label="Friends" img="/images/friends.png" className="glow-social" />
  <NavButton to="/game-ideas" label="Information" img="/images/information.png" className="glow-social" />
</Section>
      </div>
    </div>
  );
}

function Section({ title, titleClass, sectionClass, children }) {
  return (
    <div className={`w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg ${sectionClass}`}>
      <h3 className={`text-2xl font-bold mb-10 drop-shadow text-center ${titleClass}`}>
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-6">
        {children}
      </div>
    </div>
  );
}

function NavButton({ to, onClick, label, img, className }) {
  const Wrapper = to ? Link : "button";
  return (
    <Wrapper
      to={to}
      onClick={onClick}
      className={`glow-btn flex-col items-center relative group card-hover-zoom ${className}`}
    >
      <span className={`absolute top-[-2rem] text-sm font-bold drop-shadow-glow hidden group-hover:inline-block animate-fade-up`}>
        {label}
      </span>
      <img src={img} alt={label} className="w-16 h-16" />
    </Wrapper>
  );
}
