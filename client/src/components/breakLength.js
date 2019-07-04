import React, { Component } from "react";

class BreakLength extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <h5 id="break-label">Break Length</h5>
        <button
          id="break-decrement"
          className="btn"
          value={this.props.breakLength}
          onClick={this.props.handleDecrement}
        >
          <i className="fas fa-angle-down icons" />
        </button>
        <span id="break-length">{this.props.breakLength}</span>
        <button
          id="break-increment"
          className="btn"
          value={this.props.breakLength}
          onClick={this.props.handleIncrement}
        >
          <i className="fas fa-angle-up icons" />
        </button>
      </div>
    );
  }
}

export default BreakLength;
