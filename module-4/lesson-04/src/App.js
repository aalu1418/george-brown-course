import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from 'react-router-dom'

const FOODS = [
  {
    id: 'tofu',
    name: 'Tofu',
    labels: ['Vegan', 'Protein', 'Soy', 'No flavor'],
  },
  { id: 'calamari', name: 'Calamari', labels: ['Seafood', 'Squid', 'Fried'] },
  {
    id: 'brazilian',
    name: 'Brazilian Salad Bowl',
    labels: ['Vegan', 'Beans', 'Protein', 'Healthy'],
  },
  {
    id: 'hot',
    name: 'Hot Dogs',
    labels: ['Sandwich', 'Bread-based', 'Pork', 'Mustard'],
  },
  { id: 'lasagna', name: 'Lasagna', labels: ['Pasta', 'Beef', 'Cheese'] },
  {
    id: 'butter',
    name: 'Butter Chicken',
    labels: ['Chicken', 'Curry', 'Spicy'],
  },
  { id: 'lava', name: 'Lava Cake', labels: ['Dessert', 'Chocolate', 'Sweet'] },
]

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
      <Grid container={true} justify='space-between' alignItems='center'>
        <Typography component='h1'>Food Search</Typography>
        <div>
          <Button>Login</Button>
        </div>
      </Grid>
    </div>
  )
}

function AppBody() {
  return (
    <Switch>
      <Route exact={true} path='/food-page/:foodId'>
        <FoodPage />
      </Route>
      <Route exact={true} path='/login'>
        <LoginPage />
      </Route>
      <Route exact={true} path='/'>
        <FoodResults />
      </Route>
    </Switch>
  )
}

function LoginPage() {
  const [username, setUsername] = React.useState('')
  return (
    <div>
      <Box m={2} />
      <Typography variant='h6'>Log in:</Typography>
      <Box m={1} />
      <TextField
        variant='outlined'
        label='Username'
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <Box m={1} />
      <Button variant='contained' color='primary'>
        Log in
      </Button>
    </div>
  )
}

function FoodResults() {
  return (
    <div>
      {FOODS.map(food => (
        <Paper key={food.id} className='FoodRow'>
          <div className='FoodRow-Image' />
          <Box m={1} />
          <div>
            <Typography variant='h6'>
              <Link to={`/food-page/${food.id}`}>{food.name}</Link>
            </Typography>
            <Typography>{food.labels.join(', ')}</Typography>
          </div>
        </Paper>
      ))}
    </div>
  )
}

function FoodPage() {
  const { foodId } = useParams()
  const history = useHistory()

  const foundFood = FOODS.find(food => food.id === foodId)

  if (!foundFood) {
    return <Typography>Not found</Typography>
  }

  const onClickBack = event => {
    event.preventDefault()
    history.goBack()
  }

  return (
    <div className='FoodPage'>
      <Typography>
        <a href='/' onClick={onClickBack}>
          Back
        </a>
      </Typography>
      <div className='FoodPage-Image' />
      <Box m={2} />
      <Typography variant='h4'>{foundFood.name}</Typography>
      <Typography variant='h6'>Labels:</Typography>
      <Typography>{foundFood.labels.join(', ')}</Typography>
    </div>
  )
}
