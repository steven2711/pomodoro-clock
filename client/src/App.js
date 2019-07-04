import React, { Component } from "react";
import "./App.css";
import Display from "./components/display";
import SessionLength from "./components/sessionLength";
import BreakLength from "./components/breakLength";
import sound from "./assets/Alarm.mp3";

class App extends Component {
  state = {
    sessionLength: 25,
    breakLength: 5,
    sessionTimer: 1500,
    originalSession: 1500,
    breakTimer: 300,
    originalBreak: 300,
    sessionOn: false,
    breakIntervalId: null,

    timerStarted: false,
    intervalID: null
  };

  handleSessionIncrement = () => {
    if (this.state.sessionLength < 60 && !this.state.timerStarted) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        sessionTimer: this.state.sessionTimer + 60,
        originalSession: this.state.originalSession + 60
      });
    }
  };

  handleBreakIncrement = () => {
    if (this.state.breakLength < 60 && !this.state.timerStarted) {
      this.setState({
        breakLength: this.state.breakLength + 1,
        breakTimer: this.state.breakTimer + 60,
        originalBreak: this.state.originalBreak + 60
      });
    }
  };

  handleSessionDecrement = () => {
    if (this.state.sessionLength > 1 && !this.state.timerStarted) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        sessionTimer: this.state.sessionTimer - 60,
        originalSession: this.state.originalSession - 60
      });
    }
  };

  handleBreakDecrement = () => {
    if (this.state.breakLength > 1 && !this.state.timerStarted) {
      this.setState({
        breakLength: this.state.breakLength - 1,
        breakTimer: this.state.breakTimer - 60,
        originalBreak: this.state.originalBreak - 60
      });
    }
  };

  clockify = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };

  handleSound = () => {
    if (this.state.sessionTimer === 0) {
      this.audioHandle.play();
    }
  };

  startStopTimer = () => {
    if (!this.state.timerStarted) {
      this.setState({
        timerStarted: true,
        intervalID: setInterval(() => {
          if (this.state.sessionTimer >= 0) {
            this.setState({
              sessionTimer: this.state.sessionTimer - 1
            });
          } else {
            if (this.state.breakTimer > 0) {
              this.setState({
                sessionOn: true,
                breakTimer: this.state.breakTimer - 1
              });
            } else {
              this.setState({
                breakTimer: this.state.originalBreak,
                sessionTimer: this.state.originalSession,
                sessionOn: false
              });
            }
          }
        }, 1000)
      });
    } else if (this.state.timerStarted) {
      clearInterval(this.state.intervalID);
      this.setState({
        timerStarted: false,
        intervalID: null
      });
    }
  };

  handleReset = () => {
    clearInterval(this.state.intervalID);
    this.audioHandle.pause();
    this.audioHandle.currentTime = 0;
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      sessionTimer: 1500,
      originalSession: 1500,
      breakTimer: 300,
      originalBreak: 300,
      sessionOn: false,
      breakIntervalId: null,
      timerStarted: false,
      intervalID: null
    });
  };

  render() {
    return (
      <div className="App container-fluid">
        <div className="h-100 row align-items-center">
          <div className="col">
            <h1 className="mb-5">Pomodoro Clock</h1>
            <SessionLength
              sessionLength={this.state.sessionLength}
              handleIncrement={this.handleSessionIncrement}
              handleDecrement={this.handleSessionDecrement}
            />
            <BreakLength
              breakLength={this.state.breakLength}
              handleIncrement={this.handleBreakIncrement}
              handleDecrement={this.handleBreakDecrement}
            />
            <Display
              sessionTimer={this.clockify(this.state.sessionTimer)}
              breakTimer={this.clockify(this.state.breakTimer)}
              startStop={this.startStopTimer}
              reset={this.handleReset}
              sessionOn={this.state.sessionOn}
              sessionTime={this.state.sessionTimer}
            />
          </div>
        </div>
        <div>
          {this.handleSound()}
          <audio
            id="beep"
            ref={audio => (this.audioHandle = audio)}
            src={sound}
          />
        </div>
      </div>
    );
  }
}

export default App;
