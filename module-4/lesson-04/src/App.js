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
  useLocation,
} from 'react-router-dom'

const FOODS = [
  {
    id: 'tofu',
    name: 'Tofu',
    labels: ['Vegan', 'Protein', 'Soy', 'No flavor'],
  },
  {
    id: 'calamari',
    name: 'Calamari',
    labels: ['Seafood', 'Squid', 'Fried'],
  },
  {
    id: 'brazilian',
    name: 'Brazilian Salad Bowl',
    labels: ['Vegan', 'Beans', 'Protein', 'Healthy'],
  },
  {
    id: 'hot',
    name: 'Hot Dogs',
    labels: ['Sandwich', 'Bread-based', 'Chicken', 'Pork', 'Beef', 'Mustard'],
  },
  {
    id: 'lasagna',
    name: 'Lasagna',
    labels: ['Pasta', 'Beef', 'Chicken', 'Pork', 'Cheese'],
  },
  {
    id: 'butter',
    name: 'Butter Chicken',
    labels: ['Chicken', 'Curry', 'Spicy'],
  },
  {
    id: 'lava',
    name: 'Lava Cake',
    labels: ['Dessert', 'Chocolate', 'Sweet'],
  },
]

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

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
  const [username, setUsername] = React.useState(
    window.localStorage.getItem('username'),
  )

  React.useEffect(() => {
    const onStorage = () => {
      setUsername(window.localStorage.getItem('username'))
    }

    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return (
    <div className='AppHeader'>
      <Grid container={true} justify='space-between' alignItems='center'>
        <Typography component='h1'>Food Search</Typography>
        <div>
          {username ? (
            <span>{username}</span>
          ) : (
            <Button component={Link} to='/login'>
              Login
            </Button>
          )}
        </div>
      </Grid>
    </div>
  )
}

function AppBody() {
  return (
    <Switch>
      <Route
        exact={true}
        path='/food-page/:foodId'
        render={() => <FoodPage />}
      />
      <Route exact={true} path='/login' render={() => <LoginPage />} />
      <Route exact={true} path='/' render={() => <FoodResults />} />
    </Switch>
  )
}

function LoginPage() {
  const [username, setUsername] = React.useState('')
  const history = useHistory()

  const onClickLogIn = () => {
    window.localStorage.setItem('username', username)
    history.push('/')
  }

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
      <Button
        disabled={!username}
        variant='contained'
        color='primary'
        onClick={onClickLogIn}
      >
        Log in
      </Button>
    </div>
  )
}

function FoodResults() {
  let query = useQuery()
  let queries = query.get("meat")
  let queryFilters = {}

  if (queries) {
    queries = queries.split(",")
    queries.forEach(key => {
      queryFilters = {...queryFilters, [key]:true}
    })
  }

  // console.log(queryFilters)

  const [filters, setFilters] = React.useState({
    chicken: false,
    pork: false,
    beef: false,
    noMeat: false,
    ...queryFilters
  })
  const history = useHistory()

  const filteredFoods = FOODS.filter(food => {
    if (filters.chicken && !food.labels.includes('Chicken')) {
      return false
    }

    if (filters.pork && !food.labels.includes('Pork')) {
      return false
    }

    if (filters.beef && !food.labels.includes('Beef')) {
      return false
    }

    if (
      filters.noMeat &&
      (food.labels.includes('Chicken') ||
        food.labels.includes('Pork') ||
        food.labels.includes('Beef') ||
        food.labels.includes('Squid'))
    ) {
      return false
    }

    return true
  })

  const onClick = filterName => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    })
  }

  React.useEffect(() => {
    const queryString = Object.keys(filters).filter(key => filters[key]).join(",")
    if (queryString) {
      history.push(`?meat=${queryString}`)
    } else {
      history.push('/')
    }
  }, [filters, history])

  return (
    <div>
      <Box m={2} />
      <Grid container={true} alignItems='center'>
        <Typography>Meat:</Typography>
        <Box m={1} />
        <FilterButton
          isActive={filters.chicken}
          onClick={onClick}
          filterName='chicken'
        >
          Chicken
        </FilterButton>
        <Box m={1} />
        <FilterButton
          onClick={onClick}
          isActive={filters.pork}
          filterName='pork'
        >
          Pork
        </FilterButton>
        <Box m={1} />
        <FilterButton
          onClick={onClick}
          isActive={filters.beef}
          filterName='beef'
        >
          Beef
        </FilterButton>
        <Box m={1} />
        <FilterButton
          onClick={onClick}
          isActive={filters.noMeat}
          filterName='noMeat'
        >
          No meat
        </FilterButton>
      </Grid>

      <Box m={2} />

      {filteredFoods.map(food => (
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

function FilterButton({ children, isActive, onClick, filterName }) {
  return (
    <Button
      variant={isActive ? 'contained' : 'outlined'}
      color={isActive ? 'primary' : undefined}
      onClick={() => onClick(filterName)}
    >
      {children}
    </Button>
  )
}
