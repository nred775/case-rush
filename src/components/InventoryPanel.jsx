import React, { useMemo } from "react";

function timeAgo(dateString) {
  const now = new Date();
  const then = new Date(dateString);
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
}

export default function InventoryPanel({ inventory, onSellItem, onSellAll }) {
  const sortedInventory = useMemo(() => {
    return [...inventory]
      .map((item) => ({
        ...item,
        addedAt: item.addedAt || new Date().toISOString(),
      }))
      .sort((a, b) => b.value - a.value);
  }, [inventory]);

  const totalValue = sortedInventory.reduce((sum, item) => sum + item.value, 0);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "text-gray-400";
      case "rare":
        return "text-orange-400";
      case "epic":
        return "text-purple-400";
      case "legendary":
        return "text-yellow-300";
      case "mythic":
        return "text-fuchsia-300 animate-pulse";
      default:
        return "text-white";
    }
  };

  const formatRarity = (rarity) =>
    rarity ? rarity.charAt(0).toUpperCase() + rarity.slice(1) : "";

  return (
    <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 mt-6">
      <h2 className="text-lg font-bold text-white mb-3">📦 Your Inventory</h2>
      {sortedInventory.length === 0 ? (
        <p className="text-gray-400">No items yet. Open a case!</p>
      ) : (
        <>
          <ul className="space-y-2">
            {sortedInventory.map((item, index) => (
              <li
                key={index}
                className="bg-gray-800 rounded p-3 flex items-center justify-between"
              >
                <div>
                  <p className={`font-semibold ${getRarityColor(item.rarity)}`}>
                    {item.item}
                  </p>
                  <p className="text-xs text-gray-400">
                    from {item.case} • {timeAgo(item.addedAt)}
                  </p>
                  <p className="text-xs italic text-gray-500">
                    {formatRarity(item.rarity)}
                  </p>
                </div>
                <button
                  onClick={() => onSellItem(index)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                >
                  Sell for ${item.value.toLocaleString()}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between items-center">
  <p className="text-white text-sm font-medium">
    Total Value: ${totalValue.toLocaleString()}
  </p>
  <button
  onClick={onSellAll}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold"
>
  Sell All
</button>

</div>

        </>
      )}
    </div>
  );
}
