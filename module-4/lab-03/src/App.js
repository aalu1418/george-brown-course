import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { BrowserRouter, useHistory, useLocation } from 'react-router-dom'

import { PHRASES } from './constants'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-Content'>
          <Typography>Search UI</Typography>
          <Box m={3} />
          <AppBody />
        </div>
      </div>
    </BrowserRouter>
  )
}

function AppBody() {
  return (
    <Grid container={true} direction='column'>
      <TextField variant='outlined' label='Enter your search text' />

      <Box m={2} />

      {/* Put your solution here 👇 */}
    </Grid>
  )
}
