import React, { Component } from "react";

class Display extends Component {
  state = {};
  render() {
    return (
      <div className="container mt-4">
        <div className="border rounded">
          <h5 id="timer-label">
            {this.props.sessionTime > -1 ? "Session" : "Break"}
          </h5>
          <h1 className="display" id="time-left">
            {this.props.sessionTime > -1
              ? this.props.sessionTimer
              : this.props.breakTimer}
          </h1>
          <button
            id="start_stop"
            className="btn"
            onClick={this.props.startStop}
          >
            <i className="fas fa-play icons" />
            <i className="fas fa-pause icons" />
          </button>

          <button id="reset" className="btn" onClick={this.props.reset}>
            <i className="fas fa-sync-alt icons" />
          </button>
        </div>
      </div>
    );
  }
}

export default Display;
