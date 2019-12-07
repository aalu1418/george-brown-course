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
          <Route path='/about-me'>
            <BlankCard text="Aaron Lu - 101278524" />
          </Route>
          <Route path='/'>
            <CardsList />
            <Switch>
              <Route path='/cards/:id'>
                <Card />
              </Route>
              <Route path='/'>
                <BlankCard text="Select a card to start!" />
              </Route>
            </Switch>
          </Route>
        </Switch>
        <AppFooter />
      </div>
    </div>
  )
}

function AppHeader() {
  const history = useHistory();

  return (
    <Grid container={true} className='AppHeader'>
      <div className='AppHeader-Title'>
        <Button variant="outlined" onClick={() => history.goBack()}><ChevronLeft /></Button>
        <Typography variant='h4' component='h1' align='center'>
          <Link to='/'>Flash Cards App</Link>
        </Typography>
        <Button variant="outlined" onClick={() => history.goForward()}><ChevronRight /></Button>
      </div>
    </Grid>
  )
}

function AppFooter() {
  const location = useLocation()
  const pathname = location.pathname.split("/")[1]

  const aboutMe = (
    <Link to='/about-me' style={{ color: 'inherit' }}>
      About me
    </Link>
  )

  const homepage = (
    <Link to='/' style={{ color: 'inherit' }}>
      Homepage
    </Link>
  )

  return (
    <div>
      <Box m={8} />
      <Typography align='center' color='primary'>
        {pathname === "about-me" ? homepage : aboutMe}
      </Typography>
    </div>
  )
}

const CardsList = () => {
  return (
    <Grid className="CardsList" container justify='space-between'>
      {FLASH_CARDS.map(card => (
        <CardThumbnail key={card.id} card={card} />
      ))}
    </Grid>
  )
}

const CardThumbnail = ({ card }) => {
  const location = useLocation()

  // React.useEffect(() => {console.log(location.pathname.split("/")[2])}, [location])

  const className = () => {
    let string = 'CardThumbnail-Paper MuiButton-outlined'
    if (card.id === location.pathname.split("/")[2]){
      string += " selected"
    }
    return string
  }

  return (
    <Grid item key={card.id}>
      <Link to={`/cards/${card.id}`} className='CardThumbnail-Link'>
        <Paper className={className()}>
          <Typography
            className='CardThumbnail-Text MuiTypography-body2'
            variant='button'
          >
            {card.title}
          </Typography>
        </Paper>
      </Link>
    </Grid>
  )
}

const Card = () => {
  const { id } = useParams()

  const card = FLASH_CARDS.filter(card => card.id === id)[0]

  return (
    <Paper className='Card MuiPaper-rounded'>
      <Typography className='Card-Body MuiTypography-h4'>
        {card.body}
      </Typography>
      <Typography className='Card-Caption MuiTypography-body1'>
        {`~ ${card.quote}`}
      </Typography>
    </Paper>
  )
}

const BlankCard = ({text}) => {
  return (
    <Paper className='Card MuiPaper-rounded'>
      <Typography className='Card-Body MuiTypography-h4'>
        {text}
      </Typography>
    </Paper>
  )
}
