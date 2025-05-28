// src/components/TooltipPortal.js
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function TooltipPortal({ children }) {
  const [tooltipContainer, setTooltipContainer] = useState(null);

  useEffect(() => {
    const el = document.getElementById("tooltip-root");
    setTooltipContainer(el);
  }, []);

  if (!tooltipContainer) return null;

  return createPortal(children, tooltipContainer);
}
