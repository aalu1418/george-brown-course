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
        <Switch>
          <Route path='/card/:cardId' render={() => <CardPage />} />
          <Route path='/about-me' render={() => <AboutMePage />} />
          <Route path='/' render={() => <NoActiveCardPage />} />
        </Switch>
        <AppFooter />
      </div>
    </div>
  )
}

function AppHeader() {
  const history = useHistory()

  return (
    <Grid container={true} className='AppHeader'>
      <Button variant='outlined' onClick={() => history.goBack()}>
        <ChevronLeft />
      </Button>
      <div className='AppHeader-Title'>
        <Typography variant='h4' component='h1' align='center'>
          <Link to='/'>Flash Cards App</Link>
        </Typography>
      </div>
      <Button variant='outlined' onClick={() => history.goForward()}>
        <ChevronRight />
      </Button>
    </Grid>
  )
}

function AppFooter() {
  const location = useLocation()

  return (
    <div>
      <Box m={8} />
      <Typography align='center' color='primary'>
        {location.pathname === '/about-me' ? (
          <Link style={{ color: 'inherit' }} to='/'>
            Homepage
          </Link>
        ) : (
          <Link style={{ color: 'inherit' }} to='/about-me'>
            About me
          </Link>
        )}
      </Typography>
    </div>
  )
}

function AboutMePage() {
  return (
    <div>
      <Box m={8} />
      <Typography align='center'>
        <Typography>Name</Typography>
        <Typography variant='h5'>Amsul Naeem</Typography>
        <Box m={2} />
        <Typography>Student ID</Typography>
        <Typography variant='h5'>123 456 789</Typography>
      </Typography>
    </div>
  )
}

function NoActiveCardPage() {
  return (
    <div>
      <CardThumbnailsRow />
      <Typography align='center' variant='h4' component='p'>
        <span role='img' aria-label='Point up'>
          👆
        </span>{' '}
        Pick a flash card to view
      </Typography>
    </div>
  )
}

function CardPage() {
  const { cardId } = useParams()
  const data = FLASH_CARDS.find(flashCard => flashCard.id === cardId)

  return (
    <div>
      <CardThumbnailsRow />
      <Paper className='Card' elevation={6}>
        <Typography
          align='center'
          variant='h4'
          component='p'
          className='Card-Body'
        >
          {data.body}
        </Typography>
        <Box m={3} />
        <Typography align='center' className='Card-Caption'>
          – {data.quote}
        </Typography>
      </Paper>
    </div>
  )
}

function CardThumbnailsRow() {
  const { cardId } = useParams()
  return (
    <div>
      <Box m={4} />
      <Grid container={true} justify='space-between'>
        {FLASH_CARDS.map(flashCard => (
          <CardThumbnail
            key={flashCard.id}
            label={flashCard.title}
            isActive={flashCard.id === cardId}
            to={`/card/${flashCard.id}`}
          />
        ))}
      </Grid>
      <Box m={6} />
    </div>
  )
}

function CardThumbnail({ label, isActive, to }) {
  return (
    <Button
      className='CardThumbnail'
      variant='outlined'
      color={isActive ? 'primary' : undefined}
      component={Link}
      to={to}
    >
      <Typography className='CardThumbnail-Text' variant='body2'>
        {label}
      </Typography>
    </Button>
  )
}
