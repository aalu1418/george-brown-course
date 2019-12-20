import './App.css'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { BrowserRouter, useHistory, useLocation } from 'react-router-dom'

import { PHRASES } from './constants'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='App-Content'>
          <Typography>Search UI</Typography>
          <Box m={3} />
          <AppBody />
        </div>
      </div>
    </BrowserRouter>
  )
}

function AppBody() {
  const history = useHistory()
  const query = useQuery()
  const [searchText, setSearchText] = React.useState(query.get('search') || '')

  const onChange = event => {
    const nextSearchText = event.target.value.toLowerCase()
    setSearchText(nextSearchText)
    if (nextSearchText) {
      history.push(`/?search=${nextSearchText}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Grid container={true} direction='column'>
      <TextField
        variant='outlined'
        label='Enter your search text'
        value={searchText}
        onChange={onChange}
      />

      <Box m={2} />

      {PHRASES.filter(phrase =>
        phrase.text.toLowerCase().includes(searchText.toLowerCase()),
      ).map(phrase => (
        <React.Fragment key={phrase.id}>
          <Paper elevation={4} style={{ padding: 30 }}>
            {phrase.text}
          </Paper>
          <Box m={2} />
        </React.Fragment>
      ))}
    </Grid>
  )
}
