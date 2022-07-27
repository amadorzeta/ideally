import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const dot = useRef(null);
  const posX = useRef(null);
  const posY = useRef(null);

  const mouseMoveEvent = (e) => {
    posX.current = e.pageX;
    posY.current = e.pageY;
    console.log(posX.current);
    dot.current.style.top = posY.current + "px";
    dot.current.style.left = posX.current + "px";
  };
  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveEvent);
    return () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, []);
  return (
    <div
      ref={dot}
      className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center pointer-events-none"
    >
      <div className="bg-indigo-800 h-12 w-2 absolute"></div>
      <div className="bg-indigo-800 h-12 w-2 absolute rotate-90"></div>
    </div>
  );
};

export default Cursor;
