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

const Timer = () => {
  const [isStopped, setIsStopped] = React.useState(true)
  const [currentTime, setCurrentTime] = React.useState(0)

  const getFormattedCurrentTime = () => {
    if (currentTime === 1) {
      return `${currentTime} second passed`
    }
    return `${currentTime} seconds passed`
  }

  React.useEffect(() => {
    let intervalId = null
    if (!isStopped) {
      intervalId = setInterval(() => {
        // console.log('running')
        setCurrentTime(currentTime+1)
      }, 1000)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isStopped, currentTime])

  const onClickReset = () => {
    setCurrentTime(0)
    setIsStopped(true)
  }

  const onClickStartStop = () => {
    setIsStopped(!isStopped)
  }

  return (
    <div>
      <div>Current time: {getFormattedCurrentTime()}</div>
      <br />
      <Divider />
      <br />
      <Button variant='contained' color='primary' onClick={onClickStartStop}>
        {isStopped ? 'Start' : 'Stop'}
      </Button>
      <br />
      <br />
      <Button
        variant='contained'
        color='secondary'
        onClick={onClickReset}
        disabled={currentTime === 0}
      >
        Reset
      </Button>
    </div>
  )
}
