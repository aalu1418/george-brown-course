import './App.css'
import React from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

export default function App() {
  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Exercise 1: Timer App</h1>

        <Timer />
      </div>
    </div>
  )
}

class Timer extends React.Component {
  intervalId = null

  state = {
    currentTime: 0,
    isStopped: true,
  }

  render() {
    const { isStopped, currentTime } = this.state
    return (
      <div>
        <div>Current time: {this.getFormattedCurrentTime()}</div>
        <br />
        <Divider />
        <br />
        <Button
          variant='contained'
          color='primary'
          onClick={this.onClickStartStop}
        >
          {isStopped ? 'Start' : 'Stop'}
        </Button>
        <br />
        <br />
        <Button
          variant='contained'
          color='secondary'
          onClick={this.onClickReset}
          disabled={currentTime === 0}
        >
          Reset
        </Button>
      </div>
    )
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  onClickStartStop = () => {
    const nextIsStopped = !this.state.isStopped
    this.setState({
      isStopped: nextIsStopped,
    })

    if (this.intervalId) {
      clearInterval(this.intervalId)
    }

    if (!nextIsStopped) {
      this.intervalId = setInterval(() => {
        this.setState({
          currentTime: this.state.currentTime + 1,
        })
      }, 1000)
    }
  }

  onClickReset = () => {
    this.setState({
      currentTime: 0,
      isStopped: true,
    })
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  getFormattedCurrentTime() {
    const { currentTime } = this.state
    if (currentTime === 1) {
      return `${currentTime} second passed`
    }
    return `${currentTime} seconds passed`
  }
}
