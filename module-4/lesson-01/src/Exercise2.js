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

function Form() {
  // Put your answers here 👇
  return null
}
