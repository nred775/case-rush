// src/components/PetShop.jsx
import React from "react";
import pets from "../data/pets";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ClaimPetIncome from "./ClaimPetIncome";

const PetShop = ({
  opals,
  setOpals,
  ownedPets,
  setOwnedPets,
  activePet,
  setActivePet,
  saveUserData,
  balance,
  inventory,
  ownedAvatars,
  equippedAvatar,
  ownedWorkers,
  completedSets,
  xp,
  level,
  claimedRewards,
  userBadges,
  topBarButtons,
  claimedAchievements,
  wheelsSpun,
  casesOpened,
  dailyGrids,
  blackjackWins,
  horseRaces,
  slotsSpun,
  currentUser,
  userId,
}) => {
  const handleBuy = async (pet) => {
    if (opals < pet.cost || ownedPets.includes(pet.name)) return;

    const updatedPets = [...ownedPets, pet.name];
    const newOpals = opals - pet.cost;

    setOpals(newOpals);
    setOwnedPets(updatedPets);

    saveUserData(
      balance,
      inventory,
      newOpals,
      ownedAvatars,
      equippedAvatar,
      ownedWorkers,
      completedSets,
      xp,
      level,
      claimedRewards,
      userBadges,
      topBarButtons,
      claimedAchievements,
      wheelsSpun,
      casesOpened,
      dailyGrids,
      blackjackWins,
      horseRaces,
      slotsSpun,
      updatedPets,
      activePet
    );

    if (currentUser) {
      const ref = doc(db, "users", currentUser.uid);
      await updateDoc(ref, {
        ownedPets: updatedPets,
        opals: newOpals,
      });
    }
  };

  const handleAssign = async (petName) => {
    setActivePet(petName);

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
      topBarButtons,
      claimedAchievements,
      wheelsSpun,
      casesOpened,
      dailyGrids,
      blackjackWins,
      horseRaces,
      slotsSpun,
      ownedPets,
      petName
    );

    if (currentUser) {
      const ref = doc(db, "users", currentUser.uid);
      await updateDoc(ref, { activePet: petName });
    }
  };

  return (
    <div className="p-6 text-white max-w-6xl mx-auto animate-fade-in-fast">
      <style>
        {`@keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }`}
      </style>

      <h1 className="text-4xl font-bold text-center neon-back-btn w-max mx-auto mb-8 px-6 py-2">
        🐾 Pet Shop
      </h1>

      <ClaimPetIncome userId={userId} activePet={activePet} setOpals={setOpals} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
{[...pets].sort((a, b) => a.cost - b.cost).map((pet, index) => {
          const isOwned = ownedPets.includes(pet.name);
          const isAssigned = activePet === pet.name;

          return (
            <div
              key={index}
              className="group relative overflow-hidden bg-gray-900 card-hover-zoom text-center p-6 border-4 border-pink-300 shadow-neon transition-transform"
            >
              {/* Hover shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_linear_infinite] pointer-events-none z-0" />

              <div className="relative w-full aspect-square flex items-center justify-center mb-4 z-10">
                <img
                  src={`/pets/${pet.image}`}
                  alt={pet.name}
                  className="w-full h-full object-contain drop-shadow-glow transition-transform duration-300"
                />
              </div>

              <h2 className="text-2xl font-bold mb-1 text-pink-300 z-10 relative">{pet.name}</h2>
              <p className="text-sm text-gray-300 z-10 relative">{pet.description}</p>
              <div className="mt-3 z-10 relative">
                <span className="inline-block bg-gradient-to-r from-green-400 via-lime-300 to-green-500 text-gray-900 font-semibold px-3 py-1 rounded-full text-sm shadow-md border border-green-300 animate-pulse">
                  💠 {pet.dailyReward.toLocaleString()} Opals / day
                </span>
              </div>

              <div className="mt-4 z-10 relative">
                {!isOwned ? (
                  <button
                    onClick={() => handleBuy(pet)}
                    className="neon-spin-btn text-sm"
                  >
                    Buy for {pet.cost} Opals
                  </button>
                ) : isAssigned ? (
                  <button
                    className="bg-gray-700 text-white text-sm px-4 py-2 rounded-full cursor-not-allowed"
                    disabled
                  >
                    Assigned
                  </button>
                ) : (
                  <button
                    onClick={() => handleAssign(pet.name)}
                    className="glow-btn text-sm"
                  >
                    Assign
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PetShop;
