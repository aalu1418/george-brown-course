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
  const [values, setValues] = React.useState({
    username: localStorage.getItem('m4p1-username') || '',
    candidate: '',
    happiness: '',
    birthday: null,
    province: '',
    temperature: 20,
    "donate-candidate" : "",
    "donate-charity" : "",
  })
  const set = event => {
    setValues({ ...values, [event.target.name]: event.target.value.trim() })
  }
  const userData = { values, set, setValues }

  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='App'>
          <div className='App-Content'>
            <Solution />
            <CheckedRoute
              exact
              path='/voting/1'
              condition={!userData.values.username}
              render={() => <Part1 state={userData} />}
            />
            <CheckedRoute
              exact
              path='/voting/2'
              condition={
                !userData.values.username ||
                !userData.values.candidate ||
                !userData.values.happiness
              }
              render={() => <Part2 state={userData} />}
            />
            <CheckedRoute
              exact
              path='/voting/3'
              condition={
                !userData.values.username ||
                !userData.values.birthday ||
                !userData.values.province
              }
              render={() => <Part3 state={userData} />}
            />
            <CheckedRoute
              exact
              path='/voting/summary'
              condition={
                !userData.values.username ||
                !userData.values.birthday ||
                !userData.values.province
              }
              render={() => <Summary state={userData} />}
            />
            <CheckedRoute
              exact
              path='/results'
              condition={!userData.values.username}
              render={() => <Results />}
            />
            <CheckedRoute
              exact
              path='/'
              condition={false}
              render={() => <LoginPage state={userData} />}
            />
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  )
}

function Solution() {
  let location = useLocation()
  const showBack = !['/', '/voting/1', '/voting/summary', '/results'].includes(
    location.pathname,
  )

  return (
    <div>
      <Grid container={true} justify='space-between'>
        <Typography component='h1' gutterBottom={true}>
          Cast Your Vote
        </Typography>
        <div>
          {showBack && (
            <Link to='/' component={RouterLink}>
              Back to start
            </Link>
          )}
        </div>
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
  previousDisable = false,
  onContinueClick = () => null,
}) => {
  let location = useLocation()
  const isSummary = location.pathname.split("/")[2] === "summary"
  const submitButton = <span><DoneAllIcon /> Cast Votes</span>

  return (
    <Grid container direction='column' justify='center' alignItems='flex-start'>
      <Typography variant='h4'>{title}</Typography>
      {children}
      <Grid
        style={{ width: '100%' }}
        container
        direction={isSummary? 'column-reverse' : 'row'}
        justify='space-between'
      >
        {previousTo && (
          <Button
            to={previousTo}
            component={RouterLink}
            disabled={previousDisable}
          >
            { isSummary? "Go Back" : "Previous"}
          </Button>
        )}
        {continueTo && (
          <Button
            to={continueTo}
            component={RouterLink}
            disabled={continueDisable}
            onClick={onContinueClick}
          >
            {isSummary ?  submitButton : "Continue"}
          </Button>
        )}
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

const LoginPage = ({ state }) => {
  const writeToStorage = () => {
    localStorage.setItem('m4p1-username', state.values.username)
  }

  return (
    <PageContainer
      continueTo='/voting/1'
      continueDisable={!state.values.username}
      onContinueClick={writeToStorage}
    >
      {localStorage.getItem('m4p1-username') && <Redirect to='/voting/1' />}
      <QuestionContainer label='To begin your voting application, please enter a username:'>
        <TextField
          variant='outlined'
          label='Username'
          name='username'
          value={state.values.username}
          onChange={state.set}
        />
      </QuestionContainer>
    </PageContainer>
  )
}

const Part1 = ({ state }) => {
  return (
    <PageContainer
      title='Part 1'
      continueTo='/voting/2'
      previousTo='/'
      previousDisable={true}
      continueDisable={!state.values.candidate || !state.values.happiness}
    >
      <QuestionContainer label='Who is your favorite candidate?'>
        <FormControl>
          <RadioGroup
            name='candidate'
            value={state.values.candidate}
            onChange={state.set}
          >
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
          <RadioGroup
            name='happiness'
            value={state.values.happiness}
            onChange={state.set}
          >
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

const Part2 = ({ state }) => {
  return (
    <PageContainer
      title='Part 2'
      continueTo='/voting/3'
      previousTo='/voting/1'
      continueDisable={!state.values.birthday || !state.values.province}
    >
      <QuestionContainer label='When is your birthday?'>
        <KeyboardDatePicker
          name='birthday'
          variant='inline'
          format='MM/dd/yyyy'
          margin='normal'
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          value={state.values.birthday}
          onChange={date =>
            state.setValues({ ...state.values, birthday: date })
          }
        />
      </QuestionContainer>
      <QuestionContainer label='Which province do you reside in?'>
        <FormControl variant='outlined' style={{ minWidth: '100%' }}>
          <Select
            name='province'
            value={state.values.province}
            onChange={state.set}
          >
            <MenuItem key={''} value={''}>
              {' '}
              --{' '}
            </MenuItem>
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

const Part3 = ({ state }) => {
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
    <PageContainer
      title='Part 3'
      continueTo='/voting/summary'
      previousTo='/voting/2'
    >
      <QuestionContainer label='What is your ideal room temperature?'>
        <Slider
          value={state.values.temperature}
          onChange={(_, value) =>
            state.setValues({ ...state.values, temperature: value })
          }
          aria-labelledby='temperature-slider'
          step={2}
          valueLabelDisplay='auto'
          marks={marks}
        />
      </QuestionContainer>
    </PageContainer>
  )
}

const Summary = ({ state }) => {
  const QuestionResponse = ({ text }) => {
    return <Typography variant='body1'>{text}</Typography>
  }

  const birthdayParse = !state.values.birthday
    ? ' '
    : `${state.values.birthday.getMonth()}/${state.values.birthday.getDay()}/${state.values.birthday.getFullYear()}`

  return (
    <PageContainer title='Summary' continueTo='/results' previousTo='/voting/3'>
      <QuestionContainer label='Who is your favorite candidate?'>
        <QuestionResponse text={CANDIDATE_NAME[state.values.candidate]} />
      </QuestionContainer>
      <QuestionContainer label='How happy are you with the current progress?'>
        <QuestionResponse text={HAPPINESS_LABEL[state.values.happiness]} />
      </QuestionContainer>
      <QuestionContainer label='When is your birthday?'>
        <QuestionResponse text={birthdayParse} />
      </QuestionContainer>
      <QuestionContainer label='Which province do you reside in?'>
        <QuestionResponse text={PROVINCES[state.values.province]} />
      </QuestionContainer>
      <QuestionContainer label='What is your ideal room temperature?'>
        <QuestionResponse text={`${state.values.temperature} ${'\u00b0'}C`} />
      </QuestionContainer>
      <TextField
        name="donate-candidate"
        type="number"
        variant='outlined'
        label='Donate ETH to your candidate (optional)'
        value={state.values["donate-candidate"]}
        onChange={state.set}
      ></TextField>
      <TextField
        name="donate-charity"
        type="number"
        variant='outlined'
        label='Donate ETH to charity (optional)'
        value={state.values["donate-charity"]}
        onChange={state.set}
      ></TextField>
    </PageContainer>
  )
}

const Results = () => {
  return (
    <PageContainer title='Results'>
      <QuestionContainer label='Favorite candidate:'></QuestionContainer>
      <QuestionContainer label='Progress:'></QuestionContainer>
      <QuestionContainer label='Age groups:'></QuestionContainer>
      <QuestionContainer label='Province:'></QuestionContainer>
      <QuestionContainer label='Ideal room temperature:'></QuestionContainer>
    </PageContainer>
  )
}

const conditionalRedirect = Component => {
  return function NewComponent({ condition, ...props }) {
    return (
      <div>
        {condition && <Redirect to='/' />}
        <Component {...props} />
      </div>
    )
  }
}

const CheckedRoute = conditionalRedirect(Route)
