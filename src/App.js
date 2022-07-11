import { Component } from "react";
import "./App.css";
import "./styles/root.scss";
import Board from "./Components/Board";
import Square from "./Components/Square";
import History from "./Components/History";
class App extends Component {
  state = {
    history: [{ board: Array(9).fill(null), which: false }],
    active: 0,
  };
  onRestart = () => {
    this.setState({
      history: [{ board: Array(9).fill(null), which: false }],
      active: 0,
    });
  };

  onSquareClick = (index, x) => {
    if (
      x ||
      this.checkWinner(this.state.history[this.state.active].board)
        .returnValue ||
      this.state.active !== 0
    )
      return;
    const xo = !this.state.history[this.state.active].which ? "X" : "O";
    const updated = this.state.history[this.state.active].board.map((x, i) =>
      i === index ? xo : x
    );

    this.setState((prevstate) => {
      return {
        history: [
          {
            board: updated,
            which: !this.state.history[this.state.active].which,
          },
          ...prevstate.history,
        ],
      };
    });
  };
  onHistoryClick = (id) => {
    this.setState({ active: id });
  };
  mapOnSquare = () => {
    const mapped = this.state.history[this.state.active].board.map((x, i) => {
      // winnerId={
      //
      // }
      // console.log(
      //   this.checkWinner(this.state.history[this.state.active].board).winnerId,
      //   i
      // );
      const winner = (index) => {
        let returnNumber = null;
        if (
          this.checkWinner(this.state.history[this.state.active].board).winnerId
        ) {
          this.checkWinner(
            this.state.history[this.state.active].board
          ).winnerId.map((winId) => {
            if (index === winId) {
              returnNumber = winId;
            }
          });
        }
        return returnNumber;
      };

      // console.log(winner(i));
      return (
        <Square
          value={x}
          key={i}
          clicked={() => this.onSquareClick(i, x)}
          nextPlayer={this.state.history[this.state.active].which}
          winnerId={winner(i)}
        />
      );
    });
    return mapped;
  };
  checkWinner = (boardArray) => {
    const list = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let returnValue = null;
    let winnerId = null;
    list.forEach((x) => {
      const row = [];
      x.forEach((squareNum) => {
        row.push(boardArray[squareNum]);
      });
      if (row.join("") === "XXX") {
        winnerId = x;
        returnValue = "X";
      } else if (row.join("") === "OOO") {
        winnerId = x;
        returnValue = "O";
      }
    });
    const draw = this.state.history[this.state.active].board.includes(null);
    if (!draw && !returnValue) {
      returnValue = "Draw";
    }

    return { returnValue, winnerId };
  };
  message = () => {
    if (
      this.checkWinner(this.state.history[this.state.active].board)
        .returnValue === "Draw"
    ) {
      return "Draw";
    }
    const message = this.checkWinner(
      this.state.history[this.state.active].board
    ).returnValue
      ? ` ${
          this.checkWinner(this.state.history[this.state.active].board)
            .returnValue
        } Wins`
      : `Next move ${!this.state.history[this.state.active].which ? "X" : "O"}`;
    return message;
  };
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <h1>TIC TAC TOE</h1>
        <p onClick={this.onRestart}>Restart</p>
        <h2>{this.message()}</h2>
        <Board mapOnSquare={this.mapOnSquare()} />
        <History
          clicked={this.onHistoryClick}
          stateHistory={this.state.history}
          currentMove={this.state.active}
        />
      </div>
    );
  }
}

export default App;
