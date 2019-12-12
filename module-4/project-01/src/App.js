import './App.css'
import React from 'react'
// import firebase from 'firebase'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
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
    'donate-candidate': '',
    'donate-charity': '',
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
            <Switch>
              <CheckedRoute
                path='/voting/1'
                condition={!userData.values.username}
                render={() => <Part1 state={userData} />}
              />
              <CheckedRoute
                path='/voting/2'
                condition={
                  !userData.values.username ||
                  !userData.values.candidate ||
                  !userData.values.happiness
                }
                render={() => <Part2 state={userData} />}
              />
              <CheckedRoute
                path='/voting/3'
                condition={
                  !userData.values.username ||
                  !userData.values.birthday ||
                  !userData.values.province
                }
                render={() => <Part3 state={userData} />}
              />
              <CheckedRoute
                path='/voting/summary'
                condition={
                  !userData.values.username ||
                  !userData.values.birthday ||
                  !userData.values.province
                }
                render={() => <Summary state={userData} />}
              />
              <CheckedRoute
                path='/results'
                condition={!userData.values.username}
                render={() => <Results />}
              />
              <CheckedRoute
                path='/'
                condition={false}
                render={() => <LoginPage state={userData} />}
              />
            </Switch>
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
  showPrevious = true,
  continueDisable,
  previousDisable = false,
  onContinueClick = () => null,
}) => {
  let location = useLocation()
  let history = useHistory()
  const isSummary = location.pathname.split('/')[2] === 'summary'
  const submitButton = (
    <span>
      <DoneAllIcon /> Cast Votes
    </span>
  )

  return (
    <Grid container direction='column' justify='center' alignItems='flex-start'>
      <Typography variant='h4'>{title}</Typography>
      {children}
      <Grid
        style={{ width: '100%' }}
        container
        direction={isSummary ? 'column-reverse' : 'row'}
        justify='space-between'
      >
        {showPrevious && (
          <Button disabled={previousDisable} onClick={() => history.goBack()}>
            {isSummary ? 'Go Back' : 'Previous'}
          </Button>
        )}
        {continueTo && (
          <Button
            to={continueTo}
            component={RouterLink}
            disabled={continueDisable}
            onClick={onContinueClick}
          >
            Continue
          </Button>
        )}
        {isSummary && <Button onClick={onContinueClick}>{submitButton}</Button>}
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
      showPrevious={false}
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
      continueDisable={!state.values.birthday || !state.values.province}
    >
      <QuestionContainer label='When is your birthday?'>
        <KeyboardDatePicker
          autoOk
          disableFuture
          emptyLabel='MM/DD/YYYY'
          inputVariant='outlined'
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
      value: -10,
      label: '-10°C',
    },
    {
      value: 10,
      label: '10°C',
    },
    {
      value: 30,
      label: '30°C',
    },
    {
      value: 50,
      label: '50°C',
    },
  ]
  return (
    <PageContainer title='Part 3' continueTo='/voting/summary'>
      <QuestionContainer label='What is your ideal room temperature?'>
        <Slider
          value={state.values.temperature}
          onChange={(_, value) =>
            state.setValues({ ...state.values, temperature: value })
          }
          aria-labelledby='temperature-slider'
          step={5}
          valueLabelDisplay='auto'
          marks={marks}
          min={-10}
          max={50}
        />
      </QuestionContainer>
    </PageContainer>
  )
}

const Summary = ({ state }) => {
  const history = useHistory()
  const QuestionResponse = ({ text }) => {
    return <Typography variant='body1'>{text}</Typography>
  }

  const birthdayParse = !state.values.birthday
    ? ' '
    : `${state.values.birthday.getMonth()}/${state.values.birthday.getDay()}/${state.values.birthday.getFullYear()}`

  return (
    <PageContainer
      title='Summary'
      onContinueClick={() => {
        saveFirestore(state)
        history.push('/results')
      }}
    >
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
        name='donate-candidate'
        type='number'
        variant='outlined'
        label='Donate ETH to your candidate (optional)'
        value={state.values['donate-candidate']}
        onChange={state.set}
      ></TextField>
      <TextField
        name='donate-charity'
        type='number'
        variant='outlined'
        label='Donate ETH to charity (optional)'
        value={state.values['donate-charity']}
        onChange={state.set}
      ></TextField>
    </PageContainer>
  )
}

const Results = () => {
  const [data, setData] = React.useState({
    candidate: {},
    birthday: {},
    happiness: {},
    province: {},
    temperature: {},
  })

  const [sortedBirthdays, setSortedBirthdays] = React.useState({
    '19-or-less': 0,
    '20-to-29': 0,
    '30-to-39': 0,
    '40-to-49': 0,
    '50-or-more': 0,
  })

  React.useEffect(() => {
    const db = firebase.firestore()

    const unsubscribe = db.collection('voting').onSnapshot(data => {
      let dataObj = {}
      data.docs.forEach(doc => {
        dataObj = { ...dataObj, [doc.id]: doc.data() }
      })
      setData(dataObj)
    })

    return () => unsubscribe()
  }, [])

  React.useEffect(() => {
    const age = Object.keys(data.birthday).map(birthday => {
      birthday = new Date(String(birthday))
      return Math.floor(
        (Date.now() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
      )
    })

    setSortedBirthdays({
      '19-or-less': age.filter(x => x < 20).length,
      '20-to-29': age.filter(x => x >= 20 && x < 30).length,
      '30-to-39': age.filter(x => x >= 30 && x < 40).length,
      '40-to-49': age.filter(x => x >= 40 && x < 50).length,
      '50-or-more': age.filter(x => x >= 50).length,
    })
  }, [data.birthday])

  return (
    <PageContainer title='Results' showPrevious={false}>
      {Object.keys(data.candidate).length === 0 && <CircularProgress />}
      {Object.keys(data.candidate).length !== 0 && (
        <div>
          <QuestionContainer label='Favorite candidate:'>
            {Object.keys(data.candidate).map(key => (
              <div
                key={key}
              >{`${CANDIDATE_NAME[key]}: ${data.candidate[key]}`}</div>
            ))}
          </QuestionContainer>
          <QuestionContainer label='Progress:'>
            {Object.keys(data.happiness).map(key => (
              <div
                key={key}
              >{`${HAPPINESS_LABEL[key]}: ${data.happiness[key]}`}</div>
            ))}
          </QuestionContainer>
          <QuestionContainer label='Age groups:'>
            {Object.keys(sortedBirthdays).map(key => (
              <div key={key}>{`${key.split('-').join(' ')}: ${
                sortedBirthdays[key]
              }`}</div>
            ))}
          </QuestionContainer>
          <QuestionContainer label='Province:'>
            {Object.keys(data.province).map(key => {
              const province = PROVINCES.filter(obj => obj.code === key)[0]

              return (
                <div key={key}>{`${province.name}: ${data.province[key]}`}</div>
              )
            })}
          </QuestionContainer>
          <QuestionContainer label='Ideal room temperature:'>
            {Object.keys(data.temperature).map(key => (
              <div key={key}>{`${key}°C: ${data.temperature[key]}`}</div>
            ))}
          </QuestionContainer>
        </div>
      )}
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

const saveFirestore = state => {
  const db = firebase.firestore()
  const incrementProps = ['candidate', 'happiness', 'province', 'temperature']
  incrementProps.forEach(property => {
    const dbRef = db.collection('voting').doc(property)
    const fieldName = String(state.values[property])
    dbRef.update({
      [fieldName]: firebase.firestore.FieldValue.increment(1),
    })
  })

  const bdayRef = db.collection('voting').doc('birthday')
  bdayRef.update({
    [state.values.birthday]: null,
  })
}
