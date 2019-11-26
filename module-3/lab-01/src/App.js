import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormTextInput from './components/FormTextInput'
import LoadingScreen from './components/LoadingScreen'
import fetchData from './utils/fetchData'
import getRandomId from './utils/getRandomId'

const LIST_URL =
  'https://gist.githubusercontent.com/amsul/3b6edcbb9bbc42b231089b6ebad38cb9/raw/6cfee9781998199548f579d0082f3d3a05f20321/data.json'

export default function App() {
  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>To-Do List</FormTitle>

          {/* Put your solution here 👇 */}
        </div>
      </div>
    </div>
  )
}
