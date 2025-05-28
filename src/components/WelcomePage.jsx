import { Link } from "react-router-dom";

export default function WelcomePage({ username, setShowFriends }) {
  return (
    <div className="py-12 flex justify-center">
      <div className="w-full max-w-5xl bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-12">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-glow animate-fade-in-up">
          👋 Welcome, {username}!
        </h2>

        {/* Core Section - Light Blue */}
        <Section title="📦 Core" sectionClass="section-core" titleClass="title-core">
          <NavButton to="/levels" label="Level Rewards" img="/images/level-rewards.png" className="glow-core" />
          <NavButton to="/inventory" label="Inventory" img="/images/inventory.png" className="glow-core" />
          <NavButton to="/leaderboard" label="Leaderboard" img="/images/leaderboard.png" className="glow-core" />
          <NavButton onClick={() => setShowFriends(true)} label="Friends" img="/images/friends.png" className="glow-core" />
        </Section>

        {/* Games Section - Dark Purple */}
        <Section title="🎮 Games" sectionClass="section-games" titleClass="title-games">
          <NavButton to="/home" label="Cases" img="/images/cases.png" className="glow-cases" />
          <NavButton to="/wheel" label="Wheels" img="/images/wheels.png" className="glow-cases" />
          <NavButton to="/blackjack" label="Blackjack" img="/images/blackjack.png" className="glow-cases" />
          <NavButton to="/bombgame" label="Daily Grid" img="/images/daily-grid.png" className="glow-cases" />
        </Section>

        {/* Opals Section - Light Pink */}
        <Section title="💠 Opals" sectionClass="section-opals" titleClass="title-opals">
          <NavButton to="/avatars" label="Avatars" img="/images/avatars.png" className="glow-avatars" />
          <NavButton to="/sets" label="Sets" img="/images/sets.png" className="glow-sets" />
          <NavButton to="/workers" label="Workers" img="/images/workers.png" className="glow-workers" />
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
