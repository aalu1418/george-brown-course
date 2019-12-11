import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-Content'>
          <AppHeader />
          <AppBody />
        </div>
      </div>
    </BrowserRouter>
  )
}

function AppHeader() {
  return (
    <div className='AppHeader'>
      <Typography component='h1'>Dappest dApp</Typography>
    </div>
  )
}

function AppBody() {
  const [savedUsername, setSavedUsername] = React.useState(
    window.localStorage.getItem('username') || '',
  )
  React.useEffect(() => {
    if (savedUsername) {
      window.localStorage.setItem('username', savedUsername)
    } else {
      window.localStorage.removeItem('username')
    }
  }, [savedUsername])

  return (
    <Switch>
      <Route
        path='/login'
        render={() => (
          <LoginPage
            savedUsername={savedUsername}
            setSavedUsername={setSavedUsername}
          />
        )}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/contact'
        render={() => <ContactPage />}
      />
      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        path='/'
        render={() => <HomePage />}
      />
    </Switch>
  )
}

const withLoggedInState = Component => {
  return function NewComponent({ isLoggedIn, ...props }) {
    return (
      <div>
        {!isLoggedIn && <Redirect to='/login' />}
        <Component {...props} />
      </div>
    )
  }
}

const LoggedInRoute = withLoggedInState(Route)

function HomePage({ isLoggedIn }) {
  return (
    <div>
      <Typography>Homepage</Typography>
    </div>
  )
}

function LoginPage({ savedUsername, setSavedUsername }) {
  const [username, setUsername] = React.useState('')

  return (
    <Grid container={true}>
      {savedUsername ? <Redirect to='/' /> : undefined}
      <TextField
        value={username}
        label='Username'
        onChange={event => setUsername(event.target.value)}
      />
      <Button variant='contained' onClick={() => setSavedUsername(username)}>
        Log in
      </Button>
    </Grid>
  )
}

function ContactPage() {
  return <div>ContactPage</div>
}
