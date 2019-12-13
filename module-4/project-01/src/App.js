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
  const showBack = !['/', '/voting/1', '/voting/summary'].includes(
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
              {location.pathname === '/results'
                ? 'Restart Form'
                : 'Back to start'}
            </Link>
          )}
        </div>
      </Grid>
      <Divider />
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
    <Grid container direction='row' justify='space-around' alignItems='center'>
      <DoneAllIcon /> Cast Votes
    </Grid>
  )

  return (
    <Grid container direction='column' justify='center' alignItems='flex-start'>
      <Box my={1}>
        <Typography variant='h4'>{title}</Typography>
      </Box>
      {children}
      <Grid
        style={{ width: '100%' }}
        container
        direction={isSummary ? 'column-reverse' : 'row'}
        justify='space-between'
        alignItems='center'
      >
        {showPrevious && (
          <FormattedButton
            disabled={previousDisable}
            onClick={() => history.goBack()}
          >
            {isSummary ? 'Go Back' : 'Previous'}
          </FormattedButton>
        )}
        {continueTo && (
          <FormattedButton
            to={continueTo}
            component={RouterLink}
            disabled={continueDisable}
            onClick={onContinueClick}
            color='primary'
          >
            Continue
          </FormattedButton>
        )}
        {isSummary && (
          <FormattedButton
            onClick={onContinueClick}
            disabled={continueDisable}
            color='primary'
            style={{ width: '200px', height: '50px', fontSize: '1.1rem' }}
          >
            {submitButton}
          </FormattedButton>
        )}
      </Grid>
    </Grid>
  )
}

const FormattedButton = ({ ...params }) => {
  return (
    <Box my={2}>
      <Button style={{ width: '100px' }} variant='contained' {...params} />
    </Box>
  )
}

const QuestionContainer = ({ label, children }) => {
  return (
    <Box my={1} style={{ width: '100%' }}>
      <Typography variant='h6'>{label}</Typography>
      {children}
      <Box mt={2}>
        <Divider />
      </Box>
    </Box>
  )
}

const QuestionResponse = ({ text }) => {
  return (
    <Box color='#1a237e'>
      <Typography variant='body1'>{text}</Typography>
    </Box>
  )
}

const FormattedTextField = ({ ...params }) => {
  return (
    <Box my={1} width='400px'>
      <TextField {...params} style={{ width: '100%' }} />
    </Box>
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
        <FormattedTextField
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
  const [disableVote, setDisableVote] = React.useState(false)

  const birthdayParse = !state.values.birthday
    ? ' '
    : `${state.values.birthday.getMonth() +
        1}/${state.values.birthday.getDay() +
        1}/${state.values.birthday.getFullYear()}`

  let provinceParse = PROVINCES.filter(
    obj => obj.code === state.values.province,
  )[0]

  return (
    <PageContainer
      title='Summary'
      onContinueClick={async () => {
        const messageGenerator = () => {
          if (Number(state.values['donate-charity']) > 0) {
            return 'charity'
          } else if (Number(state.values['donate-candidate']) > 0) {
            return `candidate-${state.values.candidate}`
          } else {
            return 'no-donation'
          }
        }
        setDisableVote(true)
        await sendTransaction({
          valueInEth:
            state.values['donate-charity'] ||
            state.values['donate-candidate'] ||
            '0',
          gas: 32000,
          toAddress: DONATION_ADDRESS,
          message: messageGenerator(),
        })
          .then(() => {
            saveFirestore(state)
            state.setValues({
              username: localStorage.getItem('m4p1-username') || '',
              candidate: '',
              happiness: '',
              birthday: null,
              province: '',
              temperature: 20,
              'donate-candidate': '',
              'donate-charity': '',
            })
            history.push('/results')
          })
          .catch(() => {
            setDisableVote(false)
          })
      }}
      continueDisable={disableVote}
    >
      {disableVote && (
        <Grid
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: '5',
            width: '100vw',
            height: '100vh',
            backgroundColor: "rgba(0, 0, 0, 0.5)"
          }}
          container
          justify='center'
          alignItems='center'
        >
          <CircularProgress size='7rem' />
        </Grid>
      )}
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
        <QuestionResponse text={provinceParse ? provinceParse.name : ''} />
      </QuestionContainer>
      <QuestionContainer label='What is your ideal room temperature?'>
        <QuestionResponse text={`${state.values.temperature} ${'\u00b0'}C`} />
      </QuestionContainer>
      <FormattedTextField
        name='donate-candidate'
        type='number'
        variant='outlined'
        label='Donate ETH to your candidate (optional)'
        value={state.values['donate-candidate']}
        onChange={state.set}
        disabled={!!state.values['donate-charity']}
      />
      <FormattedTextField
        name='donate-charity'
        type='number'
        variant='outlined'
        label='Donate ETH to charity (optional)'
        value={state.values['donate-charity']}
        onChange={state.set}
        disabled={!!state.values['donate-candidate']}
      />
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
      setTimeout(() => setData(dataObj), 2000)
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
      {Object.keys(data.candidate).length === 0 && (
        <Grid
          style={{ width: '100%', height: '50vh' }}
          container
          justify='center'
          alignItems='center'
        >
          <CircularProgress size='7rem' />
        </Grid>
      )}
      {Object.keys(data.candidate).length !== 0 && (
        <div>
          <QuestionContainer label='Favorite candidate:'>
            {Object.keys(data.candidate).map(key => (
              <QuestionResponse
                key={key}
                text={`${CANDIDATE_NAME[key]}: ${data.candidate[key]}`}
              />
            ))}
          </QuestionContainer>
          <QuestionContainer label='Progress:'>
            {Object.keys(data.happiness).map(key => (
              <QuestionResponse
                key={key}
                text={`${HAPPINESS_LABEL[key]}: ${data.happiness[key]}`}
              />
            ))}
          </QuestionContainer>
          <QuestionContainer label='Age groups:'>
            {Object.keys(sortedBirthdays).map(key => (
              <QuestionResponse
                key={key}
                text={`${key.split('-').join(' ')}: ${sortedBirthdays[key]}`}
              />
            ))}
          </QuestionContainer>
          <QuestionContainer label='Province:'>
            {Object.keys(data.province).map(key => {
              const province = PROVINCES.filter(obj => obj.code === key)[0]

              return (
                <QuestionResponse
                  key={key}
                  text={`${province.name}: ${data.province[key]}`}
                />
              )
            })}
          </QuestionContainer>
          <QuestionContainer label='Ideal room temperature:'>
            {Object.keys(data.temperature).map(key => (
              <QuestionResponse
                key={key}
                text={`${key}°C: ${data.temperature[key]}`}
              />
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

const sendTransaction = ({ toAddress, gas, valueInEth, message }) =>
  new Promise(async (resolve, reject) => {
    try {
      const accounts = await window.ethereum.enable()
      const provider = ethers.getDefaultProvider(NETWORK)
      const gasPrice = await provider.getGasPrice()

      let transactionParameters = {
        to: toAddress,
        from: accounts[0],
        gas: ethers.utils.hexlify(gas),
        gasPrice: gasPrice.toHexString(),
        value: ethers.utils.parseEther(valueInEth).toHexString(),
        data:
          message.trim() !== ''
            ? ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
            : '',
      }
      console.log('Sending transaction with params:', transactionParameters)
      const response = await window.ethereum.send('eth_sendTransaction', [
        transactionParameters,
      ])

      console.log(
        'Sent transaction: %o',
        `https://${NETWORK}.etherscan.io/tx/${response.result}`,
      )
      resolve(true)
    } catch (e) {
      console.log(e)
      reject(false)
    }
  })
