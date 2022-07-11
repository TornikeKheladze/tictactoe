import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  render() {
    return <div className="Board">{this.props.mapOnSquare}</div>;
  }
}

export default Board;
