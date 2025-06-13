import React from "react";

export default function RegularCard({ card, isSelected, onClick }) {
  const displayValue = (val) => {
    if (val === 11) return "J";
    if (val === 12) return "Q";
    if (val === 13) return "K";
    if (val === 14) return "A";
    return val;
  };

  const safeSuit = ["hearts", "diamonds", "clubs", "spades"].includes(card.suit)
    ? card.suit
    : "spades"; // fallback for 'custom' or undefined

  const suitSymbol =
    safeSuit === "hearts" ? "♥" :
    safeSuit === "diamonds" ? "♦" :
    safeSuit === "clubs" ? "♣" : "♠";

  const textColor =
    safeSuit === "hearts" || safeSuit === "diamonds"
      ? "text-red-500"
      : safeSuit === "clubs"
      ? "text-green-600"
      : "text-gray-800";

  const suitBorderColor = {
    hearts: "border-red-500",
    diamonds: "border-red-500",
    clubs: "border-green-600",
    spades: "border-gray-800",
  };

const isImageCard = card.type === "choice" || card.type === "power" || card.value >= 11;
  const suitCode = safeSuit.toLowerCase();
  const valueCode =
    card.value === 14 ? "ace" :
    card.value === 13 ? "king" :
    card.value === 12 ? "queen" :
    card.value === 11 ? "jack" : card.value;

  const imageSrc =
    card.type === "power" || card.type === "choice"
      ? `/fate-card-images/${card.name.toLowerCase().replace(/ /g, "_")}.jpg`
      : `/fate-card-images/${valueCode}_${suitCode}.jpg`;

      const isStandardCard = card.type === "regular" && card.value >= 2 && card.value <= 10;

  return (
    <div className="relative group">
      <div
  className={`relative w-[104px] h-[156px] rounded-xl overflow-hidden shadow-md cursor-pointer border-4 ${
    isSelected
      ? "border-yellow-600 shadow-[0_0_10px_3px_rgba(250,204,21,0.8)]"
      : isStandardCard
      ? `${suitBorderColor[safeSuit] || "border-gray-500"} bg-gray-200`
      : "border-black"
  }`}
  onClick={onClick}
>


        {isImageCard ? (
          <img
            src={imageSrc}
            alt={`${displayValue(card.value)} of ${safeSuit}`}
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="relative w-full h-full p-2">
            <div className={`absolute top-1 left-1 text-xs font-bold text-left ${textColor}`}>
              {displayValue(card.value)}
              <div className="text-[10px] leading-none">{suitSymbol}</div>
            </div>

            <div className={`absolute inset-0 flex justify-center items-center text-4xl font-bold ${textColor}`}>
              {suitSymbol}
            </div>

            <div className={`absolute bottom-1 right-1 text-xs font-bold text-right ${textColor}`}>
              {displayValue(card.value)}
              <div className="text-[10px] leading-none">{suitSymbol}</div>
            </div>
          </div>
        )}
      </div>

      {(card.type === "power" || card.type === "choice") && (
        <div className="hidden group-hover:flex absolute z-50 top-1/2 left-[110%] -translate-y-1/2 flex-col items-center w-[220px] rounded-xl overflow-hidden shadow-lg border-2 bg-black border-white p-2">
          <img
            src={imageSrc}
            alt={card.name || `${displayValue(card.value)} of ${safeSuit}`}
            className="w-full h-[260px] object-cover rounded-xl mb-2"
          />
          {card.description && (
            <div className="text-xs text-white text-center px-1">
              {card.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
