import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import {
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom'

import FLASH_CARDS from './flash-cards.json'

export default function App() {
  return (
    <div className='App'>
      <div className='App-Content'>
        <AppHeader />

        <AppFooter />
      </div>
    </div>
  )
}

function AppHeader() {
  return (
    <Grid container={true} className='AppHeader'>
      <div className='AppHeader-Title'>
        <Typography variant='h4' component='h1' align='center'>
          <Link>Flash Cards App</Link>
        </Typography>
      </div>
    </Grid>
  )
}

function AppFooter() {
  return (
    <div>
      <Box m={8} />
      <Typography align='center' color='primary'>
        <Link style={{ color: 'inherit' }}>About me</Link>
      </Typography>
    </div>
  )
}
