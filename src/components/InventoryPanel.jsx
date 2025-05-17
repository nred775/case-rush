import React from "react";

export default function InventoryPanel({ inventory, onSellItem }) {
  return (
    <div className="w-full max-w-md bg-gray-900 rounded-lg p-4 mt-6">
      <h2 className="text-lg font-bold text-white mb-3">📦 Your Inventory</h2>
      {inventory.length === 0 ? (
        <p className="text-gray-400">No items yet. Open a case!</p>
      ) : (
        <ul className="space-y-2">
          {inventory.map((item, index) => (
            <li
              key={index}
              className="bg-gray-800 rounded p-3 flex items-center justify-between"
            >
              <div>
                <p className="text-white font-semibold">{item.item}</p>
                <p className="text-xs text-gray-400">from {item.case}</p>
              </div>
              <button
                onClick={() => onSellItem(index)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
              >
                Sell for ${item.value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
