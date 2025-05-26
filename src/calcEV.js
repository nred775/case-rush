import crates from "./data/crates";
import wheels from "./data/wheels";

export function logEVs() {
  const sortedCrates = [...crates].sort((a, b) => a.cost - b.cost);
  const sortedWheels = [...wheels].sort((a, b) => a.cost - b.cost);

  console.log("%c--- Crates (Cheapest → Most Expensive) ---", "color:#38bdf8; font-weight: bold;");
  sortedCrates.forEach((crate) => {
    const total = crate.items.reduce((sum, item) => sum + item.value, 0);
    const avg = total / crate.items.length;
    const evRatio = avg / crate.cost;

    console.log(
      `%c${crate.name}`,
      "color:#facc15; font-weight: bold;",
      `Cost: $${crate.cost} | Avg Prize: $${avg.toFixed(2)} | EV Ratio: ${evRatio.toFixed(2)}`
    );
  });

  console.log("%c--- Wheels (Cheapest → Most Expensive) ---", "color:#38bdf8; font-weight: bold;");
  sortedWheels.forEach((wheel) => {
    const total = wheel.items.reduce((sum, item) => sum + item.value, 0);
    const avg = total / wheel.items.length;
    const evRatio = avg / wheel.cost;

    console.log(
      `%c${wheel.name}`,
      "color:#facc15; font-weight: bold;",
      `Cost: $${wheel.cost} | Avg Prize: $${avg.toFixed(2)} | EV Ratio: ${evRatio.toFixed(2)}`
    );
  });
}
