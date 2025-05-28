import React, { useRef, useState, useEffect } from "react";
import TooltipPortal from "./TooltipPortal";

export default function Tooltip({ children, content }) {
  const ref = useRef();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX + 10, y: e.clientY + 10 });
    };

    if (visible) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="inline-block"
      >
        {children}
      </div>

      {visible && (
        <TooltipPortal>
          <div
            className="fixed z-50 bg-black text-white text-xs rounded px-2 py-1 pointer-events-none"
            style={{
              top: coords.y,
              left: coords.x,
              transform: "translateY(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            {content}
          </div>
        </TooltipPortal>
      )}
    </>
  );
}
