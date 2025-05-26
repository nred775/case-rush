import React from "react";
import avatars from "../data/avatars";

export default function AvatarsShopPanel({ ownedAvatars, equippedAvatar, opals, onBuy, onEquip }) {
  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">🧍 Avatar Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
{[...avatars]
  .filter((avatar) => {
  const isLocked = avatar.lockedLevel && !ownedAvatars.includes(avatar.name);
  return !isLocked;
})

  .sort((a, b) => a.cost - b.cost)
  .map((avatar, index) => {

          const isOwned = ownedAvatars.includes(avatar.name);
          const isEquipped = equippedAvatar === avatar.name;
          const canAfford = opals >= avatar.cost;

          return (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-900 to-black p-5 rounded-2xl border-4 transition-all duration-300 flex flex-col items-center ${
                isEquipped
                  ? "border-yellow-400"
                  : isOwned
                  ? "border-green-500"
                  : canAfford
                  ? "border-blue-500"
                  : "border-gray-700 opacity-60"
              }`}
            >
              <div className="w-full aspect-square bg-black rounded-xl overflow-hidden mb-4 shadow-lg border-2 border-gray-800 flex items-center justify-center">
                <img
                  src={avatar.image}
                  alt={avatar.name}
                  className="object-contain max-h-full max-w-full"
                />
              </div>

              <h2 className="text-2xl font-bold mb-1 text-center">{avatar.name}</h2>
              <p className="text-sm text-gray-400 mb-2 text-center">{avatar.description}</p>
              {!isOwned && (
  <p className="text-lg text-fuchsia-300 font-semibold mb-4 text-center">
    💠 Cost: {avatar.cost} Opals
  </p>
)}


              {!isOwned && canAfford && (
                <button
                  onClick={() => onBuy(avatar)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all"
                >
                  Buy
                </button>
              )}

              {isOwned && !isEquipped && (
                <button
                  onClick={() => onEquip(avatar.name)}
                  className="w-full py-2 mt-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-all"
                >
                  Equip
                </button>
              )}

              {isEquipped && (
                <p className="text-yellow-400 mt-2 font-semibold text-center">Equipped ✔</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
