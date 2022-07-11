import React, { useState, useEffect } from "react";

const Square = ({ value, clicked, nextPlayer, winnerId }) => {
  const next = !nextPlayer ? "X" : "O";
  const [opacity, setOpacity] = useState(0);
  const style = (val) => {
    if (!val) return null;
    if (val === "X") {
      return "red";
    } else {
      return "blue";
    }
  };

  const winner =
    winnerId !== null
      ? { transition: "0,8s", fontSize: "70px", color: "black" }
      : null;
  return (
    <button
      style={{ backgroundColor: style(value), ...winner }}
      className="btn"
      onMouseEnter={() => setOpacity(0.2)}
      onMouseLeave={() => setOpacity(0)}
      onClick={clicked}
    >
      {value ? (
        <span>{value}</span>
      ) : (
        <span style={{ opacity: opacity, color: "black" }}>{next}</span>
      )}
    </button>
  );
};

export default Square;
