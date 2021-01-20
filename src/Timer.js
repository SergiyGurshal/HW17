import React, { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { time: {}, seconds: this.props.time, width: 100 }
    this.timer = 0
    this.startTimer = this.startTimer.bind(this)
    this.countDown = this.countDown.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
  }

  parsTime(secs) {
    const hours = Math.floor(secs / (60 * 60))

    const divisor_for_minutes = secs % (60 * 60)
    const minutes = Math.floor(divisor_for_minutes / 60)

    const divisor_for_seconds = divisor_for_minutes % 60
    const seconds = Math.ceil(divisor_for_seconds)

    const obj = {
      h: hours,
      m: minutes,
      s: seconds,
    }
    return obj
  }

  startTimer() {
    if (this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, this.props.step * 1000)
      this.props.onTimeStart(this.state.seconds)
    }

    document.getElementById('startBtn').disabled = true
    document.getElementById('pauseBtn').disabled = false
  }

  componentDidMount() {
    let timeLeftVar = this.parsTime(this.state.seconds)
    this.setState({ time: timeLeftVar })

    if (this.props.autostart) {
      this.startTimer()
      document.getElementById('startBtn').disabled = false
      document.getElementById('pauseBtn').disabled = true
    }

    document.getElementById('startBtn').disabled = true
    document.getElementById('pauseBtn').disabled = false
  }

  countDown() {
    let seconds = this.state.seconds - this.props.step
    this.setState({
      time: this.parsTime(seconds),
      seconds: seconds,
    })

    this.setState({ width: this.state.width - (100 / this.props.time) * this.props.step })
    this.props.onTick(this.state.seconds)

    if (seconds === 0) {
      this.props.onTimeEnd()
      clearInterval(this.timer)
    }
  }

  pauseTimer() {
    this.props.onTimePause(this.state.seconds)
    clearInterval(this.timer)

    document.getElementById('startBtn').disabled = false
    document.getElementById('pauseBtn').disabled = true
  }

  render() {
    return (
      <div>
        <div>
          {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
        </div>
        <div className="loadBar" style={{ width: `${this.state.width}%` }}></div>
        <button onClick={this.startTimer} id="startBtn">
          Start
        </button>
        <button onClick={this.pauseTimer} id="pauseBtn">
          Pause
        </button>
      </div>
    )
  }
}
