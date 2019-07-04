import React, { Component } from "react";

class SessionLength extends Component {
  state = {};
  render() {
    return (
      <div className="container mb-3">
        <h5 id="session-label">Session Length</h5>
        <button
          id="session-decrement"
          className="btn btn-outline-none"
          value={this.props.sessionLength}
          onClick={this.props.handleDecrement}
        >
          <i className="fas fa-angle-down icons" />
        </button>
        <span id="session-length">{this.props.sessionLength}</span>
        <button
          id="session-increment"
          className="btn btn-outline-none"
          value={this.props.sessionLength}
          onClick={this.props.handleIncrement}
        >
          <i className="fas fa-angle-up icons" />
        </button>
      </div>
    );
  }
}

export default SessionLength;
