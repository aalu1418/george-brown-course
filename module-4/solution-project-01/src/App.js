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

const donateEth = async ({ ethValues }) => {
  console.log('Using ethers version: %o', ethers.version)
  try {
    const accounts = await window.ethereum.enable()
    console.log('Found accounts: %o', accounts)
    const address = accounts[0]

    const provider = ethers.getDefaultProvider(NETWORK)
    const gasPrice = await provider.getGasPrice()
    console.log('Found gas price: %o', gasPrice)

    const transactions = ethValues.map(ethValue => ({
      from: address,
      to: DONATION_ADDRESS,
      gas: ethers.utils.hexlify(210000),
      gasPrice: gasPrice.toHexString(),
      value: ethers.utils.parseEther(ethValue).toHexString(),
      data: ethers.utils.id(window.localStorage.getItem('username')),
    }))

    console.log('Sending transactions: %o', transactions)
    const response = await window.ethereum.send(
      'eth_sendTransaction',
      transactions,
    )
    console.log(
      'Sent transaction: %o',
      `https://${NETWORK}.etherscan.io/tx/${response.result}`,
    )
    return true
  } catch (error) {
    if (error.code === 4001) {
      console.log('Transaction denied/canceled')
      return
    }
    console.error(error)
    return false
  }
}

const saveVote = async ({
  candidate,
  birthDate,
  happiness,
  resideProvince,
  temperature,
}) => {
  const db = firebase.firestore()

  const [
    candidateDoc,
    happinessDoc,
    resideProvinceDoc,
    temperatureDoc,
  ] = await Promise.all([
    db
      .collection('candidates')
      .doc(candidate)
      .get(),
    db
      .collection('happiness')
      .doc(happiness)
      .get(),
    db
      .collection('resideProvince')
      .doc(resideProvince)
      .get(),
    db
      .collection('temperature')
      .doc(`${temperature}`)
      .get(),
  ])

  await Promise.all([
    db
      .collection('candidates')
      .doc(candidate)
      .set({
        votes: (candidateDoc.exists ? candidateDoc.data().votes : 0) + 1,
      }),
    db.collection('birthDates').add({
      value: birthDate,
    }),
    db
      .collection('happiness')
      .doc(happiness)
      .set({
        votes: (happinessDoc.exists ? happinessDoc.data().votes : 0) + 1,
      }),
    db
      .collection('resideProvince')
      .doc(resideProvince)
      .set({
        votes:
          (resideProvinceDoc.exists ? resideProvinceDoc.data().votes : 0) + 1,
      }),
    db
      .collection('temperature')
      .doc(`${temperature}`)
      .set({
        votes: (temperatureDoc.exists ? temperatureDoc.data().votes : 0) + 1,
      }),
  ])
}

const getBirthDateCount = (birthDates, { min, max }) =>
  birthDates.filter(birthDate => {
    const yearsDiff =
      new Date().getFullYear() - birthDate.toDate().getFullYear()
    return yearsDiff >= min && yearsDiff <= max
  }).length

export default function App() {
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='App'>
          <div className='App-Content'>
            <Solution />
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  )
}

function Solution() {
  // Put your solution here 👇

  const location = useLocation()
  const [candidate, setCandidate] = React.useState('')
  const [happiness, setHappiness] = React.useState('')
  const [birthDate, setBirthDate] = React.useState(null)
  const [resideProvince, setResideProvince] = React.useState('')
  const [temperature, setTemperature] = React.useState(21)

  return (
    <div>
      <Grid container={true} justify='space-between'>
        <Typography component='h1' gutterBottom={true}>
          Cast Your Vote
        </Typography>
        {location.pathname === '/' ||
        location.pathname === '/voting/1' ||
        location.pathname === '/voting/summary' ||
        location.pathname === '/results' ? (
          undefined
        ) : (
          <Link to='/' component={RouterLink}>
            Back to start
          </Link>
        )}
      </Grid>

      <Switch>
        <Route exact={true} path='/results' render={() => <VotingResults />} />
        <Route
          exact={true}
          path='/voting/summary'
          render={() => (
            <VotingSummary
              candidate={candidate}
              happiness={happiness}
              birthDate={birthDate}
              resideProvince={resideProvince}
              temperature={temperature}
            />
          )}
        />
        <Route
          exact={true}
          path='/voting/1'
          render={() => (
            <VotingPart1
              candidate={candidate}
              setCandidate={setCandidate}
              happiness={happiness}
              setHappiness={setHappiness}
            />
          )}
        />
        <Route
          exact={true}
          path='/voting/2'
          render={() => (
            <VotingPart2
              candidate={candidate}
              happiness={happiness}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
              resideProvince={resideProvince}
              setResideProvince={setResideProvince}
            />
          )}
        />
        <Route
          exact={true}
          path='/voting/3'
          render={() => (
            <VotingPart3
              candidate={candidate}
              happiness={happiness}
              birthDate={birthDate}
              resideProvince={resideProvince}
              temperature={temperature}
              setTemperature={setTemperature}
            />
          )}
        />
        <Route exact={true} path='/' component={LogIn} />
      </Switch>
    </div>
  )
}

function LogIn() {
  const history = useHistory()
  const [username, setUsername] = React.useState('')

  const onClickContinue = () => {
    window.localStorage.setItem('username', username)
    history.push('/voting/1')
  }

  if (window.localStorage.getItem('username')) {
    return <Redirect to='/voting/1' />
  }

  return (
    <div>
      <Typography component='h2' variant='h5'>
        To begin your voting application, choose a username:
      </Typography>

      <Box m={2} />

      <div>
        <TextField
          label='Username'
          variant='outlined'
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <Box m={2} />
      <div>
        <Button
          size='large'
          variant='contained'
          color='primary'
          onClick={onClickContinue}
          disabled={!username}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

function VotingPart1({ candidate, setCandidate, happiness, setHappiness }) {
  if (!window.localStorage.getItem('username')) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <div>
        <Typography component='h2' variant='h4'>
          Part 1
        </Typography>

        <Box m={2} />

        <RadioGroup
          onChange={event => setCandidate(event.target.value)}
          value={candidate}
        >
          <Typography component='p' variant='h6'>
            Who is your favorite candidate?
          </Typography>
          <FormControlLabel
            value='johnny-bravo'
            label={CANDIDATE_NAME['johnny-bravo']}
            control={<Radio color='primary' />}
          />
          <FormControlLabel
            value='satoshi-nakamoto'
            label={CANDIDATE_NAME['satoshi-nakamoto']}
            control={<Radio color='primary' />}
          />
          <FormControlLabel
            value='thanos'
            label={CANDIDATE_NAME['thanos']}
            control={<Radio color='primary' />}
          />
        </RadioGroup>

        <Box m={2} />

        <RadioGroup
          onChange={event => setHappiness(event.target.value)}
          value={happiness}
        >
          <Typography component='p' variant='h6'>
            How happy are you with the current progress?
          </Typography>
          <FormControlLabel
            value='1'
            label={HAPPINESS_LABEL['1']}
            control={<Radio color='primary' />}
          />
          <FormControlLabel
            value='2'
            label={HAPPINESS_LABEL['2']}
            control={<Radio color='primary' />}
          />
          <FormControlLabel
            value='3'
            label={HAPPINESS_LABEL['3']}
            control={<Radio color='primary' />}
          />
          <FormControlLabel
            value='4'
            label={HAPPINESS_LABEL['4']}
            control={<Radio color='primary' />}
          />
          <FormControlLabel
            value='5'
            label={HAPPINESS_LABEL['5']}
            control={<Radio color='primary' />}
          />
        </RadioGroup>
      </div>

      <VotingFooter isNextDisabled={!candidate || !happiness} />
    </div>
  )
}

function VotingPart2({
  candidate,
  happiness,
  birthDate,
  setBirthDate,
  resideProvince,
  setResideProvince,
}) {
  if (!window.localStorage.getItem('username') || !candidate || !happiness) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <Typography component='h2' variant='h4'>
        Part 2
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='h6'>
        When is your birthday?
      </Typography>
      <KeyboardDatePicker
        variant='inline'
        format='yyyy/MM/dd'
        margin='normal'
        value={birthDate}
        onChange={date => setBirthDate(date)}
      />

      <Box m={2} />
      <Typography component='p' variant='h6'>
        Which province do you reside in?
      </Typography>
      <FormControl variant='outlined' margin='normal' fullWidth={true}>
        <Select
          value={resideProvince}
          onChange={event => setResideProvince(event.target.value)}
        >
          {PROVINCES.map(province => (
            <MenuItem key={province.code} value={province.code}>
              {province.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <VotingFooter isNextDisabled={!birthDate || !resideProvince} />
    </div>
  )
}

function VotingPart3({
  candidate,
  birthDate,
  happiness,
  resideProvince,
  temperature,
  setTemperature,
}) {
  if (
    !window.localStorage.getItem('username') ||
    !candidate ||
    !birthDate ||
    !happiness ||
    !resideProvince
  ) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <Typography component='h2' variant='h4'>
        Part 3
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='h6'>
        What is your ideal room temperature?
      </Typography>
      <Slider
        value={temperature}
        onChange={(_, value) => setTemperature(value)}
        valueLabelDisplay='auto'
        step={1}
        marks={[
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
        ]}
        min={0}
        max={100}
      />

      <VotingFooter />
    </div>
  )
}

function VotingFooter({ isNextDisabled }) {
  const location = useLocation()

  const nextPath = {
    '/voting/1': '/voting/2',
    '/voting/2': '/voting/3',
    '/voting/3': '/voting/summary',
  }[location.pathname]

  const previousPath = {
    '/voting/2': '/voting/1',
    '/voting/3': '/voting/2',
  }[location.pathname]

  return (
    <div>
      <Box m={4} />
      <Divider />
      <Box m={2} />

      <Grid container={true} justify='space-between'>
        <Button
          size='small'
          variant='contained'
          disabled={!previousPath}
          to={previousPath}
          component={previousPath ? RouterLink : undefined}
        >
          Previous
        </Button>
        <Button
          size='small'
          variant='contained'
          color='primary'
          disabled={isNextDisabled}
          to={nextPath}
          component={RouterLink}
        >
          Next
        </Button>
      </Grid>
    </div>
  )
}

function VotingSummary({
  candidate,
  birthDate,
  happiness,
  resideProvince,
  temperature,
}) {
  const history = useHistory()
  const [isLoading, setIsLoading] = React.useState(false)
  const [donation1, setDonation1] = React.useState('')
  const [donation2, setDonation2] = React.useState('')

  if (
    !window.localStorage.getItem('username') ||
    !candidate ||
    !birthDate ||
    !happiness ||
    !resideProvince
  ) {
    return <Redirect to='/' />
  }
  // candidate = 'johnny-bravo'
  // birthDate = new Date()
  // happiness = '4'
  // resideProvince = 'ON'
  // temperature = 27

  const onClickCastVote = async () => {
    setIsLoading(true)

    if (donation1 || donation2) {
      const result = await donateEth({
        ethValues: [donation1, donation2].filter(v => !!v),
      })
      if (!result) {
        setIsLoading(false)
        return
      }
    }

    await saveVote({
      candidate,
      birthDate,
      happiness,
      resideProvince,
      temperature,
    })

    history.push('/results')
    window.localStorage.removeItem('username')
  }

  return (
    <div>
      <Typography component='h2' variant='h4'>
        Summary
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        Who is your favorite candidate?
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        <b>{CANDIDATE_NAME[candidate]}</b>
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        How happy are you with the current progress?
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        <b>{HAPPINESS_LABEL[happiness]}</b>
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        When is your birthday?
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        <b>{birthDate.toLocaleDateString()}</b>
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        Which province do you reside in?
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        <b>
          {PROVINCES.find(province => province.code === resideProvince).name}
        </b>
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        What is your ideal room temperature?
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        <b>{temperature}°C</b>
      </Typography>

      <Box m={4} />

      <Grid container={true} direction='column' alignItems='stretch'>
        <TextField
          label='Donate ETH to your candidate (optional)'
          variant='outlined'
          value={donation1}
          onChange={event => setDonation1(event.target.value)}
        />
        <Box m={1} />
        <TextField
          label='Donate ETH to charity (optional)'
          variant='outlined'
          value={donation2}
          onChange={event => setDonation2(event.target.value)}
        />
      </Grid>

      <Box m={4} />

      {isLoading ? (
        <Grid container={true} justify='space-around'>
          <Button
            size='large'
            variant='contained'
            color='primary'
            disabled={true}
          >
            Saving...
          </Button>
        </Grid>
      ) : (
        <div>
          <Grid container={true} justify='space-around'>
            <Button
              size='large'
              variant='contained'
              color='primary'
              onClick={onClickCastVote}
            >
              <DoneAllIcon fontSize='large' />
              &nbsp; <b>Cast Votes</b>
            </Button>
          </Grid>

          <Box m={2} />

          <Grid container={true} justify='space-around'>
            <Button
              size='small'
              variant='outlined'
              onClick={() => history.goBack()}
              to='/voting/summary'
              component={RouterLink}
            >
              Go back
            </Button>
          </Grid>
        </div>
      )}
    </div>
  )
}

function VotingResults() {
  const [loadedCandidates, setLoadedCandidates] = React.useState(false)
  const [candidates, setCandidates] = React.useState([])
  React.useEffect(() => {
    const db = firebase.firestore()
    const unsubscribe = db.collection('candidates').onSnapshot(snapshot => {
      const nextCandidates = []
      snapshot.forEach(doc =>
        nextCandidates.push({
          name: doc.id,
          votes: doc.data().votes,
        }),
      )
      setCandidates(nextCandidates)
      setLoadedCandidates(true)
    })
    return () => unsubscribe()
  }, [])

  const [loadedHappiness, setLoadedHappiness] = React.useState(false)
  const [happiness, setHappiness] = React.useState([])
  React.useEffect(() => {
    const db = firebase.firestore()
    const unsubscribe = db.collection('happiness').onSnapshot(snapshot => {
      const nextHappiness = []
      snapshot.forEach(doc =>
        nextHappiness.push({
          name: doc.id,
          votes: doc.data().votes,
        }),
      )
      setHappiness(nextHappiness)
      setLoadedHappiness(true)
    })
    return () => unsubscribe()
  }, [])

  const [loadedResideProvince, setLoadedResideProvince] = React.useState(false)
  const [resideProvince, setResideProvince] = React.useState([])
  React.useEffect(() => {
    const db = firebase.firestore()
    const unsubscribe = db.collection('resideProvince').onSnapshot(snapshot => {
      const nextResideProvince = []
      snapshot.forEach(doc =>
        nextResideProvince.push({
          name: doc.id,
          votes: doc.data().votes,
        }),
      )
      setResideProvince(nextResideProvince)
      setLoadedResideProvince(true)
    })
    return () => unsubscribe()
  }, [])

  const [loadedTemperature, setLoadedTemperature] = React.useState(false)
  const [temperature, setTemperature] = React.useState([])
  React.useEffect(() => {
    const db = firebase.firestore()
    const unsubscribe = db.collection('temperature').onSnapshot(snapshot => {
      const nextTemperature = []
      snapshot.forEach(doc =>
        nextTemperature.push({
          name: doc.id,
          votes: doc.data().votes,
        }),
      )
      setTemperature(nextTemperature)
      setLoadedTemperature(true)
    })
    return () => unsubscribe()
  }, [])

  const [loadedBirthDates, setLoadedBirthDates] = React.useState(false)
  const [birthDates, setBirthDates] = React.useState([])
  React.useEffect(() => {
    const db = firebase.firestore()
    const unsubscribe = db.collection('birthDates').onSnapshot(snapshot => {
      const nextBirthDates = []
      snapshot.forEach(doc => nextBirthDates.push(doc.data().value))
      setBirthDates(nextBirthDates)
      setLoadedBirthDates(true)
    })
    return () => unsubscribe()
  }, [])

  if (
    !loadedCandidates ||
    !loadedHappiness ||
    !loadedResideProvince ||
    !loadedTemperature ||
    !loadedBirthDates
  ) {
    return (
      <Grid container={true} justify='center'>
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <div>
      <Typography component='h2' variant='h4'>
        Results
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        Favorite candidate:
      </Typography>
      {candidates.map(candidate => (
        <Typography
          key={candidate.name}
          component='p'
          variant='body1'
          color='primary'
        >
          {CANDIDATE_NAME[candidate.name]}: <b>{candidate.votes}</b>
        </Typography>
      ))}

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        Progress:
      </Typography>
      {happiness.map(happy => (
        <Typography
          key={happy.name}
          component='p'
          variant='body1'
          color='primary'
        >
          {HAPPINESS_LABEL[happy.name]}: <b>{happy.votes}</b>
        </Typography>
      ))}

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        Age groups:
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        19 or less: <b>{getBirthDateCount(birthDates, { min: 0, max: 19 })}</b>
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        20 to 29: <b>{getBirthDateCount(birthDates, { min: 20, max: 29 })}</b>
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        30 to 39: <b>{getBirthDateCount(birthDates, { min: 30, max: 39 })}</b>
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        40 to 49: <b>{getBirthDateCount(birthDates, { min: 40, max: 49 })}</b>
      </Typography>
      <Typography component='p' variant='body1' color='primary'>
        50 or more:{' '}
        <b>{getBirthDateCount(birthDates, { min: 50, max: Infinity })}</b>
      </Typography>

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        Province
      </Typography>
      {resideProvince.map(province => (
        <Typography
          key={province.name}
          component='p'
          variant='body1'
          color='primary'
        >
          {PROVINCES.find(p => p.code === province.name).name}:{' '}
          <b>{province.votes}</b>
        </Typography>
      ))}

      <Box m={2} />

      <Typography component='p' variant='subtitle2'>
        Ideal room temperature:
      </Typography>
      {temperature.map(temperature => (
        <Typography
          key={temperature.name}
          component='p'
          variant='body1'
          color='primary'
        >
          {temperature.name}°C: <b>{temperature.votes}</b>
        </Typography>
      ))}
    </div>
  )
}
