import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormTextInput from './components/FormTextInput'
import LoadingScreen from './components/LoadingScreen'
import fetchData from './utils/fetchData'
import getRandomId from './utils/getRandomId'
import FormSubmit from './components/FormSubmit'

const LIST_URL =
  'https://gist.githubusercontent.com/amsul/3b6edcbb9bbc42b231089b6ebad38cb9/raw/6cfee9781998199548f579d0082f3d3a05f20321/data.json'

export default function App() {
  //initialize state with local storage value
  const [data, setData] = React.useState(
    JSON.parse(localStorage.getItem('tasks')),
  )
  const [newTask, setNewTask] = React.useState('')

  //when data is updated, write it to local storage
  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(data))
  }, [data])

  //hook for when check box is checked/unchecked
  const checkedTask = event => {
    const index = data.findIndex(
      element => Number(element.id) === Number(event.target.id),
    )
    let current_data = [...data]
    current_data[index].completed = event.target.checked
    setData(current_data)
  }

  //hook for when delete button is pressed
  const removeTask = event => {
    const index = data.findIndex(
      element => Number(element.id) === Number(event.target.id),
    )
    let current_data = [...data]
    current_data.splice(index, 1)
    setData(current_data)
  }

  //get data if data doesn't exist
  if (!data) {
    fetchData(LIST_URL, setData).then(data =>
      localStorage.setItem('tasks', JSON.stringify(data)),
    )
  }

  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>To-Do List</FormTitle>

          {//logical determining if loading is shown
            !data && <LoadingScreen label='Loading Data...'></LoadingScreen>
          }
          {//shows each task item when data is present
            data &&
            data.map(task => {
              return (
                <LineItem
                  item={task}
                  onChange={checkedTask}
                  deleteFunc={removeTask}
                ></LineItem>
              )
            })}
          <br></br>
          {//shows form to make new task when data is present
            data && (
            <NewEntry
              value={newTask}
              setValue={setNewTask}
              data={data}
              setData={setData}
            ></NewEntry>
          )}
        </div>
      </div>
    </div>
  )
}

//jsx code for each line item
const LineItem = ({ item, onChange, deleteFunc }) => {
  return (
    <div
      id={item.id}
      style={{
        display: 'flex',
        'margin-bottom': '5pt',
        'justify-content': 'space-between',
      }}
    >
      <label
        id={item.id}
        style={item.completed ? { 'text-decoration': 'line-through' } : {}}
      >
        <input
          style={{ 'margin-right': '4pt', cursor: 'pointer' }}
          id={item.id}
          type='checkbox'
          onChange={onChange}
        />
        {item.label}
      </label>
      <button
        id={item.id}
        type='button'
        onClick={deleteFunc}
        style={{
          'border-radius': '4px',
          'background-color': 'white',
          border: '2px solid #eee',
          cursor: 'pointer',
        }}
      >
        Delete
      </button>
    </div>
  )
}

//jsx code for input & creating a new line
const NewEntry = ({ value, setValue, data, setData }) => {
  const submitNewEntry = () => {
    let update_data = [...data]
    update_data.push({ id: getRandomId(), label: value, completed: false })
    setData(update_data)
    setValue('')
  }

  return (
    <span>
      <FormTextInput
        placeholder='Enter a new to-do item'
        value={value}
        setValue={setValue}
        onKeyPress={event => {
          if (event.key === 'Enter' && value.trim().length !== 0) {
            submitNewEntry()
          }
        }}
      ></FormTextInput>
      <FormSubmit
        onClick={submitNewEntry}
        isDisabled={value.trim().length === 0}
        submitText='Add'
      ></FormSubmit>
    </span>
  )
}
