import './App.css'
import React from 'react'
import firebase from 'firebase'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ethers } from 'ethers'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory,
} from 'react-router-dom'

import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL,
} from './constants'

const NETWORK = 'goerli'

export default function App() {
  const [state, setState] = React.useState({})
  const userData = { state, setState }

  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='App'>
          <div className='App-Content'>
            <Solution />
            <Route exact path='/voting/1'>
              <Part1 />
            </Route>
            <Route exact path='/voting/2'>
              <Part2 />
            </Route>
            <Route exact path='/voting/3'>
              <Part3 />
            </Route>
            <Route exact path='/voting/summary'>
              <Summary />
            </Route>
            <Route exact path='/results'>
              <Results />
            </Route>
            <Route exact path='/'>
              <LoginPage />
            </Route>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  )
}

function Solution() {
  return (
    <div>
      <Grid container={true} justify='space-between'>
        <Typography component='h1' gutterBottom={true}>
          Cast Your Vote
        </Typography>
        <Link to='/' component={RouterLink}>
          Back to start
        </Link>
      </Grid>
    </div>
  )
}

const PageContainer = ({
  title,
  children,
  continueTo,
  previousTo,
  continueDisable,
  previousDisable,
}) => {
  return (
    <Grid container direction='column' justify='center' alignItems='flex-start'>
      <Typography variant='h4'>{title}</Typography>
      {children}
      <Grid
        style={{ width: '100%' }}
        container
        direction='row'
        justify='space-between'
      >
        {previousTo && <Button to={previousTo} component={RouterLink}>
          {' '}
          Previous{' '}
        </Button>}
        {continueTo && <Button to={continueTo} component={RouterLink}>
          {' '}
          Continue{' '}
        </Button>}
      </Grid>
    </Grid>
  )
}

const QuestionContainer = ({ label, children }) => {
  return (
    <div>
      <Typography variant='subtitle1'>{label}</Typography>
      {children}
    </div>
  )
}

const LoginPage = () => {
  return (
    <PageContainer continueTo="/voting/1">
      <QuestionContainer label='To begin your voting application, please enter a username:'>
        <TextField variant='outlined' label='Username'></TextField>
      </QuestionContainer>
    </PageContainer>
  )
}

const Part1 = () => {
  return (
    <PageContainer title='Part 1' continueTo="/voting/2" previousTo="/">
      <QuestionContainer label='Who is your favorite candidate?'>
        <FormControl>
          <RadioGroup name='candidate'>
            {Object.keys(CANDIDATE_NAME).map(key => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={CANDIDATE_NAME[key]}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </QuestionContainer>
      <QuestionContainer label='How happy are you with the current progress?'>
        <FormControl>
          <RadioGroup name='happiness'>
            {Object.keys(HAPPINESS_LABEL).map(key => (
              <FormControlLabel
                key={key}
                value={key}
                control={<Radio />}
                label={HAPPINESS_LABEL[key]}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </QuestionContainer>
    </PageContainer>
  )
}

const Part2 = () => {
  return (
    <PageContainer title='Part 2' continueTo="/voting/3" previousTo="/voting/2">
      <QuestionContainer label='When is your birthday?'>
        <KeyboardDatePicker
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </QuestionContainer>
      <QuestionContainer label='Which province do you reside in?'>
        <FormControl variant='outlined' style={{ minWidth: '100%' }}>
          <Select>
            {PROVINCES.map(province => (
              <MenuItem key={province.code} value={province.code}>
                {province.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </QuestionContainer>
    </PageContainer>
  )
}

const Part3 = () => {
  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ]
  return (
    <PageContainer title='Part 3' continueTo="/voting/summary" previousTo="/voting/2">
      <QuestionContainer label='What is your ideal room temperature?'>
        <Slider
          defaultValue={20}
          aria-labelledby='temperature-slider'
          step={1}
          valueLabelDisplay='auto'
          marks={marks}
        />
      </QuestionContainer>
    </PageContainer>
  )
}

const Summary = () => {
  return (
    <PageContainer title='Summary' continueTo="/results" previousTo="/voting/3">
      <QuestionContainer label='Who is your favorite candidate?'></QuestionContainer>
      <QuestionContainer label='How happy are you with the current progress?'></QuestionContainer>
      <QuestionContainer label='When is your birthday?'></QuestionContainer>
      <QuestionContainer label='Which province do you reside in?'></QuestionContainer>
      <QuestionContainer label='What is your ideal room temperature?'></QuestionContainer>
      <TextField
        variant='outlined'
        label='Donate ETH to your candidate (optional)'
      ></TextField>
      <TextField
        variant='outlined'
        label='Donate ETH to charity (optional)'
      ></TextField>
    </PageContainer>
  )
}

const Results = () => {
  return (
    <PageContainer title='Summary'>
      <QuestionContainer label='Favorite candidate:'></QuestionContainer>
      <QuestionContainer label='Progress:'></QuestionContainer>
      <QuestionContainer label='Age groups:'></QuestionContainer>
      <QuestionContainer label='Province:'></QuestionContainer>
      <QuestionContainer label='Ideal room temperature:'></QuestionContainer>
    </PageContainer>
  )
}
