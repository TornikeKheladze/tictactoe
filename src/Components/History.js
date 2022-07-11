const History = ({ clicked, stateHistory, currentMove }) => {
  let style = null;
  const mappedHistory = (
    <ul>
      {stateHistory.map((_, i) => {
        if (stateHistory.length - i - 1 === currentMove) {
          style = { fontWeight: "bold" };
        }
        style =
          stateHistory.length - i - 1 === currentMove
            ? { fontWeight: "bold" }
            : null;
        return (
          <li
            className="history-li"
            key={i}
            // {(stateHistory.length - i - 1)===currentMove? style={{}}}
            style={style}
            onClick={() => clicked(stateHistory.length - i - 1)}
          >
            {i === 0 ? "Go to game start" : `Go to move #${i}`}
          </li>
        );
      })}
    </ul>
  );
  return <div className="History">{mappedHistory}</div>;
};

export default History;
