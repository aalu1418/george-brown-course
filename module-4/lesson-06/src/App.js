import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import sendTransaction from './sendTransaction'

export default function App() {
  return (
    <div className='App'>
      <div className='App-Content'>
        <AppHeader />
        <Box m={4} />
        <AppBody />
      </div>
    </div>
  )
}

function AppHeader() {
  return (
    <div className='AppHeader'>
      <Typography component='h1'>Alice & Bob</Typography>
    </div>
  )
}

function AppBody() {
  const [amount, setAmount] = React.useState('')
  const [toAddress, setToAddress] = React.useState('')
  const [message, setMessage] = React.useState('')

  const onClick = async () => {
    await sendTransaction({
      valueInEth: amount,
      gas: 4200000,
      toAddress,
      message,
    })
  }

  return (
    <Grid container={true} direction='column'>
      <TextField
        label='To Address'
        value={toAddress}
        onChange={event => setToAddress(event.target.value.slice(0, 42))}
      />
      <Box m={1} />
      <TextField
        label='Enter ETH amount'
        value={amount}
        onChange={event => setAmount(event.target.value)}
      />
      <Box m={1} />
      <TextField
        label='Message (optional)'
        value={message}
        onChange={event => setMessage(event.target.value)}
      />
      <Box m={3} />
      <Button
        onClick={onClick}
        variant='contained'
        color='primary'
        disabled={toAddress.length !== 42 || toAddress.slice(0, 2) !== '0x'}
      >
        Send ETH
      </Button>
    </Grid>
  )
}
