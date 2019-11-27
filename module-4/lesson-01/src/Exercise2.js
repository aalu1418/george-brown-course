import './App.css'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

import fetchData from './fetchData'

// Copy list of province codes and names from:
//   https://gist.githubusercontent.com/amsul/9a651de3f5ee24bf7e85d33bb7f201d3/raw/7a1af47d634d27d6c8a442d0671a9c67a9077b52/provinces.json
//
// Copy images of province flags from:
//   https://en.wikipedia.org/wiki/List_of_Canadian_flags#Provincial
//
// Fetch Trump's quotes from:
//   https://api.whatdoestrumpthink.com/api/v1/quotes

export default function App() {
  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Exercise 2: Random Form</h1>

        <Form />
      </div>
    </div>
  )
}

const flag_urls = {
  AB: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Flag_of_Alberta.svg',
  BC:
    'https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_British_Columbia.svg',
  MB:
    'https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Manitoba.svg',
  NB:
    'https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_New_Brunswick.svg',
  NL:
    'https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Newfoundland_and_Labrador.svg',
  NS:
    'https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Nova_Scotia.svg',
  NT:
    'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_the_Northwest_Territories.svg',
  NU: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Flag_of_Nunavut.svg',
  ON: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Ontario.svg',
  PE:
    'https://upload.wikimedia.org/wikipedia/commons/d/d7/Flag_of_Prince_Edward_Island.svg',
  QC: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg',
  SK:
    'https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_Saskatchewan.svg',
  YT: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_Yukon.svg',
}

function Form() {
  // Put your answers here 👇
  const [isLoaded, setIsLoaded] = React.useState({
    quotes: false,
    provinces: false,
  })
  const [selected, setSelected] = React.useState({
    quotes: null,
    provinces: null,
  })
  const [trumpQuotes, setTrumpQuotes] = React.useState([])
  const [provinces, setProvinces] = React.useState({})
  const [provinceImg, setProvinceImg] = React.useState({
    display: false,
    province: null,
  })

  React.useEffect(() => {
    if (!isLoaded.quotes) {
      fetchData('https://api.whatdoestrumpthink.com/api/v1/quotes').then(
        output => {
          setTrumpQuotes(output.messages.non_personalized)
          setIsLoaded({ ...isLoaded, quotes: true })
        },
      )
    }
    if (!isLoaded.provinces) {
      fetchData(
        'https://gist.githubusercontent.com/amsul/9a651de3f5ee24bf7e85d33bb7f201d3/raw/7a1af47d634d27d6c8a442d0671a9c67a9077b52/provinces.json',
      ).then(output => {
        setProvinces(output)
        setIsLoaded({ ...isLoaded, provinces: true })
      })
    }
  }, [isLoaded])

  return (
    <section>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={6}>
          <TextField id='fname' label='First Name' variant='filled' />
        </Grid>
        <Grid item xs={6}>
          <TextField id='lname' label='Last Name' variant='filled' />
        </Grid>
      </Grid>
      <br />
      <Divider variant='middle' />
      <br />
      <Grid container direction='column'>
        <Grid item xs={12}>
          <FormLabel>Select a Trump quote: </FormLabel>
        </Grid>
        <Grid item xs={12}>
          {isLoaded.quotes && (
            <Select
              style={{ maxWidth: '100%' }}
              value={selected.quote || ''}
              onChange={event => {
                setSelected({ ...selected, quote: event.target.value })
              }}
            >
              {trumpQuotes.map((quote, index) => {
                return (
                  <MenuItem
                    style={{ whiteSpace: 'normal' }}
                    key={index}
                    value={quote}
                  >
                    {quote}
                  </MenuItem>
                )
              })}
            </Select>
          )}
          {!isLoaded.quotes && <FormLabel>Quotes are loading...</FormLabel>}
        </Grid>
      </Grid>
      <br />
      <Divider variant='middle' />
      <br />
      <Grid container direction='column'>
        <Grid item xs={12}>
          <FormLabel>Select a province: </FormLabel>
        </Grid>
        <Grid item xs={12}>
          {isLoaded.quotes && (
            <Select
              style={{ maxWidth: '100%' }}
              value={selected.province || ''}
              onChange={event => {
                setSelected({ ...selected, province: event.target.value })
                setProvinceImg({ province: event.target.value.slice(0,2), display: false })
              }}
            >
              {Object.keys(provinces).map(key => {
                return (
                  <MenuItem
                    style={{ whiteSpace: 'normal' }}
                    key={key}
                    value={key + ' - ' + provinces[key]}
                  >
                    {key + ' - ' + provinces[key]}
                  </MenuItem>
                )
              })}
            </Select>
          )}
          {!isLoaded.quotes && <FormLabel>Provinces are loading...</FormLabel>}
        </Grid>
        <br />
        <Button
          variant='outlined'
          color='primary'
          onClick={() => setProvinceImg({ ...provinceImg, display: true })}
          disabled={!selected.province}
        >
          Get flag
        </Button>
      </Grid>
      <br />
      {provinceImg.display && (
        <Grid container justify='center' alignItems='center'>
          <Avatar
            variant="rounded"
            src={flag_urls[provinceImg.province]}
            style={{ minWidth: '200px', minHeight: '200px' }}
          />
        </Grid>
      )}
    </section>
  )
}
