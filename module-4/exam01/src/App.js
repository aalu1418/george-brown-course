import React from 'react'
import './App.css'

import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'

function App() {
  const [timer, setTimer] = React.useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const timerState = { timer, setTimer }

  const [timeLeft, setTimeLeft] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const runningState = { isRunning, setIsRunning }

  //set timeLeft when timer is changed
  React.useEffect(() => {
    setTimeLeft(timer.hours * 3600 + timer.minutes * 60 + timer.seconds)
  }, [timer])

  //decrease timer count
  React.useEffect(() => {
    let intervalId = null
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        // console.log('running')
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning, timeLeft])

  return (
    <div className='App'>
      <div className='App-Content'>
        <Grid container direction='column' spacing={3} alignItems='center'>
          <TimerInterface state={timerState}></TimerInterface>
          <CountDown timeLeft={timeLeft}></CountDown>
          <ButtonInterface
            state={timerState}
            running={runningState}
            currentTime={timeLeft}
          ></ButtonInterface>
        </Grid>
      </div>
    </div>
  )
}

export default App

//dropdown menu component
const DropDownMenu = ({ state, instance, list }) => {
  const onChange = event =>
    state.setTimer({ ...state.timer, [instance]: event.target.value })
  return (
    <Grid item>
      <TextField
        select
        variant='outlined'
        label={instance}
        value={state.timer[instance]}
        onChange={onChange}
        style={{ minWidth: 100 }}
      >
        {list.map(item => {
          return (
            <MenuItem key={String(item)} value={item}>
              {item}
            </MenuItem>
          )
        })}
      </TextField>
    </Grid>
  )
}

//basic row container component
const RowContainer = ({ children, justify = 'center' }) => {
  return (
    <Grid item xs={12}>
      <Grid
        container
        direction='row'
        spacing={5}
        alignItems='center'
        justify={justify}
      >
        {children}
      </Grid>
    </Grid>
  )
}

//timer interface component
const TimerInterface = ({ state }) => {
  const hours = []
  const minutes = []
  const seconds = []

  //create array with 0 to 59
  for (let i = 0; i < 60; i++) {
    if (i <= 24) {
      hours.push(i)
    }
    minutes.push(i)
    seconds.push(i)
  }

  return (
    <RowContainer>
      <DropDownMenu list={hours} state={state} instance={'hours'} />
      <DropDownMenu list={minutes} state={state} instance={'minutes'} />
      <DropDownMenu list={seconds} state={state} instance={'seconds'} />
    </RowContainer>
  )
}

//buttons component
const ButtonInterface = ({ state, running, currentTime }) => {
  const reset = () => {
    state.setTimer({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    running.setIsRunning(false)
  }

  const startPause = () => {
    running.setIsRunning(!running.isRunning)
  }

  return (
    <RowContainer justify='space-between'>
      <Grid item>
        <Fab
          onClick={reset}
          disabled={
            !state.timer.hours &&
            !state.timer.minutes &&
            !state.timer.seconds
          }
          color ="secondary"
        >
          Reset
        </Fab>
      </Grid>
      <Grid item>
        <Fab color="primary" onClick={startPause} disabled={currentTime === 0}>
          {running.isRunning ? 'Pause' : 'Start'}
        </Fab>
      </Grid>
    </RowContainer>
  )
}

//countdown display component
const CountDown = ({ timeLeft }) => {
  //calculates remaining time from remaining seconds & adds 0 if a single digit
  const secondsLeft = timeLeft % 60 < 10 ? '0' + (timeLeft % 60) : timeLeft % 60
  const minutesLeft =
    ((timeLeft - secondsLeft) / 60) % 60 < 10
      ? '0' + (((timeLeft - secondsLeft) / 60) % 60)
      : ((timeLeft - secondsLeft) / 60) % 60
  const hoursLeft =
    (timeLeft - secondsLeft - minutesLeft * 60) / 3600 < 10
      ? '0' + (timeLeft - secondsLeft - minutesLeft * 60) / 3600
      : (timeLeft - secondsLeft - minutesLeft * 60) / 3600

  return (
    <RowContainer>
      <p className='CountDown-Text'>
        {hoursLeft + ' : ' + minutesLeft + ' : ' + secondsLeft}
      </p>
    </RowContainer>
  )
}
